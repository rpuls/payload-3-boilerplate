export const port = Number(process.env.PORT ?? '3000')
export const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`

export const postgresPort = Number(process.env.E2E_POSTGRES_PORT ?? '54329')
export const postgresDb = process.env.E2E_POSTGRES_DB ?? 'payload_e2e'
export const postgresUser = process.env.E2E_POSTGRES_USER ?? 'postgres'
export const postgresPassword = process.env.E2E_POSTGRES_PASSWORD ?? 'postgres'

export const databaseURL =
  process.env.DATABASE_URI ??
  `postgres://${postgresUser}:${postgresPassword}@127.0.0.1:${postgresPort}/${postgresDb}`

export const payloadSecret = process.env.PAYLOAD_SECRET ?? 'playwright-secret'

export const adminEmail = 'admin@example.com'
export const adminPassword = 'ChangeMe123!'
export const commentText = 'Playwright public comment awaiting approval.'
export const seededPosts = [
  {
    title: 'Exploring the Power of Payload CMS',
    slug: 'exploring-payload-cms',
  },
  {
    title: 'Getting Started with Payload CMS Website Template',
    slug: 'getting-started-payload-cms',
  },
  {
    title: 'Medusa.js 2.0: A Game-Changer for E-commerce',
    slug: 'medusajs-2-0-game-changer',
  },
  {
    title: 'Vendure: A Powerful Open-Source E-commerce Solution',
    slug: 'vendure-open-source-ecommerce',
  },
] as const

export const seededPostTitles = seededPosts.map((post) => post.title)
export const targetPost = seededPosts[0]
export const targetPostTitle = targetPost.title

export const dockerComposeEnv = {
  POSTGRES_DB: postgresDb,
  POSTGRES_USER: postgresUser,
  POSTGRES_PASSWORD: postgresPassword,
  POSTGRES_PORT: String(postgresPort),
}
