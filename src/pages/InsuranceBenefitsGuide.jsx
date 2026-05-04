import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const insuranceScenarios = [
  {
    title: '先確認公司保得對不對',
    desc: '先對照投保薪資、勞退提繳級距與實際月薪，分清楚是保費問題、低報問題，還是單純看不懂級距。',
    to: '/insurance-brackets',
    cta: '先查投保級距',
  },
  {
    title: '工作中受傷或需要休養',
    desc: '這通常不是只有請假，而是可能同時牽涉職災醫療、工資補償、傷病給付與雇主補償責任。',
    to: '/occupational-accident',
    cta: '先看職災給付怎麼算',
  },
  {
    title: '非自願離職準備接失業給付',
    desc: '先分清楚自己是不是非自願離職，再看離職文件、就保資格與後續申請流程。',
    to: '/dismissal-guide',
    cta: '先看解僱與失業給付入口',
  },
]

const insuranceSearchCards = [
  {
    keyword: '職災怎麼申請',
    desc: '先把事故時間、就醫紀錄、醫囑、停工天數與公司回應整理清楚，再判斷該走哪些給付。',
    to: '/occupational-accident',
    page: '職災給付計算',
  },
  {
    keyword: '失業給付怎麼領',
    desc: '先確認是不是非自願離職、有沒有拿到對的文件，以及後續要不要先處理爭議。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '勞保低報怎麼看',
    desc: '先對照實際月薪、投保薪資與勞退提繳級距，不要只憑單月保費差額判斷。',
    to: '/insurance-brackets',
    page: '投保級距查詢',
  },
  {
    keyword: '職災休養期間薪水怎麼算',
    desc: '要先分清楚工資補償、災保傷病給付與公司另外應負責的部分，不能只抓一筆錢看。',
    to: '/occupational-accident',
    page: '職災給付計算',
  },
  {
    keyword: '勞保傷病給付和公司補償差在哪',
    desc: '重點不是只查哪一個比較多，而是先分清楚給付來源、資格和文件。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '失業給付被退件怎麼辦',
    desc: '如果卡在文件、身分或終止原因，通常要先回頭整理離職文件與蒐證。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const insuranceMistakes = [
  '把勞保給付、職災補償、公司補償與失業給付當成同一筆錢在看，結果每一塊都搞混。',
  '沒有先保留投保薪資、醫療證明、停工期間、離職文件與公司訊息，就直接問能不能領。',
  '以為只要受傷或離職就一定能領失業給付或職災相關給付，忽略資格和文件前提。',
  '只查金額，不先分清楚是低報投保、就保資格、職災認定還是公司程序卡住。',
]

export default function InsuranceBenefitsGuide() {
  usePageMeta(
    '勞保、職災與失業給付懶人包｜勞保給付、職災補償與失業給付流程一次看',
    '整理勞保給付怎麼看、職災補償與失業給付申請流程、文件與常見誤區，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞保與給付</p>
        <h1 className="page-title">勞保、職災與失業給付最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋勞保、職災或失業給付，其實前一步都不是直接查金額，而是先分清楚自己卡在投保、文件、身分，
          還是給付來源。這頁先把最常見的保險與給付問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種保險問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {insuranceScenarios.map(({ title, desc, to, cta }) => (
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
            勞保與給付問題的核心，通常不是算式本身，而是先分對制度。先把搜尋問句分流，才不會把低報投保、職災補償與失業給付混成一團。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insuranceSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">申請前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談保險與給付</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在遇到的是低報投保、職災醫療休養、非自願離職，還是單純想看投保級距。</li>
            <li>有沒有先把投保薪資、薪資單、醫療證明、停工時間、離職文件與公司說法放在一起。</li>
            <li>你要查的是勞保給付、職災補償、公司工資補償，還是失業給付申請流程。</li>
            <li>有沒有先分清楚資格、文件與給付來源，而不是只先問可以領多少錢。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把給付問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {insuranceMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}