import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { contentCatalog, featuredTools, secondaryTools } from '../data/toolCatalog'

function IconBase({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

function OvertimeIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v4.7l3 1.8" />
    </IconBase>
  )
}

function LeaveIcon() {
  return (
    <IconBase>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" />
      <path d="M8 3.8v3.4M16 3.8v3.4M4.5 9.5h15" />
    </IconBase>
  )
}

function SeveranceIcon() {
  return (
    <IconBase>
      <path d="M6.5 19.5h11a1.8 1.8 0 0 0 1.8-1.8V8.8a1.8 1.8 0 0 0-1.8-1.8h-11a1.8 1.8 0 0 0-1.8 1.8v8.9a1.8 1.8 0 0 0 1.8 1.8Z" />
      <path d="M9 7V5.8A2.8 2.8 0 0 1 11.8 3h.4A2.8 2.8 0 0 1 15 5.8V7M9.3 12h5.4" />
    </IconBase>
  )
}

function PensionIcon() {
  return (
    <IconBase>
      <path d="M7 8.8h10" />
      <path d="M7.8 5.5h8.4a1.7 1.7 0 0 1 1.8 1.8v9.4a1.7 1.7 0 0 1-1.8 1.8H7.8A1.7 1.7 0 0 1 6 16.7V7.3a1.7 1.7 0 0 1 1.8-1.8Z" />
      <path d="M9.5 12h5M9.5 15h5" />
    </IconBase>
  )
}

function ArrowIcon() {
  return (
    <IconBase className="home-directory-arrow">
      <path d="M7 17 17 7" />
      <path d="M9.5 7H17v7.5" />
    </IconBase>
  )
}

const iconMap = {
  overtime: OvertimeIcon,
  leave: LeaveIcon,
  severance: SeveranceIcon,
  pension: PensionIcon,
}

const toolGroups = secondaryTools.reduce((grouped, tool) => {
  if (!grouped[tool.category]) {
    grouped[tool.category] = []
  }

  grouped[tool.category].push(tool)
  return grouped
}, {})

const categorySummary = Object.entries(toolGroups).map(([category, tools]) => ({
  category,
  count: tools.length,
}))

export default function Home() {
  usePageMeta(
    '首頁與試算工具',
    '台灣勞工權益計算器首頁，整理全部試算工具與新手導覽內容。',
  )

  return (
    <div className="home-directory-page">
      <div className="home-directory-wrap">
        <nav aria-label="Breadcrumb" className="home-breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <span className="home-breadcrumb-link">首頁</span>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="text-slate-500">計算工具</span>
            </li>
          </ol>
        </nav>

        <div className="mt-3 max-w-3xl sm:mt-4">
          <h1 className="home-directory-title">勞工權益計算工具</h1>
          <p className="home-directory-subtitle mt-3 sm:mt-4">
            所有工具依據 2026 年最新勞基法與勞退級距資料整理，免費使用、即時計算。
          </p>
        </div>

        <section className="home-directory-intro-grid">
          <div className="home-directory-summary-card">
            <p className="home-directory-kicker">快速開始</p>
            <h2 className="home-directory-section-title mt-3">先看常用入口，再往下找完整工具總覽</h2>
            <p className="home-directory-section-desc mt-3">
              首頁先整理常用入口，下方同時保留新手導覽、情境拆解、常見問題與站點說明。
            </p>

            <div className="home-directory-stat-grid mt-6">
              <div className="home-directory-stat-card">
                <p className="home-directory-stat-value">{featuredTools.length}</p>
                <p className="home-directory-stat-label">最常用核心工具</p>
              </div>
              <div className="home-directory-stat-card">
                <p className="home-directory-stat-value">{featuredTools.length + secondaryTools.length}</p>
                <p className="home-directory-stat-label">目前可直接試算頁面</p>
              </div>
              <div className="home-directory-stat-card">
                <p className="home-directory-stat-value">{contentCatalog.length}</p>
                <p className="home-directory-stat-label">導覽與補充內容頁</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="home-directory-detail-label">常用入口</p>
              <div className="home-directory-chip-wrap mt-3">
                {featuredTools.map(({ to, shortLabel }) => (
                  <Link key={to} to={to} className="home-directory-chip home-directory-chip-link">
                    {shortLabel}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="home-directory-rail">
            <div className="home-directory-rail-card">
              <p className="home-directory-kicker">新手入口</p>
              <div className="mt-4 space-y-3">
                {contentCatalog.map(({ to, eyebrow, title, desc }) => (
                  <Link key={to} to={to} className="home-directory-mini-link">
                    <p className="home-directory-mini-link-eyebrow">{eyebrow}</p>
                    <h2 className="home-directory-mini-link-title">{title}</h2>
                    <p className="home-directory-mini-link-desc">{desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="home-directory-rail-card">
              <p className="home-directory-kicker">工具分類</p>
              <p className="mt-3 text-sm leading-7 text-slate-500">每個工具維持單一主題，依分類直接找到需要的頁面即可。</p>
              <div className="home-tool-pill-wrap mt-4">
                {categorySummary.map(({ category, count }) => (
                  <span key={category} className="home-tool-pill">
                    {category}
                    <span className="home-tool-pill-count">{count}</span>
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="home-featured-grid mt-8 sm:mt-10">
          {featuredTools.map(({ to, iconKey, category, badge, law, title, desc, suitable, inputs, output }) => {
            const Icon = iconMap[iconKey]

            return (
            <Link key={to} to={to} className="home-directory-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="home-directory-icon" aria-hidden="true">
                  <Icon />
                </span>

                <div className="flex w-full flex-wrap justify-start gap-2 sm:w-auto sm:justify-end">
                  <span className="home-directory-tag home-directory-tag-primary">{category}</span>
                  <span className="home-directory-tag">{badge}</span>
                </div>
              </div>

              <p className="home-directory-law mt-5 sm:mt-7">法源｜{law}</p>
              <h2 className="home-directory-card-title mt-2 sm:mt-3">{title}</h2>
              <p className="home-directory-card-desc mt-3 sm:mt-4">{desc}</p>

              <div className="home-directory-detail-grid mt-5 sm:mt-6">
                <div>
                  <p className="home-directory-detail-label">適用情境</p>
                  <p className="home-directory-detail-text mt-2">{suitable}</p>
                </div>

                <div>
                  <p className="home-directory-detail-label">你會看到</p>
                  <p className="home-directory-detail-text mt-2">{output}</p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="home-directory-detail-label">需要資料</p>
                <div className="home-directory-chip-wrap mt-3">
                  {inputs.map((item) => (
                    <span key={item} className="home-directory-chip">{item}</span>
                  ))}
                </div>
              </div>

              <div className="home-directory-cta mt-6 sm:mt-7">
                立即試算
                <ArrowIcon />
              </div>
            </Link>
            )
          })}
        </section>

        <section className="home-directory-section mt-14 sm:mt-16">
          <div className="max-w-3xl">
            <p className="home-directory-kicker">完整工具庫</p>
            <h2 className="home-directory-section-title mt-3">其餘工具集中在同一區，直接選頁面進入</h2>
            <p className="home-directory-section-desc mt-3 sm:mt-4">
              其餘試算工具集中在下方多欄卡片，桌機會自動排成兩到三欄，方便直接切到需要的主題頁。
            </p>
          </div>

          <div className="home-tool-pill-wrap mt-6 sm:mt-8">
            {categorySummary.map(({ category, count }) => (
              <span key={category} className="home-tool-pill">
                {category}
                <span className="home-tool-pill-count">{count}</span>
              </span>
            ))}
          </div>

          <div className="home-tool-library-grid mt-6 sm:mt-8">
            {secondaryTools.map(({ to, title, desc, category, badge, law, inputs }) => (
              <Link key={to} to={to} className="home-tool-library-card">
                <div className="flex flex-wrap items-start gap-2">
                  <span className="home-directory-tag home-directory-tag-primary">{category}</span>
                  <span className="home-directory-tag">{badge}</span>
                </div>

                <h3 className="home-tool-library-title mt-4">{title}</h3>
                <p className="home-tool-library-desc mt-3">{desc}</p>
                <p className="home-tool-library-law mt-4">法源｜{law}</p>

                <div className="home-directory-chip-wrap mt-4">
                  {inputs.slice(0, 2).map((item) => (
                    <span key={item} className="home-directory-chip">{item}</span>
                  ))}
                </div>

                <div className="home-directory-cta mt-5">
                  開啟工具
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
