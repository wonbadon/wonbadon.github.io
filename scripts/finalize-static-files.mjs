import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')
const adsTxtPath = path.join(distDir, 'ads.txt')

const DEFAULT_SITE_URL = 'https://wonbadon.github.io/taiwan-labor-calculator/'
const ADSENSE_SCRIPT_ID = 'adsense-script'
const GOOGLE_SELLER_ID = 'f08c47fec0942fa0'
const SOCIAL_IMAGE_PATH = 'social-card.svg'
const SITE_NAME = '台灣勞工權益計算器'
const SITE_ALTERNATE_NAMES = ['勞工權益試算工具', '勞工權益計算工具', 'wonbadon.github.io']
const SITE_DESCRIPTION = '2026 最新勞工權益計算工具，免費試算薪資、加班費、特休、資遣費、勞退與勞健保，輸入資料後立即看結果與法條重點。'

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

function buildWebsiteStructuredData(siteUrl, socialImageUrl) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      url: siteUrl,
      description: SITE_DESCRIPTION,
      inLanguage: 'zh-TW',
      image: socialImageUrl,
      publisher: {
        '@type': 'Person',
        name: 'wonbadon',
      },
    },
    null,
    2,
  )
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

async function rewriteIndexHtml(siteUrl, adsenseClient) {
  const html = await readFile(indexPath, 'utf8')
  const socialImageUrl = buildAssetUrl(siteUrl, SOCIAL_IMAGE_PATH)
  const structuredData = buildWebsiteStructuredData(siteUrl, socialImageUrl)
  const nextHtml = upsertAdsenseScript(
    html
      .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${siteUrl}" />`)
      .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${socialImageUrl}" />`)
      .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${socialImageUrl}" />`)
      .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${siteUrl}" />`)
      .replace(
        /<script id="structured-data-website" type="application\/ld\+json">[\s\S]*?<\/script>/,
        `    <script id="structured-data-website" type="application/ld+json">\n${structuredData
          .split('\n')
          .map((line) => `      ${line}`)
          .join('\n')}\n    </script>`,
      ),
    adsenseClient,
  )

  if (nextHtml !== html) {
    await writeFile(indexPath, nextHtml, 'utf8')
  }
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

  await rewriteIndexHtml(siteUrl, adsenseClient)
  await writeAdsTxt(publisherId)

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