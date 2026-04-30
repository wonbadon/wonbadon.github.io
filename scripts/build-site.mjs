import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build, loadEnv } from 'vite'
import { finalizeStaticFiles } from './finalize-static-files.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

function applyBuildEnv(mode = 'production') {
  const loadedEnv = loadEnv(mode, projectRoot, '')

  Object.entries(loadedEnv).forEach(([key, value]) => {
    if (!(key in process.env)) {
      process.env[key] = value
    }
  })
}

async function main() {
  applyBuildEnv()
  await build()
  await finalizeStaticFiles()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})