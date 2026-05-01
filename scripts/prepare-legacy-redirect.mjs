process.env.VITE_ENABLE_LEGACY_REDIRECT = 'true'

const { finalizeStaticFiles } = await import('./finalize-static-files.mjs')

await finalizeStaticFiles()