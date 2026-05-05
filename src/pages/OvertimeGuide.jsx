import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const overtimeScenarios = [
  {
    title: '平日延長工時',
    desc: '同一天仍是一般工作日，只是超過正常工時。前 2 小時與第 3 小時起倍率不同。',
    to: '/overtime',
    cta: '直接進加班費試算',
  },
  {
    title: '休息日出勤',
    desc: '重點不是做幾小時，而是那一天本來是不是休息日。前 2 小時、3 至 8 小時與第 9 小時起倍率不同。',
    to: '/scenarios',
    cta: '先看情境差異',
  },
  {
    title: '國定假日 / 休假日出勤',
    desc: '月薪制與時薪制的 8 小時內給付口徑不同，超過 8 小時才再接延長工時倍率。',
    to: '/overtime',
    cta: '先看假日加班算法',
  },
]

const overtimeSearchCards = [
  {
    keyword: '加班費怎麼算',
    desc: '先分平日、休息日與國定假日，再看倍率，不要只拿一個倍數硬套。',
    to: '/overtime',
    page: '加班費計算機',
  },
  {
    keyword: '休息日加班費怎麼算',
    desc: '休息日不是平日延長工時，前 2 小時、3 至 8 小時與第 9 小時起是不同分段。',
    to: '/scenarios',
    page: '熱門情境比較',
  },
  {
    keyword: '國定假日上班薪水怎麼算',
    desc: '先分月薪制還是時薪制，再看 8 小時內與超過 8 小時的口徑。',
    to: '/overtime',
    page: '加班費計算機',
  },
  {
    keyword: '月薪制假日出勤為什麼還要另外算',
    desc: '這通常不是月薪已經包掉，而是法條對國定假日與休假日出勤有額外給付規則。',
    to: '/faq',
    page: '常見問題',
  },
  {
    keyword: '責任制或變形工時還要算加班費嗎',
    desc: '如果公司先拿責任制、輪班或變形工時當前提，問題通常已經不是單純倍率，而是制度本身和津貼、工時紀錄要一起看。',
    to: '/flexible-schedule-guide',
    page: '變形工時、責任制與輪班津貼懶人包',
  },
]

const overtimeMistakes = [
  '把休息日出勤直接當平日加班，倍率就會整段錯掉。',
  '把國定假日、休假日與一般例假日混成同一類，導致算法完全跑偏。',
  '月薪制看到假日出勤另外加發，就誤以為是重複計薪，沒有先分清法條邏輯。',
  '沒有先確認薪資型態、假別與工時，直接套網路上單一句公式。',
]

export default function OvertimeGuide() {
  usePageMeta(
    '加班費怎麼算懶人包｜平日、休息日、國定假日加班費一次看',
    '整理加班費怎麼算、休息日加班費、國定假日上班薪水與月薪制假日出勤的常見問題，先分情境再進試算。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">加班費整理</p>
        <h1 className="page-title">加班費最常查的幾種情況，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋加班費，其實卡住的點不是算式本身，而是前面就把平日、休息日、國定假日或月薪制口徑分錯。
          這頁先把最常見的加班費問題拆開，讓你直接進到對的試算或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同樣叫加班，法條口徑可能完全不同</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {overtimeScenarios.map(({ title, desc, to, cta }) => (
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
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你查的那句話，通常應該先看哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            加班費不是只有一個關鍵字。Google 抓的是整個問題脈絡，所以把常見搜尋問句拆成不同入口，比把所有字硬塞在同一頁更有效。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {overtimeSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，結果才不會偏掉</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>今天到底是一般工作日、休息日、國定假日還是休假日。</li>
            <li>你是月薪制還是時薪制，8 小時內給付口徑不一定一樣。</li>
            <li>輸入的是實際出勤工時，還是把不同情境的工時混在一起。</li>
            <li>你要算的是本次應另補發的金額，還是以為要把整個月薪重算一次。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易讓加班費直接算歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {overtimeMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}