import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const severanceScenarios = [
  {
    title: '非自願離職 / 資遣',
    desc: '先分清楚新制與舊制年資，再看資遣費、預告工資與其他應結清項目。',
    to: '/severance',
    cta: '先看資遣費試算',
  },
  {
    title: '自請離職',
    desc: '多數情況不會直接有資遣費，應先看預告期、最後工作日與特休結清。',
    to: '/leaving-job',
    cta: '先看離職權益分流',
  },
  {
    title: '平均工資有爭議',
    desc: '如果有獎金、津貼、排班或變動薪資，不能只拿最近一個月硬套。',
    to: '/guide',
    cta: '先看輸入口徑提醒',
  },
]

const severanceSearchCards = [
  {
    keyword: '資遣費怎麼算',
    desc: '先區分新制與舊制年資，再用平均工資換算，不是每年都同一倍率。',
    to: '/severance',
    page: '資遣費計算機',
  },
  {
    keyword: '非自願離職可以拿多少',
    desc: '先抓資遣費區間，再回頭確認預告工資、特休結清與相關文件。',
    to: '/leaving-job',
    page: '離職權益懶人包',
  },
  {
    keyword: '自請離職有資遣費嗎',
    desc: '大多數情況不會直接有資遣費，先分清楚終止原因再判斷。',
    to: '/faq',
    page: '常見問題',
  },
  {
    keyword: '平均工資和月薪是不是一樣',
    desc: '平均工資通常不是最近一個月薪資，尤其碰到獎金與變動薪時更要小心。',
    to: '/guide',
    page: '新手指南',
  },
]

const severanceMistakes = [
  '把自請離職和非自願離職混成同一套結果，誤以為一定有資遣費。',
  '新制與舊制年資沒有拆開，直接把所有年資乘同一倍率。',
  '把最近一個月薪資直接當平均工資，忽略法定計算口徑。',
  '只算資遣費，卻忘了預告工資、特休結清與其他應結清項目。',
]

export default function SeveranceGuide() {
  usePageMeta(
    '資遣費怎麼算懶人包｜非自願離職、平均工資與新舊制一次看',
    '整理資遣費怎麼算、非自願離職、平均工資、新舊制年資與自請離職差異，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">資遣費整理</p>
        <h1 className="page-title">資遣費常見問題，先把離職原因和計算口徑分開</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋資遣費，真正卡住的通常不是乘法，而是前面就把離職原因、年資制度或平均工資看錯。
          這頁先把最常見的資遣費問題拆開，讓你直接進到正確試算或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種離職，都能直接套資遣費</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {severanceScenarios.map(({ title, desc, to, cta }) => (
            <Link
              key={title}
              to={to}
              className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
            >
              <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              <p className="mt-4 text-sm font-semibold text-sky-700">{cta} →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="page-eyebrow">熱門搜尋</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你查的那句話，通常該先進哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            資遣費相關搜尋會混到非自願離職、平均工資、自請離職與預告工資。先把問題對到正確頁面，Google 比較容易理解這些主題是有層次的。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {severanceSearchCards.map(({ keyword, desc, to, page }) => (
            <Link
              key={keyword}
              to={to}
              className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">常見搜尋</p>
              <h3 className="mt-3 text-xl font-extrabold text-slate-950">{keyword}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              <p className="mt-4 text-sm font-semibold text-sky-700">前往 {page} →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="section-card">
          <p className="page-eyebrow">算之前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談資遣費</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>這次是非自願離職，還是你自己提出離職。</li>
            <li>2005 年 7 月 1 日前後的年資有沒有分開處理。</li>
            <li>平均工資是不是依正確法定口徑整理，而不是直接抓月薪。</li>
            <li>除了資遣費，還有哪些預告工資、特休結清或文件問題要一起確認。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把資遣費看錯</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {severanceMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}