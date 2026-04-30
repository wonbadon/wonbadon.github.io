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
  const nextHtml = upsertAdsenseScript(
    html
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${siteUrl}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${siteUrl}" />`),
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

export async function finalizeStaticFiles() {
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL)
  const adsenseClient = getAdsenseClient(process.env.VITE_ADSENSE_CLIENT)
  const publisherId = getPublisherId(process.env.VITE_ADSENSE_CLIENT)

  await rewriteIndexHtml(siteUrl, adsenseClient)
  await writeAdsTxt(publisherId)
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  finalizeStaticFiles().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}