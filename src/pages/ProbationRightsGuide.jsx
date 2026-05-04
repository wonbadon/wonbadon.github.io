import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const probationScenarios = [
  {
    title: '試用期想離職或被要求離開',
    desc: '先分清楚是你主動提離職、公司終止契約，還是被逼簽離職單，不能都叫試用期沒過就帶過。',
    to: '/dismissal-guide',
    cta: '先看被開除怎麼辦懶人包',
  },
  {
    title: '試用期預告期怎麼算',
    desc: '很多人以為試用期就完全沒有預告期，但實際上還是要先回到年資、通知時間與終止原因判斷。',
    to: '/notice-period',
    cta: '先看離職預告期計算',
  },
  {
    title: '試用期薪資、保險與年資問題',
    desc: '如果你卡在試用期薪水比較低、有沒有保勞健保、試用期算不算年資，應先把工資與投保資料拆開看。',
    to: '/salary-slip-guide',
    cta: '先看薪資單與勞健保懶人包',
  },
]

const probationSearchCards = [
  {
    keyword: '試用期可以隨時開除嗎',
    desc: '試用期不是法律真空地帶，關鍵是公司終止的理由、程序與證據，而不是只說一句試用沒過。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '試用期離職要預告嗎',
    desc: '不要只看是不是試用期，還是要回到實際年資與通知方式，才能判斷要不要預告。',
    to: '/notice-period',
    page: '離職預告期計算',
  },
  {
    keyword: '試用期薪水可以比較低嗎',
    desc: '先分清楚是約定薪資本來就不同，還是公司以試用期名義低於基本工資、少給加班費或亂扣薪。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '試用期要保勞健保嗎',
    desc: '試用期通常不是不保的理由，應先把到職時間、投保時間與薪資單資料一起對照。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '試用期算年資嗎',
    desc: '很多後續權益都會碰到這個問題，關鍵在於你和公司之間的勞動關係是不是已經開始，而不是標題寫試用就排除。',
    to: '/leaving-job',
    page: '離職權益懶人包',
  },
  {
    keyword: '試用期沒過怎麼申訴',
    desc: '如果你懷疑程序或理由有問題，先把面談紀錄、通知訊息、薪資與出勤證據整理好，再決定後續做法。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const probationMistakes = [
  '以為試用期就是完全沒有勞基法保障，公司想怎麼終止都可以。',
  '只看公司說試用沒過，沒有先保留面談紀錄、通知訊息與工作表現相關證據。',
  '把試用期薪資、投保、年資、預告期與終止程序全部混成同一題。',
  '被要求立刻簽離職單就直接簽掉，沒有先分清楚是自請離職還是公司終止。',
]

export default function ProbationRightsGuide() {
  usePageMeta(
    '試用期權益懶人包｜試用期開除、離職預告、薪資與勞健保一次看',
    '整理試用期可以隨時開除嗎、試用期離職要預告嗎、試用期薪水與勞健保常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">試用期</p>
        <h1 className="page-title">試用期、到職初期與被說不適任最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋試用期可以隨時開除嗎、試用期要不要保勞健保，最常出錯的不是法條背不起來，而是前面就把預告期、薪資、年資和終止程序混成同一題。
          這頁先把試用期最常見的問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種試用期問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {probationScenarios.map(({ title, desc, to, cta }) => (
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
            試用期最常把薪資、保險、年資和終止程序混在一起。先把搜尋問句分流，才不會一開始就走錯方向。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {probationSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談試用期權益</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你遇到的是自己提離職、公司終止契約，還是被要求簽自願離職。</li>
            <li>有沒有先保留錄用通知、薪資約定、投保資料、面談紀錄與終止訊息。</li>
            <li>你在意的是預告期、薪資、投保，還是公司終止的理由和程序。</li>
            <li>是否把試用期、正式任用與到職起算年資全部混成同一題。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把試用期問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {probationMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}