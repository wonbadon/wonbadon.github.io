import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const calculatorEntries = [
  {
    title: '加班費與假日出勤',
    desc: '平日延長工時、休息日、國定假日與休假日出勤，不是同一個倍率。先分日別，再進加班費工具。',
    to: '/overtime',
    cta: '直接進加班費計算機',
  },
  {
    title: '特休與年資門檻',
    desc: '如果你查的是特休幾天、滿半年能不能休、下一個門檻在哪，先用到職日與查詢日期做試算。',
    to: '/annual-leave',
    cta: '直接算特休天數',
  },
  {
    title: '資遣費與離職金額',
    desc: '資遣費要先分新制、舊制與平均工資口徑，不能把自請離職和非自願離職混在一起算。',
    to: '/severance',
    cta: '直接算資遣費',
  },
  {
    title: '勞退與退休金',
    desc: '如果你要查勞退 6%、自提與退休金累積結果，先用目前薪資與提繳年限抓輪廓。',
    to: '/labor-pension',
    cta: '直接進勞退試算',
  },
  {
    title: '薪資單、勞健保與實領',
    desc: '想核對薪資明細、實領月薪、勞健保扣項與勞退自提，先回到薪資明細工具再一起看。',
    to: '/salary-slip',
    cta: '直接看薪資明細計算',
  },
  {
    title: '保費與投保級距',
    desc: '如果你查的是勞健保怎麼算、雇主要負擔多少，或薪資應該落在哪個級距，就進保費與級距工具。',
    to: '/insurance-premium',
    cta: '直接算勞健保保費',
  },
]

const calculationSearchCards = [
  {
    keyword: '勞工計算',
    desc: '如果你只知道自己要查勞工計算，先從這頁把問題分到加班費、特休、資遣費、勞退或薪資單工具。',
    to: '/',
    page: '首頁工具總覽',
  },
  {
    keyword: '勞工試算',
    desc: '勞工試算通常是在找金額、天數或資格。先分你要算的是薪資、離職、請假還是退休，再進對應工具。',
    to: '/guide',
    page: '新手指南',
  },
  {
    keyword: '勞工試算網站',
    desc: '如果你要找的是一站式入口，首頁已經把常用試算與內容導覽放在同一層，不用自己重找一次。',
    to: '/',
    page: '首頁工具總覽',
  },
  {
    keyword: '資遣費試算或勞退試算',
    desc: '這類查詢其實是在找特定工具，不必先看大篇解說，直接進計算頁更快。',
    to: '/severance',
    page: '資遣費計算機',
  },
  {
    keyword: '勞健保試算或薪資試算',
    desc: '如果你是要核對保費扣項、實領薪資或級距，最好把薪資單與保費工具分開使用。',
    to: '/salary-slip',
    page: '薪資明細計算機',
  },
]

const calculationChecklist = [
  '先分清楚你要算的是金額、天數、資格還是制度差異，不要把不同問題混成一題。',
  '薪資、平均工資、投保薪資與勞退提繳工資不是同一個數字，輸入前先確認口徑。',
  '到職日、查詢日、通知日、最後工作日與實際出勤日是不同日期欄位，先整理好。',
  '如果結果牽涉非自願離職、變形工時、輪班或特殊津貼，算完還是要回頭做人工作業覆核。',
]

const calculationMistakes = [
  '看到「勞工計算」就直接找一個通用公式，沒有先分工具類型。',
  '把月薪、投保薪資與平均工資混用，導致整個試算基礎直接錯掉。',
  '特休、資遣費與勞退都跟日期有關，但用錯日期欄位是最常見失誤。',
  '把工具結果當成結論，沒有再回頭檢查自己輸入的制度與事實前提。',
]

export default function LaborCalculationGuide() {
  usePageMeta(
    '勞工計算與勞工試算工具總整理｜加班費、特休、資遣費、勞退與勞健保',
    '整理勞工計算、勞工試算最常用的加班費、特休、資遣費、勞退、薪資明細與勞健保工具，幫你先找到對的試算頁。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞工計算整理</p>
        <h1 className="page-title">勞工計算與勞工試算，不是只有一個總公式</h1>
        <p className="page-subtitle max-w-3xl">
          如果你查的是勞工計算、勞工試算、勞工計算網站或勞工試算網站，最常見的問題是還沒分清楚要算哪一種工具。
          這頁先把加班費、特休、資遣費、勞退、薪資單與勞健保入口整理好，讓你直接進到對的試算頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">常用試算</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">大多數人找勞工試算，最後都會回到這幾個工具</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {calculatorEntries.map(({ title, desc, to, cta }) => (
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
            <p className="page-eyebrow">不同查法</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你用什麼關鍵字進站，通常就該切到哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            把「勞工計算」這種大詞拆成具體工具，比把所有關鍵字塞回首頁更有用，因為真正要算的東西通常只有一種。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {calculationSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">算之前先分口徑</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這四件事先分對，勞工計算結果才有參考價值</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {calculationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常算歪</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些錯法，最容易讓勞工試算直接失真</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {calculationMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}