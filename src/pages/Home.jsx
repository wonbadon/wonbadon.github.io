import { Link } from 'react-router-dom'

const tools = [
  {
    to: '/overtime',
    code: '01',
    tag: '最常用',
    tone: 'home-tool-card-overtime',
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
      <section className="section-card">
        <div className="max-w-3xl">
          <p className="page-eyebrow">工具總覽</p>
          <h1 className="page-title mt-4">勞工權益試算工具</h1>
          <p className="page-subtitle mt-4 max-w-2xl">
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
        {tools.map(({ to, code, tag, tone, law, title, desc, audience, prepare }) => (
          <Link key={to} to={to} className={`home-tool-card ${tone}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="tool-code">{code}</span>
              <span className="home-tool-law">{law}</span>
              <span className="home-tool-tag">{tag}</span>
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>

            <div className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              <p><span className="font-semibold text-white">適合：</span>{audience}</p>
              <p><span className="font-semibold text-white">需要：</span>{prepare}</p>
            </div>

            <div className="home-tool-cta mt-5">開始試算</div>
          </Link>
        ))}
      </section>

      <section className="section-card">
        <div className="grid gap-6 lg:grid-cols-[0.88fr,1.12fr] lg:items-start">
          <div>
            <p className="page-eyebrow">使用前提醒</p>
            <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
              先分對工具，再開始輸入。
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              首頁只做導覽，不把每個工具頁的完整說明全部塞在這裡。
              如果你碰到平均工資、公司制度、特殊排班或收益率假設，再到對應工具頁看完整邊界說明。
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {reminders.map(({ title, desc }) => (
              <div key={title} className="metric-tile">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">常見問題</p>
        <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
          先看這三個最常見的問題。
        </h2>
        <div className="mt-5 space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="rounded-[22px] border border-white/10 bg-white/5 p-4 transition open:bg-white/10">
              <summary className="cursor-pointer pr-8 text-sm font-semibold text-white">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
