import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-static'

export function GET() {
  const baseURL = getServerSideURL()
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /next/',
    `Sitemap: ${baseURL}/sitemap.xml`,
    `Host: ${baseURL}`,
    '',
  ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
