import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchSiteContent, siteSearchSuggestions } from '../utils/siteSearch'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
      <path d="M6 6 18 18M6 18 18 6" />
    </svg>
  )
}

export default function SiteSearch({
  variant = 'home',
  autoFocus = false,
  syncQueryParam = false,
  onResultSelect,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = syncQueryParam ? searchParams.get('q') ?? '' : ''
  const [query, setQuery] = useState(() => urlQuery)
  const deferredQuery = useDeferredValue(query)
  const inputRef = useRef(null)
  const results = searchSiteContent(deferredQuery, variant === 'panel' ? 6 : 8)
  const hasQuery = query.trim().length > 0
  const suggestionButtons = (
    <div className="mt-3 flex flex-wrap gap-2">
      {siteSearchSuggestions.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setQuery(item)}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          {item}
        </button>
      ))}
    </div>
  )

  useEffect(() => {
    if (!syncQueryParam) {
      return
    }

    if (query === urlQuery) {
      return
    }

    setQuery(urlQuery)
  }, [query, syncQueryParam, urlQuery])

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    if (!syncQueryParam) {
      return
    }

    const trimmedQuery = query.trim()
    const currentQuery = searchParams.get('q') ?? ''

    if (trimmedQuery === currentQuery) {
      return
    }

    const nextSearchParams = new URLSearchParams(searchParams)

    if (trimmedQuery) {
      nextSearchParams.set('q', trimmedQuery)
    } else {
      nextSearchParams.delete('q')
    }

    setSearchParams(nextSearchParams, { replace: true })
  }, [query, searchParams, setSearchParams, syncQueryParam])

  const shellClassName = variant === 'home'
    ? 'rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6'
    : 'rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl sm:p-5'

  return (
    <section className={shellClassName}>
      {variant === 'home' && (
        <div>
          <p className="home-directory-kicker">站內搜尋</p>
          <h2 className="home-directory-section-title mt-3">不知道要找哪個工具時，直接打你心裡的問題</h2>
          <p className="home-directory-section-desc mt-3">
            可以直接輸入颱風假、被開除、低報投保、離職或自救，這裡會把站內最接近的工具、懶人包與導引頁拉出來。
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            首頁搜尋可直接分享網址；全站也能按 / 或 Ctrl + K 快速叫出搜尋。
          </p>
        </div>
      )}

      <div className={variant === 'home' ? 'mt-5' : ''}>
        <label htmlFor={`site-search-${variant}`} className="sr-only">搜尋站內功能</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            id={`site-search-${variant}`}
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：颱風假、被開除、離職、自救、低報投保"
            className="w-full rounded-[22px] border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="清除搜尋內容"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>

      {hasQuery ? (
        results.length > 0 ? (
          <div className="mt-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">找到 {results.length} 個相關頁面</p>
            <div className="space-y-3">
              {results.map(({ to, title, shortLabel, desc, kindLabel, categoryLabel, badges }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={onResultSelect}
                  className="block rounded-[22px] border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="home-directory-tag home-directory-tag-primary">{kindLabel}</span>
                    <span className="home-directory-tag">{categoryLabel}</span>
                    {badges[0] && <span className="home-directory-tag">{badges[0]}</span>}
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-slate-950">{title}</h3>
                  {shortLabel && <p className="mt-2 text-sm font-semibold text-sky-700">{shortLabel}</p>}
                  <p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
            <p>沒有找到完全符合的頁面。可以改試像是「颱風假」、「被開除」、「離職」、「低報投保」或「自救」這類更接近情境的關鍵字。</p>
            {suggestionButtons}
          </div>
        )
      ) : (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">可以直接試這些關鍵字</p>
          {suggestionButtons}
        </div>
      )}
    </section>
  )
}