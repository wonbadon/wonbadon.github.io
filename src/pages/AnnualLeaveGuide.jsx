import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const leaveScenarios = [
  {
    title: '剛滿 6 個月',
    desc: '這通常是第一次取得法定特休的門檻，先確認到職日與查詢日，不要只憑印象估。',
    to: '/annual-leave',
    cta: '先看特休天數試算',
  },
  {
    title: '滿 1 年、2 年以上',
    desc: '重點是法定門檻升級時點，不是單看曆年。年資差一點點，天數就可能不同。',
    to: '/annual-leave',
    cta: '直接確認目前法定天數',
  },
  {
    title: '離職前特休沒休完',
    desc: '這時候不只看你有幾天，還要回頭看未休天數、折發工資與公司制度。',
    to: '/leaving-job',
    cta: '先看離職權益分流',
  },
]

const leaveSearchCards = [
  {
    keyword: '特休幾天',
    desc: '先用到職日和查詢日對照法定門檻，不要先套公司制度。',
    to: '/annual-leave',
    page: '特休天數計算',
  },
  {
    keyword: '滿半年特休幾天',
    desc: '滿 6 個月通常是第一次取得 3 天法定特休的門檻，差一天都可能還沒到。',
    to: '/annual-leave',
    page: '特休天數計算',
  },
  {
    keyword: '特休沒休完怎麼算',
    desc: '先確認你目前的法定資格，再回頭看未休天數是否需要折發工資。',
    to: '/faq',
    page: '常見問題',
  },
  {
    keyword: '特休可以遞延嗎',
    desc: '遞延是勞雇雙方可以協議的安排，但仍要注意年度終結時的補償義務。',
    to: '/annual-leave',
    page: '特休天數計算',
  },
]

const leaveMistakes = [
  '把周年制、曆年制和法定門檻混成同一件事，直接把公司算法當成法定天數。',
  '到職日或查詢日差一天，就把尚未取得的天數先算進去。',
  '只看總天數，不回頭確認已休、未休、遞延與折發工資的差異。',
  '離職時只談特休天數，卻沒有一起核對薪資結清與最後工作日。',
]

export default function AnnualLeaveGuide() {
  usePageMeta(
    '特休怎麼算懶人包｜滿半年、滿一年、未休折發與遞延一次看',
    '整理特休幾天、滿半年特休、未休折發工資與特休遞延的常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">特休整理</p>
        <h1 className="page-title">特休最常查的幾種問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋特休，真正卡住的通常不是表格本身，而是前面就把法定門檻、公司制度、未休折發與遞延規則混在一起。
          這頁先把最常見的特休問題拆開，讓你直接進到對的試算或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同樣在查特休，背後不一定是同一個問題</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {leaveScenarios.map(({ title, desc, to, cta }) => (
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
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你查的那句話，通常該先看哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            特休不是只有一個大關鍵字。把常見搜尋問句拆開對到不同入口，比把所有資訊塞在同一頁更容易讓 Google 理解主題層次。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {leaveSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再看特休天數</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在要看的是法定天數，還是公司內部制度換算後的天數。</li>
            <li>到職日與查詢日有沒有先核對，差一天都可能影響門檻。</li>
            <li>你查的是目前資格，還是離職時未休天數該怎麼處理。</li>
            <li>有沒有把遞延、先行給假與曆年制誤當成法定公式。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把特休看錯</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {leaveMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}