import { useEffect, useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AdSlot from './AdSlot'
import SupportCta from './SupportCta'
import { adsConfig } from '../config/ads'
import { contentCatalog, featuredTools, toolCatalog } from '../data/toolCatalog'

let scrollBehaviorResetTimerId = null
let originalHtmlScrollBehavior = ''
let originalBodyScrollBehavior = ''

function forceInstantScrollMode() {
  const root = document.documentElement
  const body = document.body

  if (scrollBehaviorResetTimerId === null) {
    originalHtmlScrollBehavior = root.style.scrollBehavior
    originalBodyScrollBehavior = body.style.scrollBehavior
  } else {
    window.clearTimeout(scrollBehaviorResetTimerId)
  }

  root.style.scrollBehavior = 'auto'
  body.style.scrollBehavior = 'auto'

  scrollBehaviorResetTimerId = window.setTimeout(() => {
    root.style.scrollBehavior = originalHtmlScrollBehavior
    body.style.scrollBehavior = originalBodyScrollBehavior
    originalHtmlScrollBehavior = ''
    originalBodyScrollBehavior = ''
    scrollBehaviorResetTimerId = null
  }, 80)
}

function resetScrollPosition() {
  forceInstantScrollMode()
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const toolLinks = toolCatalog.map(({ to, shortLabel, footerDesc }) => ({
  to,
  label: shortLabel,
  desc: footerDesc,
}))

const contentLinks = contentCatalog.map(({ to, label, desc }) => ({ to, label, desc }))

const navLinks = [
  { to: '/', label: '首頁' },
  { to: '/guide', label: '新手指南' },
  ...featuredTools.map(({ to, shortLabel }) => ({ to, label: shortLabel })),
]

const toolRouteSet = new Set(toolCatalog.map(({ to }) => to))
const contentRouteSet = new Set(contentCatalog.map(({ to }) => to))

const ownerName = 'wonbadon'

const disclaimerSections = [
  {
    title: '法律定位',
    tone: 'notice-card-warning',
    items: [
      '本站是公開法規資訊整理與前端試算工具，不是勞動部、勞工局或任何政府機關官方網站。',
      '本站內容不構成法律意見、勞資爭議代理意見、會計意見或人資決策保證。',
      '正式申訴、協商、離職簽署、調解或訴訟前，請再用原始資料與主管機關說明做人工覆核。',
    ],
  },
  {
    title: '輸入資料責任',
    tone: 'notice-card-danger',
    items: [
      '你自行輸入的薪資、時數、到職日、離職日、假別、平均工資口徑與制度類型，如有錯誤、遺漏或分類錯誤，試算結果就會直接失真。',
      '因輸入資料錯誤、理解法條錯誤、引用本站試算結果做內部核薪、協商、離職、申訴或其他決策而產生的損失，應由使用者自行判斷與承擔。',
      '如果你的案件涉及獎金、津貼、輪班、變形工時、曆年制折算、非自願離職爭議或其他特殊事實，本工具不保證能完整覆蓋。',
    ],
  },
  {
    title: '資料與隱私邊界',
    tone: 'notice-card-safe',
    items: [
      '本站目前沒有會員系統，也不是用來保存個人勞資爭議資料的服務平台。',
      '你在頁面內輸入的數值，主要用於瀏覽器端即時計算；但你仍不應輸入不必要的身分證號、住址、完整薪資單影本等敏感資訊。',
      '本站不提供個案存證、時效中斷、法律通知或官方認證功能。',
    ],
  },
  {
    title: '版權與站點資訊',
    tone: 'notice-card-neutral',
    items: [
      `除另有註明外，本站介面設計、整理文案與站內原創內容之著作權屬 ${ownerName} 所有。`,
      `© ${new Date().getFullYear()} ${ownerName}. All rights reserved.`,
      '引用本站內容時，請自行判斷是否仍與最新法規、函釋與主管機關說明一致。',
    ],
  },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const isToolPage = toolRouteSet.has(pathname)
  const isContentPage = contentRouteSet.has(pathname)
  const shouldShowSupportCta = pathname === '/guide' || pathname === '/overtime-guide' || pathname === '/leaving-job' || pathname === '/severance-guide' || pathname === '/faq' || pathname === '/about'

  const adSlot = isHome
    ? adsConfig.slots.home
    : isToolPage
      ? adsConfig.slots.page
      : isContentPage
        ? adsConfig.slots.content
        : adsConfig.slots.page

  const adLabel = isHome
    ? '首頁贊助廣告'
    : isToolPage
      ? '工具頁贊助廣告'
      : '內容頁贊助廣告'

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined
    }

    const previousValue = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousValue
    }
  }, [])

  useLayoutEffect(() => {
    setMenuOpen(false)

    resetScrollPosition()

    const frameId = window.requestAnimationFrame(() => {
      resetScrollPosition()
    })

    const timeoutId = window.setTimeout(() => {
      resetScrollPosition()
    }, 0)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [pathname])

  const desktopNavClass = (to) => {
    return pathname === to
      ? 'rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950'
      : 'rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {!isHome && (
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="absolute left-[8%] top-[18rem] h-72 w-72 rounded-full bg-amber-100/80 blur-3xl" />
          <div className="absolute right-[6%] top-[10rem] h-80 w-80 rounded-full bg-cyan-100/90 blur-3xl" />
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">法規試算站</p>
              <p className="text-sm font-semibold text-slate-950 sm:text-base">台灣勞工權益計算器</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={desktopNavClass(to)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="開關選單"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`mb-1 block rounded-2xl px-4 py-3 text-sm font-semibold ${
                  pathname === to
                    ? 'border border-slate-200 bg-slate-100 text-slate-950'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className={isHome
        ? 'relative flex-1 w-full bg-slate-50'
        : 'relative mx-auto flex-1 w-full max-w-6xl px-4 py-8 sm:px-6 md:py-10'}>
        {children}
      </main>

      {shouldShowSupportCta && (
        <SupportCta className="mx-auto mt-2 max-w-6xl px-4 sm:px-6" />
      )}

      <AdSlot
        key={isHome ? 'home-ad-slot' : `page-ad-slot-${pathname}`}
        slot={adSlot}
        label={adLabel}
        className={isHome
          ? 'mx-auto mt-2 max-w-6xl px-4 pb-4 sm:px-6'
          : 'mx-auto mt-2 max-w-6xl px-4 sm:px-6'}
      />

      {isHome ? (
        <footer className="relative border-t border-slate-200 bg-white text-slate-600">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 xl:grid-cols-[1.05fr,0.8fr,0.8fr,0.95fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="brand-mark" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-slate-950">台灣勞工權益計算器</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">把常見勞工權益問題整理成可立即使用的試算工具，先幫你抓到方向與大致數字。</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-950">試算工具</h3>
              <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-slate-600 sm:grid-cols-2">
                {toolLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="transition hover:text-sky-700">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-950">內容導覽</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {contentLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="transition hover:text-sky-700">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-950">關於本站</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                <li>網站維護者：{ownerName}</li>
                <li>網站性質：公開資訊整理與前端試算工具</li>
                <li>正式申訴、協商或簽約前，請再用原始資料人工覆核。</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} 台灣勞工權益計算器 / {ownerName}</p>
              <p>本站內容僅供參考，不構成法律意見或官方認定結果。</p>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="relative mt-16 border-t border-slate-200 bg-transparent">
          <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6">
            <div className="section-card">
              <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
                <div>
                  <p className="page-eyebrow">重要免責聲明</p>
                  <h2 className="mt-4 text-2xl font-extrabold text-slate-950 md:text-3xl">
                    這是公開資訊整理與試算工具，不是官方認定結果，也不替你承擔輸入錯誤風險。
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                    我把常見勞工權益場景拆成可快速計算的頁面，目的是幫使用者先確認方向、預估落點與整理提問重點。
                    但本站不能取代正式法規解釋、個案法律判斷、官方書面認定，也不保證所有公司制度與特殊排班都能被完整涵蓋。
                  </p>

                  <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">使用前先看</p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      如果你把薪資、工時、假別、年資、平均工資口徑或制度類型輸錯，本站算出來的數字就不應被當成你可以直接主張的最終權利。
                      本站的角色是幫你縮小問題範圍，不是代替你完成正式法律判斷。
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                  {disclaimerSections.map(({ title, tone, items }) => (
                    <div key={title} className={`notice-card ${tone}`}>
                      <p className="text-sm font-extrabold text-slate-950">{title}</p>
                      <ul className="site-list mt-3 space-y-2 text-sm leading-7 text-slate-700">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-3">
                <div className="metric-tile">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">網站功能導覽</p>
                  <ul className="site-list mt-3 space-y-4 text-sm leading-7 text-slate-700">
                    <li>
                      <Link to="/" className="font-semibold text-slate-950 transition hover:text-sky-700">首頁</Link>
                      <p className="text-slate-500">先用首頁工具卡判斷你現在是加班、特休、資遣還是勞退情境。</p>
                    </li>
                    {toolLinks.map(({ to, label, desc }) => (
                      <li key={to}>
                        <Link to={to} className="font-semibold text-slate-950 transition hover:text-sky-700">{label}</Link>
                        <p className="text-slate-500">{desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="metric-tile">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">延伸內容</p>
                  <ul className="site-list mt-3 space-y-4 text-sm leading-7 text-slate-700">
                    {contentLinks.map(({ to, label, desc }) => (
                      <li key={to}>
                        <Link to={to} className="font-semibold text-slate-950 transition hover:text-amber-700">{label}</Link>
                        <p className="text-slate-500">{desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="metric-tile">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">站點基本資訊</p>
                  <ul className="site-list mt-3 space-y-2 text-sm leading-7 text-slate-700">
                    <li>網站名稱：台灣勞工權益計算器</li>
                    <li>網站性質：前端試算工具與公開資訊整理站，不是官方服務窗口。</li>
                    <li>網站維護者：{ownerName}</li>
                    <li>版權標示：© {new Date().getFullYear()} {ownerName}. All rights reserved.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} 台灣勞工權益計算器 / {ownerName}</p>
              <p>正式申訴、協商、簽約或提告前，請以原始資料、公司制度與主管機關說明再次覆核。</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
