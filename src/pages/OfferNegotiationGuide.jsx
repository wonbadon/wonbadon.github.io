import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const offerScenarios = [
  {
    title: '拿兩份 offer 比年包與時間成本',
    desc: '如果你手上不只一個機會，應把月薪、年終、津貼、加班與通勤一起拉到同一個口徑比較。',
    to: '/salary-compare',
    cta: '先看薪資比較器',
  },
  {
    title: '想把月薪、時薪與年薪拆開談',
    desc: '很多談薪卡在前面就沒換算清楚，只記月薪數字，沒有把年包、工時與法定換算一起看。',
    to: '/wage-converter',
    cta: '先看時薪月薪換算',
  },
  {
    title: '想確認實領薪資、保費與試用期條件',
    desc: '如果 offer 寫試用期薪資、固定津貼或保障獎金，應先把實領薪資與到職後扣項拆開看。',
    to: '/salary-slip-guide',
    cta: '先看薪資單與勞健保懶人包',
  },
]

const offerSearchCards = [
  {
    keyword: 'offer 怎麼比',
    desc: '不要只比月薪，至少要把年終、津貼、加班、特休與通勤時間一起攤開。',
    to: '/salary-compare',
    page: '薪資比較器',
  },
  {
    keyword: '薪資談判要看哪些數字',
    desc: '談薪不只是一句想加多少，而是要先知道你拿什麼換、哪些是固定收入、哪些是條件式收入。',
    to: '/salary-compare',
    page: '薪資比較器',
  },
  {
    keyword: '新鮮人起薪怎麼談',
    desc: '如果你還不熟月薪、時薪、年薪換算，先把工作時數、津貼與通勤成本轉成同一個口徑。',
    to: '/wage-converter',
    page: '時薪月薪換算',
  },
  {
    keyword: '保證年薪跟月薪差在哪',
    desc: '有些看起來很高的年薪其實拆了年終、簽約金、津貼或條件式獎金，不能直接當固定月薪看。',
    to: '/year-end-bonus-guide',
    page: '年終獎金懶人包',
  },
  {
    keyword: '津貼算不算薪水',
    desc: '很多薪酬爭議卡在這裡，尤其是固定津貼、伙食費或交通補助到底是不是工資。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: 'offer 寫試用期薪資怎麼看',
    desc: '不要只看試用期三個字，還是要回到基本工資、勞健保、年資與正式任用條件一起看。',
    to: '/probation-rights-guide',
    page: '試用期權益懶人包',
  },
]

const offerMistakes = [
  '只看月薪高低，沒有把年終、津貼、加班、特休與通勤時間換成同一套口徑。',
  '把保證年薪、條件獎金、留任獎金與固定月薪混成同一筆固定收入。',
  '沒有先算清楚實領薪資與扣項，就直接拿名目薪資當談判基準。',
  '談薪只講期望數字，沒有先整理自己在意的是現金、工時、成長性還是通勤成本。',
]

export default function OfferNegotiationGuide() {
  usePageMeta(
    'Offer 比較與薪資談判懶人包｜年薪、談薪與新鮮人起薪一次看',
    '整理 offer 怎麼比、薪資談判看哪些數字、保證年薪差異與新鮮人起薪常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">Offer 比較</p>
        <h1 className="page-title">Offer 比較、薪資談判與新鮮人起薪最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋薪資談判或 offer 怎麼比，最後卻只盯著月薪看。真正容易失真的地方，通常是年終、津貼、加班、特休、
          通勤與試用期條件沒有一起攤開。這頁先把最常見的談薪問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種談薪問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {offerScenarios.map(({ title, desc, to, cta }) => (
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
            談薪最常出錯的不是不會談，而是前面就沒有把條件拆成固定收入、變動收入與時間成本。先分流，結論才不會失真。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offerSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">先確認</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談薪資與 offer</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你在比的是固定月薪、年包、實領薪資，還是把通勤與工時一起算進去的整體條件。</li>
            <li>有沒有先把年終、津貼、加班、特休、試用期條件與通勤時間拆成同一套口徑。</li>
            <li>你在意的是談薪數字本身，還是到職後真正落袋的實領薪資與時間成本。</li>
            <li>是否把保證年薪、條件獎金與固定月薪混成同一筆穩定收入。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把談薪結果看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {offerMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}