import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const partTimeScenarios = [
  {
    title: '先看時薪、月薪與最低工資',
    desc: '如果你先卡在時薪月薪怎麼換、最低時薪夠不夠，應先把換算口徑和工作時數分開看。',
    to: '/wage-converter',
    cta: '先看時薪月薪換算',
  },
  {
    title: '兼職排班、加班與國定假日出勤',
    desc: '兼職不是就沒有加班費，還是要先分清楚工作日性質、實際出勤時數與班表安排。',
    to: '/attendance-dispute-guide',
    cta: '先看排班與出勤爭議懶人包',
  },
  {
    title: '打工被扣薪、少給錢或沒保險',
    desc: '如果你遇到的是少給工資、亂扣薪或懷疑沒依法投保，應先把薪資與投保資料整理出來。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
]

const partTimeSearchCards = [
  {
    keyword: '打工加班費怎麼算',
    desc: '兼職、計時人員不代表沒有加班費，還是要先回到平日、休息日或國定假日的日別去判斷。',
    to: '/overtime-guide',
    page: '加班費怎麼算懶人包',
  },
  {
    keyword: '兼職有特休嗎',
    desc: '特休不是只有正職才有，重點在於年資與法定資格，不是職稱叫兼職就直接排除。',
    to: '/annual-leave-guide',
    page: '特休怎麼算懶人包',
  },
  {
    keyword: '打工最低時薪多少',
    desc: '先分清楚你拿的是時薪還是月薪，再看實際工時、班表與換算後的時薪有沒有低於最低工資。',
    to: '/wage-converter',
    page: '時薪月薪換算',
  },
  {
    keyword: '打工國定假日上班有雙倍嗎',
    desc: '不能只看自己是兼職還是正職，還是要先看當天日別、薪資型態與實際出勤時數。',
    to: '/overtime-guide',
    page: '加班費怎麼算懶人包',
  },
  {
    keyword: '兼職要保勞健保嗎',
    desc: '兼職投保不是一句有或沒有就結束，還要先看工時、雇用型態與實際申報狀況。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '打工被臨時刪班怎麼辦',
    desc: '先保留原班表、改班通知與實際工時紀錄，再分清楚是排班爭議、少給工資，還是另外的終止問題。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const partTimeMistakes = [
  '以為兼職、工讀或計時人員就沒有加班費、特休或其他基本權益。',
  '只看表面時薪，沒有把實際工時、班表、扣項與換算後薪資一起攤開。',
  '沒有保留班表、打卡紀錄、匯款證明與聊天截圖，後面只剩口頭說法。',
  '把排班刪班、亂扣薪、未投保與國定假日出勤混成一題，後面很難整理主張。',
]

export default function PartTimeRightsGuide() {
  usePageMeta(
    '打工兼職權益懶人包｜時薪、排班、加班費與最低工資一次看',
    '整理打工加班費怎麼算、兼職有特休嗎、最低時薪、兼職投保與刪班扣薪常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">打工兼職</p>
        <h1 className="page-title">打工、兼職與計時人員最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋打工加班費、兼職有沒有特休或最低時薪，其實最常卡住的不是規定本身，而是前面就把時薪換算、排班日別、投保和扣薪問題混在一起。
          這頁先把打工兼職常見問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種兼職問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {partTimeScenarios.map(({ title, desc, to, cta }) => (
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
            打工兼職最容易在前面就把時薪、排班、加班費和投保混成一題。先把搜尋問句分流，後面的權益才有機會判斷得準。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {partTimeSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談打工兼職權益</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你要查的是最低時薪、加班費、特休、投保，還是刪班與扣薪問題。</li>
            <li>有沒有先保留班表、打卡、薪資單、匯款紀錄與雇主通知。</li>
            <li>你拿的是時薪、月薪，還是看似時薪但其實另有固定工時安排。</li>
            <li>當天是一般工作日、休息日，還是國定假日，不要只看自己叫不叫兼職。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把兼職權益看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {partTimeMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}