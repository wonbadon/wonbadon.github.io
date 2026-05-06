import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildStructuredData,
  composeDocumentTitle,
  DEFAULT_DESCRIPTION,
  notFoundSeo,
  resolveOpenGraphType,
  routeSeoEntries,
  SOCIAL_IMAGE_PATH,
} from '../src/config/routeSeo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')
const adsTxtPath = path.join(distDir, 'ads.txt')
const robotsTxtPath = path.join(distDir, 'robots.txt')
const sitemapPath = path.join(distDir, 'sitemap.xml')
const notFoundPath = path.join(distDir, '404.html')

const DEFAULT_SITE_URL = 'https://wonbadon.github.io/'
const ADSENSE_SCRIPT_ID = 'adsense-script'
const GOOGLE_SELLER_ID = 'f08c47fec0942fa0'

function normalizeSiteUrl(value) {
  const raw = (value || DEFAULT_SITE_URL).trim()
  return raw.endsWith('/') ? raw : `${raw}/`
}

function getPublisherId(value) {
  if (!value) {
    return ''
  }

  return value.trim().replace(/^ca-/, '')
}

function getAdsenseClient(value) {
  return value ? value.trim() : ''
}

function buildAssetUrl(siteUrl, assetPath) {
  return new URL(assetPath.replace(/^\//, ''), siteUrl).toString()
}

function buildPageUrl(siteUrl, routePath) {
  if (routePath === '/') {
    return siteUrl
  }

  return new URL(`${routePath.replace(/^\//, '').replace(/\/?$/, '/')}`, siteUrl).toString()
}

function replaceAssetPrefix(html, routePath) {
  const depth = routePath.split('/').filter(Boolean).length

  if (depth === 0) {
    return html
  }

  const prefix = '../'.repeat(depth)
  return html.replace(/(href|src)="\.\/([^\"]+)"/g, `$1="${prefix}$2"`)
}

function injectStructuredData(html, structuredData) {
  const serialized = JSON.stringify(structuredData, null, 2)

  return html.replace(
    /<script id="structured-data-website" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `    <script id="structured-data-website" type="application/ld+json">\n${serialized
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n')}\n    </script>`,
  )
}

function applyPageSeo(html, { title, description = DEFAULT_DESCRIPTION, keywords = [], pageUrl, socialImageUrl, structuredData, robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', ogType = 'website' }) {
  const baseHtml = html
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
      .replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${keywords.join(',')}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${pageUrl}" />`)
      .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${socialImageUrl}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`)
      .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${socialImageUrl}" />`)
      .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`)
      .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${pageUrl}" />`)
  const htmlWithoutOgType = baseHtml.replace(/\n?\s*<meta property="og:type" content="[^"]*"\s*\/?>/, '')
  const htmlWithOgType = htmlWithoutOgType.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${description}" />\n    <meta property="og:type" content="${ogType}" />`,
  )

  return injectStructuredData(htmlWithOgType, structuredData)
}

function upsertAdsenseScript(html, adsenseClient) {
  const scriptRegex = /\n?\s*<script[^>]*src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"]*"[^>]*><\/script>/
  const cleanHtml = html.replace(scriptRegex, '')

  if (!adsenseClient) {
    return cleanHtml
  }

  const scriptTag = `    <script id="${ADSENSE_SCRIPT_ID}" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}" crossorigin="anonymous"></script>\n`
  return cleanHtml.replace('  </head>', `${scriptTag}  </head>`)
}

function buildPageHtml(templateHtml, routeSeo, siteUrl, adsenseClient) {
  const socialImageUrl = buildAssetUrl(siteUrl, SOCIAL_IMAGE_PATH)
  const pageUrl = buildPageUrl(siteUrl, routeSeo.path)
  const structuredData = buildStructuredData(routeSeo.path, pageUrl, socialImageUrl)
  const nextHtml = replaceAssetPrefix(
    upsertAdsenseScript(
      applyPageSeo(templateHtml, {
        title: composeDocumentTitle(routeSeo.title),
        description: routeSeo.description,
        keywords: routeSeo.keywords,
        pageUrl,
        socialImageUrl,
        structuredData,
        ogType: resolveOpenGraphType(routeSeo.path),
      }),
      adsenseClient,
    ),
    routeSeo.path,
  )

  return nextHtml
}

async function writeRoutePages(siteUrl, adsenseClient) {
  const templateHtml = await readFile(indexPath, 'utf8')

  for (const routeSeo of routeSeoEntries) {
    const pageHtml = buildPageHtml(templateHtml, routeSeo, siteUrl, adsenseClient)
    const outputPath = routeSeo.path === '/'
      ? indexPath
      : path.join(distDir, routeSeo.path.replace(/^\//, ''), 'index.html')

    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, pageHtml, 'utf8')
  }

  const socialImageUrl = buildAssetUrl(siteUrl, SOCIAL_IMAGE_PATH)
  const notFoundHtml = upsertAdsenseScript(
    applyPageSeo(templateHtml, {
      title: composeDocumentTitle(notFoundSeo.title),
      description: notFoundSeo.description,
      keywords: [],
      pageUrl: buildPageUrl(siteUrl, '/404/'),
      socialImageUrl,
      structuredData: buildStructuredData('/404', buildPageUrl(siteUrl, '/404/'), socialImageUrl),
      robots: 'noindex, follow',
    }),
    adsenseClient,
  )

  await writeFile(notFoundPath, notFoundHtml, 'utf8')
}

async function writeSitemap(siteUrl) {
  const lastModified = new Date().toISOString().slice(0, 10)
  const urls = routeSeoEntries
    .map((routeSeo) => `  <url>\n    <loc>${buildPageUrl(siteUrl, routeSeo.path)}</loc>\n    <lastmod>${lastModified}</lastmod>\n  </url>`)
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await writeFile(sitemapPath, sitemap, 'utf8')
}

async function writeRobotsTxt(siteUrl) {
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${buildAssetUrl(siteUrl, 'sitemap.xml')}\n`
  await writeFile(robotsTxtPath, robotsTxt, 'utf8')
}

async function writeAdsTxt(publisherId) {
  if (!publisherId) {
    return
  }

  const adsTxt = `google.com, ${publisherId}, DIRECT, ${GOOGLE_SELLER_ID}\n`
  await writeFile(adsTxtPath, adsTxt, 'utf8')
}

async function prepareLegacyRedirect() {
  const rootSiteUrl = 'https://wonbadon.github.io/'
  const redirectHtml = `<!doctype html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${rootSiteUrl}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${rootSiteUrl}" />
    <link rel="icon" type="image/png" sizes="48x48" href="${buildAssetUrl(rootSiteUrl, 'favicon-48.png')}" />
    <title>台灣勞工權益計算器｜網址已移轉</title>
    <script>window.location.replace(${JSON.stringify(rootSiteUrl)});</script>
  </head>
  <body>
    <p>本站已移轉至 <a href="${rootSiteUrl}">${rootSiteUrl}</a></p>
  </body>
</html>
`

  await writeFile(indexPath, redirectHtml, 'utf8')
}

export async function finalizeStaticFiles() {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL)
  const adsenseClient = getAdsenseClient(process.env.VITE_ADSENSE_CLIENT)
  const publisherId = getPublisherId(process.env.VITE_ADSENSE_CLIENT)

  await writeRoutePages(siteUrl, adsenseClient)
  await writeAdsTxt(publisherId)
  await writeSitemap(siteUrl)
  await writeRobotsTxt(siteUrl)

  if (process.env.VITE_ENABLE_LEGACY_REDIRECT === 'true') {
    await prepareLegacyRedirect()
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  finalizeStaticFiles().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}