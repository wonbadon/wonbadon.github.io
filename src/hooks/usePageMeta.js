import { useEffect } from 'react'
import {
  buildStructuredData,
  composeDocumentTitle,
  routeSeoByPath,
  DEFAULT_DESCRIPTION,
  resolveOpenGraphType,
  SOCIAL_IMAGE_PATH,
} from '../config/routeSeo'

function upsertMeta(selector, createMeta) {
  let meta = document.querySelector(selector)

  if (!meta) {
    meta = createMeta()
    document.head.appendChild(meta)
  }

  return meta
}

function upsertLink(selector, createLink) {
  let link = document.querySelector(selector)

  if (!link) {
    link = createLink()
    document.head.appendChild(link)
  }

  return link
}

function upsertScript(selector, createScript) {
  let script = document.querySelector(selector)

  if (!script) {
    script = createScript()
    document.head.appendChild(script)
  }

  return script
}

export default function usePageMeta(pageTitle, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const previousTitle = document.title
    const pathname = window.location.pathname || '/'
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const routeSeo = routeSeoByPath[normalizedPath]
    const resolvedPageTitle = routeSeo?.title ?? pageTitle
    const resolvedDescription = routeSeo?.description ?? description
    const resolvedKeywords = routeSeo?.keywords?.join(', ') ?? ''
    const title = composeDocumentTitle(resolvedPageTitle)
    const pageUrl = new URL(normalizedPath === '/' ? '/' : `${normalizedPath}/`, window.location.origin).toString()
    const socialImageUrl = new URL(SOCIAL_IMAGE_PATH, window.location.origin).toString()
    const ogTypeValue = resolveOpenGraphType(normalizedPath)
    const structuredData = buildStructuredData(normalizedPath, pageUrl, socialImageUrl)

    document.title = title

    const metaDescription = upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      return meta
    })

    const ogTitle = upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      return meta
    })

    const ogDescription = upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      return meta
    })

    const ogType = upsertMeta('meta[property="og:type"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:type')
      return meta
    })

    const twitterTitle = upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'twitter:title')
      return meta
    })

    const twitterDescription = upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'twitter:description')
      return meta
    })

    const metaKeywords = upsertMeta('meta[name="keywords"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'keywords')
      return meta
    })

    const ogUrl = upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:url')
      return meta
    })

    const canonical = upsertLink('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      return link
    })

    const robots = upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'robots')
      return meta
    })

    const structuredDataScript = upsertScript('#structured-data-website', () => {
      const script = document.createElement('script')
      script.id = 'structured-data-website'
      script.type = 'application/ld+json'
      return script
    })

    const previousDescription = metaDescription.getAttribute('content') || ''
    const previousOgTitle = ogTitle.getAttribute('content') || ''
    const previousOgDescription = ogDescription.getAttribute('content') || ''
    const previousOgType = ogType.getAttribute('content') || ''
    const previousTwitterTitle = twitterTitle.getAttribute('content') || ''
    const previousTwitterDescription = twitterDescription.getAttribute('content') || ''
    const previousKeywords = metaKeywords.getAttribute('content') || ''
    const previousOgUrl = ogUrl.getAttribute('content') || ''
    const previousCanonical = canonical.getAttribute('href') || ''
    const previousRobots = robots.getAttribute('content') || ''
    const previousStructuredData = structuredDataScript.textContent || ''

    metaDescription.setAttribute('content', resolvedDescription)
    ogTitle.setAttribute('content', title)
    ogDescription.setAttribute('content', resolvedDescription)
    ogType.setAttribute('content', ogTypeValue)
    twitterTitle.setAttribute('content', title)
    twitterDescription.setAttribute('content', resolvedDescription)
    metaKeywords.setAttribute('content', resolvedKeywords)
    ogUrl.setAttribute('content', pageUrl)
    canonical.setAttribute('href', pageUrl)
    robots.setAttribute('content', routeSeo ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow')
    structuredDataScript.textContent = JSON.stringify(structuredData, null, 2)

    return () => {
      document.title = previousTitle
      metaDescription.setAttribute('content', previousDescription)
      ogTitle.setAttribute('content', previousOgTitle)
      ogDescription.setAttribute('content', previousOgDescription)
      ogType.setAttribute('content', previousOgType)
      twitterTitle.setAttribute('content', previousTwitterTitle)
      twitterDescription.setAttribute('content', previousTwitterDescription)
      metaKeywords.setAttribute('content', previousKeywords)
      ogUrl.setAttribute('content', previousOgUrl)
      canonical.setAttribute('href', previousCanonical)
      robots.setAttribute('content', previousRobots)
      structuredDataScript.textContent = previousStructuredData
    }
  }, [pageTitle, description])
}