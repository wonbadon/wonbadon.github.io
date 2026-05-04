import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const leavingScenarios = [
  {
    title: '自請離職',
    desc: '先看預告期、最後工作日、薪資結清與特休結清，不要一開始就套資遣費。',
    to: '/notice-period',
    cta: '先確認離職預告期',
  },
  {
    title: '非自願離職 / 資遣',
    desc: '先拆清楚新制與舊制年資，再看資遣費、預告工資與非自願離職相關文件。',
    to: '/severance',
    cta: '先看資遣費怎麼算',
  },
  {
    title: '被逼離職或扣薪爭議',
    desc: '先把你遇到的情況轉成爭議類型、相關法條與證據清單，再決定下一步。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
]

const leavingChecklist = [
  {
    keyword: '離職要提前幾天說',
    desc: '先看預告期間、通知日與最後工作日，避免日期抓錯。',
    to: '/notice-period',
    page: '離職預告期計算',
  },
  {
    keyword: '離職交接清單怎麼做',
    desc: '先把最後工作日、交接項目、帳號權限、文件與薪資結清拆開，不要全部壓在同一個截止日。',
    to: '/exit-handover-guide',
    page: '離職交接與最後工作日懶人包',
  },
  {
    keyword: '被資遣可以拿多少',
    desc: '先分新制與舊制年資，再估合理資遣費區間。',
    to: '/severance',
    page: '資遣費計算機',
  },
  {
    keyword: '離職後特休沒休完怎麼算',
    desc: '先看目前法定特休資格，再回頭確認未休天數該如何折算。',
    to: '/annual-leave',
    page: '特休天數計算',
  },
  {
    keyword: '公司扣薪或不給該給的錢怎麼辦',
    desc: '先整理爭議類型、薪資項目與可留存證據。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '提離職還拿得到年終嗎',
    desc: '不要只看自己有沒有做到年底，還要一起看發放日、最後工作日、交接狀態與公司制度。',
    to: '/year-end-bonus-guide',
    page: '年終獎金懶人包',
  },
  {
    keyword: '試用期離職要預告嗎',
    desc: '不要只看是不是還在試用期，還是要先回到實際年資、通知方式與離職原因。',
    to: '/probation-rights-guide',
    page: '試用期權益懶人包',
  },
]

const leavingMistakes = [
  '把自請離職和非自願離職混成同一套結果，容易錯看成一定有資遣費。',
  '只記大概月份，沒有先核對通知日、最後工作日與到職日，整個預告期就會偏掉。',
  '把最近一個月薪資直接當平均工資，忽略資遣費與工資計算的不同口徑。',
  '沒有先把特休、薪資、獎金、扣薪與文件整理清楚，就直接跟公司談。',
]

export default function LeavingJob() {
  usePageMeta(
    '離職權益懶人包｜離職預告期、資遣費、特休結清與非自願離職怎麼看',
    '整理離職預告期、資遣費、特休結清、非自願離職與勞資爭議的常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">離職權益</p>
        <h1 className="page-title">離職前後最常查的問題，先在這裡分流</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋離職，其實要找的不是同一件事。有些人在查離職預告期，有些人在查資遣費，有些人在查特休結清或被逼離職。
          這頁先把最常見的離職權益問題拆開，讓你直接進到最相關的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種離職，都該看同一頁</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {leavingScenarios.map(({ title, desc, to, cta }) => (
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
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你查的那句話，通常對應哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            離職這個詞太大，Google 也很難只靠一頁判斷你真正要的是什麼。先把常見搜尋問句對到正確頁面，相關性會高很多。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {leavingChecklist.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">離職前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先把這四件事分清楚，再談權益</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你是自請離職，還是公司主動終止勞動契約。</li>
            <li>你的重點是預告期、資遣費、特休結清，還是薪資爭議。</li>
            <li>平均工資、月薪、獎金與津貼是不是被混成同一個數字。</li>
            <li>通知日、最後工作日、到職日與未休特休日數有沒有先核對。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把離職結果看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {leavingMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}