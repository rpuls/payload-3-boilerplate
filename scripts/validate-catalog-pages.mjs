import catalog from '../src/content/prix-page-catalog.generated.json' with { type: 'json' }

const baseURL = process.env.CATALOG_BASE_URL || 'http://localhost:3000'
const pages = catalog.filter((page) => page.path !== '/')

async function mapConcurrent(values, concurrency, mapper) {
  const results = new Array(values.length)
  let cursor = 0
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < values.length) {
      const index = cursor++
      results[index] = await mapper(values[index])
    }
  }))
  return results
}

const results = await mapConcurrent(pages, 10, async (page) => {
  try {
    const response = await fetch(`${baseURL}${page.path}`, { signal: AbortSignal.timeout(30000) })
    const html = await response.text()
    const issues = []
    if (!response.ok) issues.push(`HTTP ${response.status}`)
    if (!html.includes('<h1')) issues.push('missing H1')
    if (!html.includes('<title>')) issues.push('missing title')
    if (!html.includes('application/ld+json')) issues.push('missing structured data')
    if (/Prix Studio/i.test(html)) issues.push('source brand leaked')
    return { path: page.path, issues }
  } catch (error) {
    return { path: page.path, issues: [error.message] }
  }
})

const failures = results.filter((result) => result.issues.length)
console.log(`Validated ${results.length} catalog pages.`)
if (failures.length) {
  console.error(failures.map((failure) => `${failure.path}: ${failure.issues.join(', ')}`).join('\n'))
  process.exitCode = 1
} else {
  console.log('All pages returned successfully with H1, metadata and structured data.')
}
