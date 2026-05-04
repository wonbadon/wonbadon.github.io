import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const retirementScenarios = [
  {
    title: '只想先看勞退帳戶',
    desc: '先確認月提繳級距、自提比例與目前帳戶累積，再看長期累積結果。',
    to: '/labor-pension-guide',
    cta: '先看勞退懶人包',
  },
  {
    title: '想估勞保老年年金',
    desc: '這不是單純看勞退帳戶餘額，而是要把投保年資、平均投保薪資與請領年齡一起看。',
    to: '/retirement-planner',
    cta: '先看退休年齡規劃',
  },
  {
    title: '想比較幾歲退休比較划算',
    desc: '重點不是單看某一歲的月領金額，而是把勞保年金、勞退帳戶與退休時間一起攤開比較。',
    to: '/retirement-planner',
    cta: '先比較退休年齡',
  },
]

const retirementSearchCards = [
  {
    keyword: '勞保退休金怎麼算',
    desc: '先分清楚你在查的是勞保老年年金，還是勞退個人帳戶，這兩者不是同一套退休金。',
    to: '/retirement-planner',
    page: '退休年齡規劃',
  },
  {
    keyword: '勞保年金幾歲領比較好',
    desc: '請領年齡會影響金額，但不能只看單月差額，還要一起看你的投保年資與退休安排。',
    to: '/retirement-planner',
    page: '退休年齡規劃',
  },
  {
    keyword: '勞退和勞保差在哪',
    desc: '勞退是個人帳戶，勞保老年給付是另一套保險制度，退休時通常要一起看，但不能混算。',
    to: '/labor-pension-guide',
    page: '勞退怎麼算懶人包',
  },
  {
    keyword: '60 歲退休可以領多少',
    desc: '先帶入目前年齡、投保年資、平均投保薪資與勞退累積，再比較不同退休年齡。',
    to: '/retirement-planner',
    page: '退休年齡規劃',
  },
  {
    keyword: '退休每月可以領多少',
    desc: '退休收入通常不是只有一個來源，而是勞保年金、勞退帳戶與其他規劃一起看。',
    to: '/retirement-planner',
    page: '退休年齡規劃',
  },
  {
    keyword: '勞退自提有差嗎',
    desc: '如果你在意的是長期退休差異，應先分清楚當下現金流、自提比例與預計持續多久。',
    to: '/labor-pension',
    page: '勞退退休金試算',
  },
]

const retirementMistakes = [
  '把勞保老年年金和勞退個人帳戶當成同一個退休金來源。',
  '只看某一歲的月領金額，沒有一起比較提早或延後退休的整體差異。',
  '把目前月薪直接當成勞保年金計算基礎，沒有先確認投保年資與平均投保薪資。',
  '只看勞退自提的節稅效果，沒有一起評估退休前現金流與可持續性。',
]

export default function RetirementPlanningGuide() {
  usePageMeta(
    '退休準備懶人包｜勞退、勞保老年年金與退休年齡規劃一次看',
    '整理勞退、勞保老年年金、退休年齡、退休月收入與自提差異常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">退休準備</p>
        <h1 className="page-title">勞退、勞保老年年金與退休年齡最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋退休金、勞保年金或幾歲退休比較好，其實最常卡住的不是公式，而是前面就把勞退和勞保年金混成同一套制度。
          這頁先把退休準備最常見的問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同樣在查退休，背後可能不是同一套制度</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {retirementScenarios.map(({ title, desc, to, cta }) => (
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
            退休相關搜尋最常混到勞退、自提、勞保年金與請領年齡。先把搜尋問句分流，入口才會明確。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {retirementSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談退休規劃</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你查的是勞退個人帳戶、勞保老年年金，還是不同退休年齡的比較。</li>
            <li>有沒有先確認目前年齡、投保年資、平均投保薪資與勞退累積資料。</li>
            <li>你在意的是月領金額、一次看總體退休收入，還是自提比例差異。</li>
            <li>是否把勞保年金的保險制度，和勞退個人帳戶的累積制度混在一起。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把退休規劃看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {retirementMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}