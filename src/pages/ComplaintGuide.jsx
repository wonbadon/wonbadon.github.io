import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const complaintScenarios = [
  {
    title: '還不確定自己是不是遇到違法',
    desc: '先把工時、工資、保險、請假或離職問題做一次快篩，先知道爭點在哪，再決定要不要往申訴走。',
    to: '/rights-check',
    cta: '先做權益健檢',
  },
  {
    title: '已經知道是扣薪、欠薪或逼離職',
    desc: '先把事件描述整理成爭議類型、法條方向與證據清單，後面申訴或調解才不會一直重講。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
  {
    title: '卡在離職文件、失業給付或終止程序',
    desc: '這類案件通常要把終止原因、文件名稱、預告期間與後續用途一次整理清楚。',
    to: '/dismissal-guide',
    cta: '先看解僱與離職入口',
  },
]

const complaintSearchCards = [
  {
    keyword: '勞工局申訴要準備什麼',
    desc: '先把薪資、出勤、訊息、文件與時間順序整理好，不要抱著印象直接去講。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '勞資調解要帶什麼',
    desc: '重點不是帶越多越好，而是要帶跟主張直接對得上的資料與金額計算。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '被逼離職要怎麼蒐證',
    desc: '先把會議、訊息、離職單、考績與通知時序整理出來，避免只剩口頭描述。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '公司不保勞健保怎麼檢舉',
    desc: '先把投保級距、薪資單、入職時間與保險狀態對照清楚，再決定主張方向。',
    to: '/insurance-benefits-guide',
    page: '勞保、職災與失業給付懶人包',
  },
  {
    keyword: '排班爭議要怎麼整理證據',
    desc: '班表、改班通知、打卡與薪資單通常要放在同一條時間線，不然很難講清楚。',
    to: '/attendance-dispute-guide',
    page: '排班與出勤爭議懶人包',
  },
  {
    keyword: '申訴前要不要先把金額算清楚',
    desc: '如果主張工資、資遣費或職災補償，先抓出金額輪廓，調解時會更有方向。',
    to: '/severance-guide',
    page: '資遣費怎麼算懶人包',
  },
]

const complaintMistakes = [
  '只想著去申訴，卻沒有先把事件時序、主張項目與對應證據整理成同一份脈絡。',
  '現場只用口頭敘述，沒有帶薪資單、打卡、班表、訊息、離職文件或醫療證明。',
  '主張很多件事，但沒有分清楚哪些是工資、哪些是排班、哪些是離職或保險問題。',
  '在蒐證前就先簽離職、切結或和解文件，事後才回頭想補救。',
]

export default function ComplaintGuide() {
  usePageMeta(
    '勞工申訴流程懶人包｜蒐證、勞工局申訴、調解與檢舉一次看',
    '整理勞工局申訴、勞資調解、檢舉前蒐證、時序整理與常見文件，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">申訴與調解</p>
        <h1 className="page-title">勞工局申訴、蒐證與調解最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋申訴、檢舉或調解，其實真正卡住的通常不是去哪裡，而是前面沒有把事件、證據和主張整理好。
          這頁先把最常見的申訴流程問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種爭議，都該直接跳到申訴</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {complaintScenarios.map(({ title, desc, to, cta }) => (
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
            申訴流程真正重要的不是名詞，而是你現在手上的案子屬於哪一類爭議。先把問句分流，後面整理證據和主張才會有結構。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {complaintSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">申訴前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談申訴流程</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在要主張的是工資、排班、離職、保險，還是職災補償問題。</li>
            <li>有沒有先把事件時間線、主張金額、公司回應與手上證據整理成同一份脈絡。</li>
            <li>你是要先快篩風險、整理爭點，還是已經準備好進入申訴或調解階段。</li>
            <li>有沒有先避免在蒐證完成前簽不利文件、切結書或自請離職單。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把申訴流程走歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {complaintMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}