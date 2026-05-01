import { useEffect } from 'react'

const SITE_NAME = '台灣勞工權益計算器'
const DEFAULT_DESCRIPTION = '免費試算加班費、特休、資遣費、勞退、勞健保與退休規劃，依 2026 最新勞基法與級距整理。'

function upsertMeta(selector, createMeta) {
  let meta = document.querySelector(selector)

  if (!meta) {
    meta = createMeta()
    document.head.appendChild(meta)
  }

  return meta
}

export default function usePageMeta(pageTitle, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const previousTitle = document.title
    const title = pageTitle
      ? (pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle}｜${SITE_NAME}`)
      : SITE_NAME

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

    const previousDescription = metaDescription.getAttribute('content') || ''
    const previousOgTitle = ogTitle.getAttribute('content') || ''
    const previousOgDescription = ogDescription.getAttribute('content') || ''
    const previousTwitterTitle = twitterTitle.getAttribute('content') || ''
    const previousTwitterDescription = twitterDescription.getAttribute('content') || ''

    metaDescription.setAttribute('content', description)
    ogTitle.setAttribute('content', title)
    ogDescription.setAttribute('content', description)
    twitterTitle.setAttribute('content', title)
    twitterDescription.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      metaDescription.setAttribute('content', previousDescription)
      ogTitle.setAttribute('content', previousOgTitle)
      ogDescription.setAttribute('content', previousOgDescription)
      twitterTitle.setAttribute('content', previousTwitterTitle)
      twitterDescription.setAttribute('content', previousTwitterDescription)
    }
  }, [pageTitle, description])
}