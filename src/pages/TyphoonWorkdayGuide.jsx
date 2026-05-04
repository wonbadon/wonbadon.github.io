import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const typhoonScenarios = [
  {
    title: '颱風天有出勤，想先看最低給付',
    desc: '先分清楚自己是原排班工作日、休息日，還是國定假日出勤，再看法定最低給付與公司額外加碼。',
    to: '/typhoon-workday',
    cta: '先看颱風假薪資試算',
  },
  {
    title: '公司說停班停課就算自己請假',
    desc: '這時重點不是直接套雙倍薪，而是先分清楚公司能不能扣薪、怎麼記出勤，以及是否有不利處分。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
  {
    title: '颱風天被臨時叫來上班或改班',
    desc: '如果同時牽涉改班、補休、休息日或國定假日，應先把班表與假別拆開，不要只盯著颱風天三個字。',
    to: '/attendance-dispute-guide',
    cta: '先看排班與出勤爭議懶人包',
  },
]

const typhoonSearchCards = [
  {
    keyword: '颱風假有薪嗎',
    desc: '先分清楚你是有出勤還是未出勤，再看公司能不能扣薪，以及那天原本是不是工作日。',
    to: '/typhoon-workday',
    page: '颱風假薪資計算機',
  },
  {
    keyword: '颱風天上班有加班費嗎',
    desc: '颱風天本身不是自動雙倍薪，關鍵在於那天原本的工作日性質與你是否實際出勤。',
    to: '/typhoon-workday',
    page: '颱風假薪資計算機',
  },
  {
    keyword: '停班停課可以扣薪嗎',
    desc: '重點通常不是一句能不能，而是公司如何記錄出勤、是否不利處分，以及你有沒有被要求改請其他假別。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '颱風天算休息日還是工作日',
    desc: '不能只看天氣，要先回到原本班表與當天性質，颱風停班停課不會自動改變法定日別。',
    to: '/attendance-dispute-guide',
    page: '排班與出勤爭議懶人包',
  },
  {
    keyword: '颱風天被叫上班怎麼算',
    desc: '先整理班表、通知訊息、實際出勤時數與給薪紀錄，再分清楚是排班爭議還是薪資爭議。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '天災出勤補休怎麼算',
    desc: '補休不是只看公司口頭說法，還要先分清楚當天原本的日別與後續補休安排。',
    to: '/attendance-dispute-guide',
    page: '排班與出勤爭議懶人包',
  },
]

const typhoonMistakes = [
  '把颱風假直接當成一定雙倍薪，沒有先看自己那天原本是工作日、休息日還是國定假日。',
  '以為停班停課就當然可以扣薪，沒有先確認公司是不是改用其他方式記假或做不利處分。',
  '只問颱風天三個字，卻沒有整理班表、出勤通知、打卡紀錄與實際入帳金額。',
  '把天災出勤、改班、補休與休息日倍率混成同一題，後面越算越亂。',
]

export default function TyphoonWorkdayGuide() {
  usePageMeta(
    '颱風假與天災出勤懶人包｜停班停課、扣薪、出勤與加班怎麼看',
    '整理颱風假有薪嗎、停班停課可以扣薪嗎、颱風天上班怎麼算與天災出勤補休常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">天災出勤</p>
        <h1 className="page-title">颱風假、停班停課與天災出勤最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋颱風假有薪嗎、颱風天上班算不算加班，真正會卡住的通常不是公式，而是前面就把停班停課、原本日別、實際出勤和扣薪問題混在一起。
          這頁先把最常見的颱風天問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種颱風天問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {typhoonScenarios.map(({ title, desc, to, cta }) => (
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
            颱風天最常見的錯，不是算錯倍率，而是前面就把有沒有出勤、原本日別和公司處理方式混成一題。先把搜尋問句分流，方向才不會歪掉。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {typhoonSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談颱風天出勤</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你是有出勤、未出勤，還是被要求改班或補休。</li>
            <li>那一天原本是工作日、休息日，還是國定假日，不要只看停班停課通知。</li>
            <li>有沒有保留班表、主管通知、打卡紀錄與實際給薪資料。</li>
            <li>你在意的是加班費、扣薪合法性，還是公司有沒有做不利處分。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把颱風天問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {typhoonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}