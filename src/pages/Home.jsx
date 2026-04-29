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
      <path d="M12 4.2c-3.9 0-7 1.8-7 4.1 0 1.8 1.9 3.1 4.6 3.7v2.8c0 .9.8 1.7 1.7 1.7h1.4c.9 0 1.7-.8 1.7-1.7V12c2.7-.6 4.6-1.9 4.6-3.7 0-2.3-3.1-4.1-7-4.1Z" />
      <path d="M12 16.5v3.3M9.7 19.8h4.6" />
    </IconBase>
  )
}

function ArrowIcon() {
  return (
    <IconBase className="home-tool-arrow">
      <path d="M7 17 17 7M9 7h8v8" />
    </IconBase>
  )
}

const tools = [
  {
    to: '/overtime',
    code: '01',
    tag: '最常用',
    tone: 'home-tool-card-overtime',
    icon: OvertimeIcon,
    law: '第24條 / 第39條',
    title: '加班與假日出勤工資',
    desc: '平日延長工時、休息日出勤、國定假日與休假日出勤，一次換成具體金額。',
    audience: '今天正在對班表、出勤紀錄、薪資單，想知道公司至少該給多少。',
    prepare: '計薪方式、工時、假別。',
  },
  {
    to: '/annual-leave',
    code: '02',
    tag: '最容易算錯',
    tone: 'home-tool-card-leave',
    icon: LeaveIcon,
    law: '第38條',
    title: '特休資格與年資門檻',
    desc: '以滿整月年資計算，不會提前把未滿一個月的時間算進特休資格。',
    audience: '你想先確認自己目前到底有沒有特休、差多久到下一個門檻。',
    prepare: '到職日期。',
  },
  {
    to: '/severance',
    code: '03',
    tag: '離職前必看',
    tone: 'home-tool-card-severance',
    icon: SeveranceIcon,
    law: '第17條 / 勞退條例第12條',
    title: '資遣費新舊制拆算',
    desc: '同時處理 2005/7/1 前後的年資段，避免把舊制錯套成新制上限。',
    audience: '你正在面對非自願離職、裁員、資遣通知，想先抓合理區間。',
    prepare: '平均工資、新舊制年資。',
  },
  {
    to: '/labor-pension',
    code: '04',
    tag: '長期規劃',
    tone: 'home-tool-card-pension',
    icon: PensionIcon,
    law: '勞工退休金條例',
    title: '勞退提撥與累積試算',
    desc: '把月提繳工資級距、雇主 6% 提撥與自願提撥，整理成長期累積結果。',
    audience: '你想看現在的提撥級距、是否要自提，以及長期累積大概長什麼樣。',
    prepare: '月薪、自提比例、年限。',
  },
]

const reminders = [
  {
    title: '加班先分假別',
    desc: '平日、休息日、國定假日不能混著算，先分清楚再輸入。',
  },
  {
    title: '資遣先抓口徑',
    desc: '平均工資與新舊制年資，是最常讓結果差很多的地方。',
  },
  {
    title: '特休與勞退看制度邊界',
    desc: '公司制度、收益率假設或特殊排班，仍要回到對應頁面確認。',
  },
]

const heroChips = [
  '2026 最新資料整理',
  '四個核心工具',
  '先選工具再看細節',
]

const faqs = [
  {
    q: '加班費怎麼算？',
    a: '平日與休息日加班的倍率不同，國定假日 / 休假日也不能直接套同一條。站內已把這三種場景拆開，避免用錯法條。',
  },
  {
    q: '特休有幾天？',
    a: '法定門檻是到職滿 6 個月 3 天、1 年 7 天、2 年 10 天、3 年 14 天、5 年 15 天，滿 10 年後每年再加 1 天，最高 30 天。',
  },
  {
    q: '資遣費怎麼計算？',
    a: '新制年資每滿 1 年給 1/2 個月平均工資，最高 6 個月；舊制年資則是每滿 1 年給 1 個月平均工資，需依實際年資計算。',
  },
]

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="home-hero-panel">
        <div className="max-w-3xl">
          <p className="home-eyebrow">工具總覽</p>
          <h1 className="home-hero-title mt-4">
            <span className="block whitespace-nowrap">勞工權益</span>
            <span className="block whitespace-nowrap text-sky-600">試算工具</span>
          </h1>
          <p className="home-hero-subtitle mt-4 max-w-2xl">
            把最常用的四個工具放在同一頁。先選你要處理的是加班、特休、資遣，還是勞退，再進去做對應試算。
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {heroChips.map((chip) => (
            <span key={chip} className="home-chip">{chip}</span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map(({ to, tag, tone, icon: Icon, law, title, desc, audience, prepare }) => (
          <Link key={to} to={to} className={`home-tool-card ${tone}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="home-tool-icon">
                <Icon />
              </span>
              <span className="home-tool-tag">{tag}</span>
            </div>

            <p className="home-tool-law mt-4">{law}</p>
            <h2 className="home-tool-title mt-2">{title}</h2>
            <p className="home-tool-desc mt-3">{desc}</p>

            <div className="home-tool-meta mt-4 space-y-2">
              <p><span className="font-semibold text-slate-950">適合：</span>{audience}</p>
              <p><span className="font-semibold text-slate-950">需要：</span>{prepare}</p>
            </div>

            <div className="home-tool-cta mt-5">
              開始試算
              <ArrowIcon />
            </div>
          </Link>
        ))}
      </section>

      <section className="home-section-panel">
        <div className="grid gap-6 lg:grid-cols-[0.88fr,1.12fr] lg:items-start">
          <div>
            <p className="home-eyebrow">使用前提醒</p>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-950 md:text-5xl">
              先分對工具，再開始輸入。
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              首頁只做導覽，不把每個工具頁的完整說明全部塞在這裡。
              如果你碰到平均工資、公司制度、特殊排班或收益率假設，再到對應工具頁看完整邊界說明。
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {reminders.map(({ title, desc }) => (
              <div key={title} className="home-reminder-card">
                <p className="text-sm font-semibold text-slate-950">{title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-panel">
        <p className="home-eyebrow">常見問題</p>
        <h2 className="mt-4 text-3xl font-extrabold text-slate-950 md:text-5xl">
          先看這三個最常見的問題。
        </h2>
        <div className="mt-5 space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="home-faq-item">
              <summary className="cursor-pointer pr-8 text-sm font-semibold text-slate-950">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-500">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
