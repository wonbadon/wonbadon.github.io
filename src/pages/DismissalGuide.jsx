import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const dismissalScenarios = [
  {
    title: '收到資遣或終止通知',
    desc: '先拆清楚是否屬於非自願離職，再看資遣費、預告工資與相關文件。',
    to: '/severance',
    cta: '先看資遣費怎麼算',
  },
  {
    title: '公司要你自己簽離職',
    desc: '這通常不是單純的離職流程問題，而是要先整理證據，判斷是不是被逼離職或規避責任。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
  {
    title: '想確認預告期與最後工作日',
    desc: '不管是公司通知還是你自己準備離開，都要先把通知日、最後工作日與預告期間算清楚。',
    to: '/notice-period',
    cta: '先看離職預告期',
  },
]

const dismissalSearchCards = [
  {
    keyword: '被開除怎麼辦',
    desc: '先整理公司給的理由、書面通知、對話紀錄與出勤資料，不要只記印象。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '被逼離職怎麼辦',
    desc: '先分清楚是自請離職還是公司實質上在逼退，兩者權益差很多。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '非自願離職證明是什麼',
    desc: '先確認終止原因、文件名稱與後續用途，尤其是資遣和失業給付會用到。',
    to: '/leaving-job',
    page: '離職權益懶人包',
  },
  {
    keyword: '失業給付怎麼領',
    desc: '先把非自願離職身分、文件與離職流程理清，不要一開始就只查金額。',
    to: '/insurance-benefits-guide',
    page: '勞保、職災與失業給付懶人包',
  },
  {
    keyword: '資遣通知後多久離職',
    desc: '先看預告期間、最後工作日與有沒有預告工資，日期抓錯很容易吃虧。',
    to: '/notice-period',
    page: '離職預告期計算',
  },
  {
    keyword: '被叫當天走人，交接和文件怎麼辦',
    desc: '如果公司要求立刻離場，先把最後工作日、交接要求、帳號權限與應拿文件拆開記錄。',
    to: '/exit-handover-guide',
    page: '離職交接與最後工作日懶人包',
  },
  {
    keyword: '試用期可以隨時開除嗎',
    desc: '試用期不是公司可以省略終止理由和程序的空白地帶，應先分清楚是試用不適任還是一般解僱爭議。',
    to: '/probation-rights-guide',
    page: '試用期權益懶人包',
  },
]

const dismissalMistakes = [
  '公司要求簽自請離職就直接簽，沒有先分清楚到底是不是非自願離職。',
  '只留口頭通知，沒有保留訊息、會議紀錄、書面通知或錄音等證據。',
  '只看資遣費，沒有同時核對預告期間、預告工資、特休結清與文件。',
  '以為公司只要說表現不好就一定可以合法開除，忽略終止事由和程序要件。',
]

export default function DismissalGuide() {
  usePageMeta(
    '被開除怎麼辦懶人包｜解僱、逼離職、非自願離職與失業給付一次看',
    '整理被開除怎麼辦、被逼離職、非自願離職證明與失業給付常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">解僱爭議</p>
        <h1 className="page-title">被開除、被逼離職與非自願離職最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋被開除、非自願離職或失業給付，其實前一步都要先分清楚終止勞動契約的原因與形式。
          這頁先把最常見的解僱與離職爭議拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種離開公司，都叫同一件事</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {dismissalScenarios.map(({ title, desc, to, cta }) => (
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
            解僱爭議不只是查一個名詞，而是查「到底是哪一種終止」。先把關鍵字分流，搜尋相關性會比把所有內容塞在一頁更高。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dismissalSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">離開前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談解僱權益</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在遇到的是資遣、解僱、被逼離職，還是公司要求你自己提離職。</li>
            <li>有沒有先保留書面通知、訊息、會議紀錄、考績紀錄與打卡資料。</li>
            <li>你查的是資遣費、預告工資、非自願離職證明，還是失業給付銜接。</li>
            <li>通知日、最後工作日、到職日與未休特休是否已先核對。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把解僱爭議看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {dismissalMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}