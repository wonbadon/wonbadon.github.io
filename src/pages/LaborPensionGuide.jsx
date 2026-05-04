import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const pensionScenarios = [
  {
    title: '只看雇主 6% 提撥',
    desc: '先確認你的月提繳級距，再看雇主每月依法固定提撥的金額。',
    to: '/labor-pension',
    cta: '先看勞退試算',
  },
  {
    title: '想比較自提要不要開',
    desc: '自提不是越高越好，應一起看現金流、節稅效果與長期累積差異。',
    to: '/labor-pension',
    cta: '先比較自提差異',
  },
  {
    title: '想分清勞退和勞保年金',
    desc: '勞退個人帳戶和勞保老年年金不是同一套制度，退休時通常要一起看。',
    to: '/retirement-planner',
    cta: '先看退休規劃',
  },
]

const pensionSearchCards = [
  {
    keyword: '勞退 6% 怎麼算',
    desc: '先確認月提繳工資級距，再看雇主提撥 6% 的金額，不是直接拿月薪乘 6% 就結束。',
    to: '/labor-pension',
    page: '勞退退休金試算',
  },
  {
    keyword: '勞退自提要不要開',
    desc: '自提有節稅和長期累積效果，但也會影響當下可支配所得，不能只看單一優點。',
    to: '/labor-pension',
    page: '勞退退休金試算',
  },
  {
    keyword: '勞退和勞保一樣嗎',
    desc: '勞退是個人帳戶，勞保老年給付是另一套制度，退休時通常兩邊都要一起看。',
    to: '/retirement-planner',
    page: '退休年齡規劃',
  },
  {
    keyword: '月薪多少對應哪個勞退級距',
    desc: '先對照提繳級距，再看雇主提撥與自提金額，不要只拿名目月薪估。',
    to: '/insurance-brackets',
    page: '投保級距查詢',
  },
]

const pensionMistakes = [
  '把勞退個人帳戶和勞保老年年金混成同一套退休金。',
  '以為雇主提撥 6% 會直接從你薪資扣掉，其實那是雇主額外負擔。',
  '只看名目月薪，沒有先確認實際對應的月提繳工資級距。',
  '自提只看節稅，卻沒有一起評估現金流與長期持續能力。',
]

export default function LaborPensionGuide() {
  usePageMeta(
    '勞退怎麼算懶人包｜雇主 6%、自提、級距與退休規劃一次看',
    '整理勞退 6% 怎麼算、勞退自提、提繳級距與勞退和勞保差異，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞退整理</p>
        <h1 className="page-title">勞退最常查的幾種問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋勞退，其實卡住的通常不是 6% 這個數字，而是前面就把提繳級距、自提、勞退帳戶和勞保年金混在一起。
          這頁先把最常見的勞退問題拆開，讓你直接進到對的試算或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同樣在查退休金，背後可能不是同一套制度</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pensionScenarios.map(({ title, desc, to, cta }) => (
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
            勞退相關搜尋常混到勞保年金、提繳級距、自提比例與節稅。先把問題分流，對搜尋引擎和使用者都比較清楚。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {pensionSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談勞退</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你要看的是雇主固定提撥、自提差異，還是整體退休規劃。</li>
            <li>月薪是否真的落在你以為的提繳級距，而不是只看名目薪資。</li>
            <li>你查的是勞退個人帳戶，還是勞保老年年金，兩者不能混用。</li>
            <li>收益率是不是只是規劃假設，而不是保證報酬承諾。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把勞退看錯</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {pensionMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}