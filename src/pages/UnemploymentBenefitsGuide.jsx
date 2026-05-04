import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const unemploymentScenarios = [
  {
    title: '先確認是不是非自願離職',
    desc: '很多人一開始就查失業給付金額，但真正卡住的是終止原因、文件名稱與是不是符合非自願離職身分。',
    to: '/dismissal-guide',
    cta: '先看被開除怎麼辦懶人包',
  },
  {
    title: '核對資遣、預告工資與離職文件',
    desc: '如果你剛收到終止通知，通常要先把資遣費、預告工資、最後工作日與應拿文件拆開確認。',
    to: '/severance-guide',
    cta: '先看資遣費怎麼算懶人包',
  },
  {
    title: '文件不齊或被要求改簽自願離職',
    desc: '這通常不是單純行政問題，而是要先保留終止通知、對話紀錄與公司要求你改簽文件的證據。',
    to: '/complaint-guide',
    cta: '先看勞工申訴流程懶人包',
  },
]

const unemploymentSearchCards = [
  {
    keyword: '失業給付怎麼領',
    desc: '不要只先查金額，先確認是不是非自願離職、文件有沒有拿齊，以及後面申請時程怎麼接。',
    to: '/insurance-benefits-guide',
    page: '勞保、職災與失業給付懶人包',
  },
  {
    keyword: '非自願離職證明是什麼',
    desc: '你要先分清楚資遣通知、離職證明、服務證明與就業保險要用的文件，名稱看起來很像但用途不同。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '失業給付要準備哪些文件',
    desc: '通常至少要先回頭整理終止原因、公司開的文件、離職日期與後續申辦流程，不是只帶一張紙就好。',
    to: '/exit-handover-guide',
    page: '離職交接與最後工作日懶人包',
  },
  {
    keyword: '被資遣後多久可以申請失業給付',
    desc: '這題會同時卡在最後工作日、求職登記與申請節點，日期沒有先釐清很容易全線延誤。',
    to: '/notice-period',
    page: '離職預告期計算',
  },
  {
    keyword: '公司不給非自願離職文件怎麼辦',
    desc: '先留住終止通知、訊息紀錄與公司不願開立的回覆，再決定要不要往申訴、調解或檢舉走。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '失業給付被退件怎麼辦',
    desc: '多半不是只差一個按鈕，而是身分、文件或終止原因前面沒有整理乾淨，先回頭補證據與文件鏈。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
]

const unemploymentMistakes = [
  '把離職證明、服務證明、非自願離職文件與資遣通知當成同一份文件，後面申請時才發現用途不同。',
  '公司叫你先簽自願離職就簽，沒有先確認這會不會影響失業給付與後續爭議主張。',
  '只查可以領多少錢，沒有先把最後工作日、文件、求職登記與申請時程排清楚。',
  '文件被拖延或被拒開時，沒有先保留公司回覆、對話紀錄與終止通知。',
]

export default function UnemploymentBenefitsGuide() {
  usePageMeta(
    '失業給付與非自願離職文件懶人包｜申請資格、證明文件與時程一次看',
    '整理失業給付怎麼領、非自願離職證明文件、申請時程、退件原因與公司不開文件時怎麼處理，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">失業給付</p>
        <h1 className="page-title">失業給付、非自願離職文件與申請時程最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋失業給付怎麼領，實際上前一步常卡在是不是非自願離職、文件名稱到底差在哪，
          或公司不願意開該給的文件。這頁先把失業給付與非自願離職文件最常見的問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種失業給付問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {unemploymentScenarios.map(({ title, desc, to, cta }) => (
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
            失業給付最常卡住的不是一個金額公式，而是前面文件、身分與時序沒有分清楚。先把搜尋問句分流，後面才不會每一步都重跑。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {unemploymentSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談失業給付與文件</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在卡的是非自願離職身分、文件名稱、申請時程，還是公司根本不願意開立文件。</li>
            <li>有沒有先把終止通知、最後工作日、公司回覆、離職文件與求職登記節點整理成同一條時間線。</li>
            <li>你要處理的是失業給付申請，還是前面其實先要解決被逼簽自願離職、文件錯誤或退件原因。</li>
            <li>是否把離職證明、服務證明、非自願離職文件與失業給付申辦流程混成同一件事。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把失業給付問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {unemploymentMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}