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

export default function Home() {
  usePageMeta(
    '首頁與試算工具',
    '台灣勞工權益計算器首頁，整理加班、特休、資遣、勞退、保費、親職、職災、退休與勞資爭議等完整工具入口。',
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

        <section className="home-directory-grid mt-8 sm:mt-10">
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
            <h2 className="home-directory-section-title mt-3">剩下的工具，依情境分組放在這裡</h2>
            <p className="home-directory-section-desc mt-3 sm:mt-4">
              你不一定每次都從加班或資遣進來。像薪資單、勞健保、產假、職災、退休與爭議整理，現在都已經補成可直接使用的頁面。
            </p>
          </div>

          <div className="home-tool-groups mt-6 sm:mt-8">
            {Object.entries(toolGroups).map(([category, tools]) => (
              <div key={category} className="home-tool-group">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="home-directory-kicker">{category}</p>
                    <h3 className="home-tool-group-title mt-2">{tools.length} 個工具</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-500">每個工具都維持單一主題，避免把不同法條混在同一頁。</p>
                </div>

                <div className="home-tool-library-grid mt-5">
                  {tools.map(({ to, title, desc, badge, law, inputs }) => (
                    <Link key={to} to={to} className="home-tool-library-card">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <span className="home-directory-tag home-directory-tag-primary">{badge}</span>
                        <span className="home-directory-tag">{law}</span>
                      </div>

                      <h4 className="home-tool-library-title mt-4">{title}</h4>
                      <p className="home-tool-library-desc mt-3">{desc}</p>

                      <div className="home-directory-chip-wrap mt-4">
                        {inputs.slice(0, 3).map((item) => (
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
              </div>
            ))}
          </div>
        </section>

        <section className="home-directory-section mt-14 sm:mt-16">
          <div className="max-w-3xl">
            <p className="home-directory-kicker">把工具站補成完整網站</p>
            <h2 className="home-directory-section-title mt-3">如果你還不確定該先算什麼，先從這幾頁進來</h2>
            <p className="home-directory-section-desc mt-3 sm:mt-4">
              首頁不只放入口，也把新手導覽、情境拆解、常見問題與站點邊界整理好，讓你不用一進站就直接掉進法條細節。
            </p>
          </div>

          <div className="home-directory-support-grid mt-6 sm:mt-8">
            {contentCatalog.map(({ to, eyebrow, title, desc, points }) => (
              <Link key={to} to={to} className="home-directory-support-card">
                <p className="home-directory-support-eyebrow">{eyebrow}</p>
                <h3 className="home-directory-support-title mt-3">{title}</h3>
                <p className="home-directory-support-desc mt-3 sm:mt-4">{desc}</p>

                <ul className="home-directory-support-list mt-4 sm:mt-5">
                  {points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="home-directory-cta mt-6 sm:mt-7">
                  查看內容
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
