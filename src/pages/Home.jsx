import { Link } from 'react-router-dom'

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

const tools = [
  {
    to: '/overtime',
    icon: OvertimeIcon,
    title: '加班費計算機',
    desc: '依勞基法第 24 條，計算平日、休息日、國定假日加班費。',
  },
  {
    to: '/annual-leave',
    icon: LeaveIcon,
    title: '特休天數計算',
    desc: '依勞基法第 38 條，輸入到職日算出法定特休天數。',
  },
  {
    to: '/severance',
    icon: SeveranceIcon,
    title: '資遣費計算機',
    desc: '輸入平均工資與年資，算出新制或舊制的資遣費金額。',
  },
  {
    to: '/labor-pension',
    icon: PensionIcon,
    title: '勞退退休金試算',
    desc: '估算勞退新制每月提繳金額與長期累積結果。',
  },
]

export default function Home() {
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

        <div className="mt-4 max-w-3xl">
          <h1 className="home-directory-title">勞工權益計算工具</h1>
          <p className="home-directory-subtitle mt-4">
            所有工具依據 2026 年最新勞基法與勞退級距資料整理，免費使用、即時計算。
          </p>
        </div>

        <section className="home-directory-grid mt-10">
          {tools.map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className="home-directory-card">
              <span className="home-directory-icon" aria-hidden="true">
                <Icon />
              </span>
              <h2 className="home-directory-card-title mt-7">{title}</h2>
              <p className="home-directory-card-desc mt-4">{desc}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}
