import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const flexibleScenarios = [
  {
    title: '先分清楚是不是變形工時',
    desc: '很多排班問題表面上像加班，但前面真正要先釐清的是公司排的是不是合法變形工時與班表口徑。',
    to: '/attendance-dispute-guide',
    cta: '先看排班與出勤爭議懶人包',
  },
  {
    title: '責任制、加班費與工時上限',
    desc: '公司說責任制不代表一切工時規則都消失，還是要回到工時紀錄、約定內容與是否適用例外。',
    to: '/overtime-guide',
    cta: '先看加班費怎麼算懶人包',
  },
  {
    title: '輪班津貼、夜班津貼與薪資拆法',
    desc: '如果你卡在輪班津貼算不算工資、夜班津貼要不要列入平均工資，通常要先把薪資項目拆開。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
]

const flexibleSearchCards = [
  {
    keyword: '變形工時是什麼',
    desc: '先分清楚兩週、四週或八週變形工時，以及公司現在拿來排班的到底是不是同一套制度。',
    to: '/attendance-dispute-guide',
    page: '排班與出勤爭議懶人包',
  },
  {
    keyword: '責任制沒有加班費嗎',
    desc: '不要只看公司怎麼叫，還要一起看職務類型、工時紀錄、約定內容與是否真的屬於例外。',
    to: '/overtime-guide',
    page: '加班費怎麼算懶人包',
  },
  {
    keyword: '輪班津貼算不算工資',
    desc: '很多爭議卡在津貼到底是固定工資還是條件式給付，這會影響平均工資、加班費與離職結算。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '排班制國定假日怎麼算',
    desc: '排班制不是就沒有國定假日爭議，還是要先回到班表、出勤與補休口徑。',
    to: '/attendance-dispute-guide',
    page: '排班與出勤爭議懶人包',
  },
  {
    keyword: '做二休二加班怎麼看',
    desc: '班表看起來固定，不代表工時就一定合法，先把出勤紀錄、工時總量與加班切開核對。',
    to: '/overtime',
    page: '加班費計算機',
  },
  {
    keyword: '公司排班違法可以申訴嗎',
    desc: '先留班表、打卡紀錄、訊息與薪資單，再判斷要走申訴、調解還是先整理爭議類型。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const flexibleMistakes = [
  '只聽公司說是責任制或變形工時，就直接把加班費、工時上限與休假規則全部放掉。',
  '沒有先留班表、打卡紀錄、訊息與薪資單，後面根本無法核對工時和津貼。',
  '把輪班津貼、夜班津貼、全勤獎金與固定工資混在一起看，導致平均工資與加班費基礎看錯。',
  '排班制遇到國定假日或補休時，只看公司慣例，沒有回到制度與出勤事實。',
]

export default function FlexibleScheduleGuide() {
  usePageMeta(
    '變形工時、責任制與輪班津貼懶人包｜排班、工時與加班一次看',
    '整理變形工時怎麼看、責任制有沒有加班費、輪班津貼算不算工資與排班申訴方向，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工時制度</p>
        <h1 className="page-title">變形工時、責任制與輪班津貼最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋變形工時、責任制或輪班津貼，實際上前一步常卡在公司用的是哪套工時制度、
          津貼是不是工資，以及排班和加班到底該分開還是一起看。這頁先把最常見的工時制度問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種排班與工時問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {flexibleScenarios.map(({ title, desc, to, cta }) => (
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
            工時制度問題最常出錯的不是名詞，而是排班、工時、津貼與加班被混成一團。先把搜尋問句分流，才看得清楚自己在爭哪一塊。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {flexibleSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">核對前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談工時制度</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在卡的是變形工時、責任制、輪班津貼，還是排班制下的國定假日與加班計算。</li>
            <li>有沒有先把班表、打卡紀錄、工時總量、津貼項目與薪資單放在一起看。</li>
            <li>你要處理的是工時是否合法、加班費怎麼算，還是津貼到底算不算工資。</li>
            <li>是否把制度名稱、公司慣例、薪資項目與實際出勤事實混成同一件事。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把工時問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {flexibleMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}