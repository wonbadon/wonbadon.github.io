import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const handoverScenarios = [
  {
    title: '先算預告期與最後工作日',
    desc: '很多交接爭議其實前面就把通知日、預告期與最後工作日抓錯，後面整個時程都會歪掉。',
    to: '/notice-period',
    cta: '先看離職預告期計算',
  },
  {
    title: '核對交接、薪資結清與特休',
    desc: '如果你卡在離職前要不要先休特休、最後一次薪資怎麼結、哪些文件要拿，應先把離職流程拆開看。',
    to: '/leaving-job',
    cta: '先看離職權益懶人包',
  },
  {
    title: '公司不給文件或要求立刻走人',
    desc: '這通常不是單純交接問題，而是要先分清楚是否涉及解僱、逼離職或後續申訴與蒐證。',
    to: '/dismissal-guide',
    cta: '先看被開除怎麼辦懶人包',
  },
]

const handoverSearchCards = [
  {
    keyword: '離職交接清單怎麼做',
    desc: '先把工作項目、帳號權限、檔案位置、未結事項與交接對象列清楚，再來談最後工作日安排。',
    to: '/leaving-job',
    page: '離職權益懶人包',
  },
  {
    keyword: '最後工作日怎麼算',
    desc: '先看年資、通知日與預告期，再安排交接與特休，不能只用口頭說哪天走。',
    to: '/notice-period',
    page: '離職預告期計算',
  },
  {
    keyword: '離職證明多久要給',
    desc: '你要先分清楚需要的是離職證明、非自願離職文件，還是交接完成後的其他行政文件。',
    to: '/leaving-job',
    page: '離職權益懶人包',
  },
  {
    keyword: '離職後薪資何時結清',
    desc: '最後一次薪資、未休特休折發、獎金與其他扣款不能混成一筆，應先逐項對。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '特休要先休完還是折發',
    desc: '這題通常會跟最後工作日、交接期與公司安排一起卡住，先把法定特休與未休日數拆開。',
    to: '/annual-leave-guide',
    page: '特休怎麼算懶人包',
  },
  {
    keyword: '不交接可以扣薪嗎',
    desc: '很多公司會把交接和扣薪綁在一起說，但是否能扣、扣哪一筆，還是要回到工資與證據。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
]

const handoverMistakes = [
  '只用口頭說哪天離職，沒有先用通知日、預告期與最後工作日把時程寫清楚。',
  '把交接、薪資結清、特休折發與離職文件全部混成同一件事，一次談不清楚。',
  '沒有先整理工作清單、帳號權限、檔案位置與未結事項，就直接說已交接完成。',
  '公司說不交接就扣薪時，沒有先留下訊息、文件與薪資依據。',
]

export default function ExitHandoverGuide() {
  usePageMeta(
    '離職交接與最後工作日懶人包｜交接清單、離職文件與結清一次看',
    '整理離職交接清單、最後工作日怎麼算、離職文件、薪資結清與特休折發常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">離職交接</p>
        <h1 className="page-title">交接、最後工作日與離職文件最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋離職交接，實際上卡住的可能是最後工作日怎麼算、特休要不要先休、離職證明什麼時候拿，
          或公司拿交接當理由說要扣薪。這頁先把最常見的離職交接問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種交接問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {handoverScenarios.map(({ title, desc, to, cta }) => (
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
            離職交接最常把日期、文件、薪資與特休混在一起。先把搜尋問句分流，才不會交接談到最後變成每件事都卡住。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {handoverSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談交接與離職文件</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在卡的是預告期與最後工作日，還是交接清單、薪資結清與離職文件。</li>
            <li>有沒有先把通知日、最後工作日、特休日數、工作清單與帳號權限整理出來。</li>
            <li>你在意的是離職流程安排，還是公司是否拿交接當理由延後給文件或扣薪。</li>
            <li>是否把交接完成、工作成果移交、薪資結清與非自願離職文件混成同一件事。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把交接問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {handoverMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}