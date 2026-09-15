import { execFileSync, spawn } from 'node:child_process'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

const postgresPort = Number(process.env.E2E_POSTGRES_PORT ?? '54343')
const postgresDb = process.env.E2E_POSTGRES_DB ?? 'payload_e2e'
const postgresUser = process.env.E2E_POSTGRES_USER ?? 'postgres'
const postgresPassword = process.env.E2E_POSTGRES_PASSWORD ?? 'postgres'

const env = {
  ...process.env,
  DISABLE_SEARCH_SYNC: process.env.DISABLE_SEARCH_SYNC ?? 'true',
  POSTGRES_DB: postgresDb,
  POSTGRES_USER: postgresUser,
  POSTGRES_PASSWORD: postgresPassword,
  POSTGRES_PORT: String(postgresPort),
}

const isWindows = process.platform === 'win32'

function run(command, args) {
  if (isWindows) {
    execFileSync('cmd.exe', ['/c', command, ...args], {
      cwd: repoRoot,
      env,
      stdio: 'inherit',
    })
    return
  }

  execFileSync(command, args, {
    cwd: repoRoot,
    env,
    stdio: 'inherit',
  })
}

async function waitForPort(port, host = '127.0.0.1', timeoutMs = 60000) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const ready = await new Promise((resolve) => {
      const socket = net.createConnection({ host, port })

      socket.once('connect', () => {
        socket.end()
        resolve(true)
      })

      socket.once('error', () => {
        socket.destroy()
        resolve(false)
      })
    })

    if (ready) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error(`Timed out waiting for PostgreSQL on ${host}:${port}`)
}

function stopPostgres() {
  try {
    run('docker', ['compose', 'down', '--volumes', '--remove-orphans'])
  } catch {
    // Best-effort cleanup for local test runs.
  }
}

async function main() {
  run('docker', ['compose', 'down', '--volumes', '--remove-orphans'])
  run('docker', ['compose', 'up', '-d', 'postgres'])
  await waitForPort(postgresPort)

  run('corepack', ['pnpm', 'deps:native'])
  run('corepack', ['pnpm', 'build'])
  const app = isWindows
    ? spawn('cmd.exe', ['/c', 'corepack', 'pnpm', 'start'], {
        cwd: repoRoot,
        env,
        stdio: 'inherit',
      })
    : spawn('corepack', ['pnpm', 'start'], {
        cwd: repoRoot,
        env,
        stdio: 'inherit',
      })

  const shutdown = (signal) => {
    app.kill(signal)
    stopPostgres()
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))

  app.on('exit', (code) => {
    stopPostgres()
    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  console.error(error)
  stopPostgres()
  process.exit(1)
})
