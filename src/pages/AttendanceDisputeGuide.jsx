import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const attendanceScenarios = [
  {
    title: '今天到底算哪一種出勤',
    desc: '先分清楚是平日延長工時、休息日、國定假日還是例假日，因為倍率和處理方式完全不同。',
    to: '/scenarios',
    cta: '先看情境比較',
  },
  {
    title: '公司臨時改班、排休或叫你補班',
    desc: '這通常不只是出勤費，而是牽涉班表通知、排班依據、出勤證據與公司是否片面變更。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
  {
    title: '碰到颱風天、補休或輪班連假',
    desc: '這些情境最容易把補休、假日出勤和正常排班混在一起，應先分清楚原始班表。',
    to: '/typhoon-workday-guide',
    cta: '先看颱風假與天災出勤懶人包',
  },
]

const attendanceSearchCards = [
  {
    keyword: '國定假日上班有雙倍嗎',
    desc: '先分清楚你是月薪制還是時薪制，以及那一天到底是不是國定假日或休假日。',
    to: '/overtime-guide',
    page: '加班費怎麼算懶人包',
  },
  {
    keyword: '公司可以臨時改班嗎',
    desc: '先保留原始班表、臨時通知、打卡與訊息，不要等到薪水出來才回頭補證據。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '輪班制國定假日怎麼算',
    desc: '輪班制最常卡在工作日認定和原始班表，不能直接套一般上班族的直覺。',
    to: '/scenarios',
    page: '熱門情境比較',
  },
  {
    keyword: '變形工時是什麼',
    desc: '先分清楚公司說的是哪一種變形工時制度，再回頭核對班表、工時總量與排班方式。',
    to: '/flexible-schedule-guide',
    page: '變形工時、責任制與輪班津貼懶人包',
  },
  {
    keyword: '責任制沒有加班費嗎',
    desc: '不要只看公司怎麼稱呼，還要一起看職務、工時紀錄、約定內容與是否真的落在例外範圍。',
    to: '/flexible-schedule-guide',
    page: '變形工時、責任制與輪班津貼懶人包',
  },
  {
    keyword: '補休沒休完怎麼辦',
    desc: '先分清楚補休來源、約定方式、到期處理與是否又和特休混在一起。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '連假被排班怎麼看',
    desc: '關鍵不是連假這兩個字，而是那天原本是工作日、休息日、國定假日還是例假日。',
    to: '/overtime',
    page: '加班費計算機',
  },
  {
    keyword: '颱風天出勤能不能扣薪',
    desc: '先看有沒有出勤、原本排的是哪種班，颱風天口徑和國定假日不是同一套。',
    to: '/typhoon-workday-guide',
    page: '颱風假與天災出勤懶人包',
  },
]

const attendanceMistakes = [
  '把平日延長工時、休息日、國定假日與例假日混成同一種加班。',
  '只有口頭記得公司改班，沒有保留原始班表、群組訊息、打卡紀錄與臨時通知。',
  '以為所有假日出勤都一定是雙倍薪，忽略月薪制、時薪制與不同假別的差異。',
  '把補休、特休、請假與輪班制度混在一起，導致班表和薪資全部對不起來。',
]

export default function AttendanceDisputeGuide() {
  usePageMeta(
    '排班與出勤爭議懶人包｜調班、輪班、國定假日與補休一次看',
    '整理調班、排班、輪班、國定假日出勤、補休與颱風天出勤常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">排班與出勤</p>
        <h1 className="page-title">調班、輪班與國定假日出勤最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋調班、輪班、國定假日或補休，其實最常錯的不是倍率，而是前面就把當天性質判錯。
          這頁先把最常見的排班與出勤爭議拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種出勤爭議，都在查同一件事</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {attendanceScenarios.map(({ title, desc, to, cta }) => (
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
            排班爭議的關鍵通常不是只算幾倍，而是先把班表、假別和出勤日性質分清楚。先把問句分流，才能抓到正確入口。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {attendanceSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">排班前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談出勤爭議</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>當天原本到底是工作日、休息日、國定假日還是例假日。</li>
            <li>公司有沒有先公告原始班表，後來又怎麼改班、改休或要求補班。</li>
            <li>你查的是加班費、補休、排班合法性，還是輪班制度本身的適用問題。</li>
            <li>有沒有先保留班表截圖、出勤紀錄、主管通知與薪資單對照資料。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把出勤爭議看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {attendanceMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}