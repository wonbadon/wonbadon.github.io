import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const leaveScenarios = [
  {
    title: '一般病假、事假與生理假',
    desc: '先分清楚你請的是哪一種假別，再看會不會扣薪、能不能扣全勤，以及公司有沒有混用規則。',
    to: '/rights-check',
    cta: '先做權益健檢',
  },
  {
    title: '特休、未休折發與遞延',
    desc: '這不是一般請假制度，而是法定特休與公司制度換算問題，應另開來看。',
    to: '/annual-leave-guide',
    cta: '先看特休攻略',
  },
  {
    title: '產假、陪產假與育嬰留停',
    desc: '親職相關假別的天數、給薪與津貼口徑不一樣，應跟一般病事假分開處理。',
    to: '/parental-leave',
    cta: '先看產假育嬰假',
  },
]

const leaveSearchCards = [
  {
    keyword: '病假薪水怎麼算',
    desc: '先分清楚是普通傷病假、特休還是職災休養，不同假別不能混用。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '事假會扣薪嗎',
    desc: '先確認假別本身、公司制度和薪資項目，不要只看當月實領差額。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '生理假會扣全勤嗎',
    desc: '重點通常不只是天數，而是公司怎麼記假、怎麼計薪、怎麼處理獎金與全勤。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '婚假喪假有薪嗎',
    desc: '先分清楚假別、天數和公司制度，不要把每一種請假都當成同一口徑。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '家庭照顧假怎麼請',
    desc: '先看你要請的是家庭照顧假、生理假還是其他法定假別，因為用途和限制不一樣。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '產假育嬰假怎麼算',
    desc: '親職相關假別涉及天數、雇主給薪、勞保生育給付與育嬰津貼，應獨立計算。',
    to: '/parental-leave',
    page: '產假育嬰假計算',
  },
]

const leaveMistakes = [
  '把病假、事假、特休與家庭照顧假混成同一種請假，不先分清楚假別。',
  '只看公司內規，沒有先確認法定假別本身的最低保護與適用條件。',
  '以為全勤獎金、績效或津貼一定可以跟著任何請假一起直接扣掉。',
  '沒有保留請假申請紀錄、對話截圖與核准方式，事後只剩口頭說法。',
]

export default function LeaveGuide() {
  usePageMeta(
    '請假權益懶人包｜病假、事假、婚假、喪假、生理假與家庭照顧假',
    '整理病假、事假、婚假、喪假、生理假、家庭照顧假與親職假常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">請假權益</p>
        <h1 className="page-title">病假、事假與各類請假最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋病假、事假、婚假、喪假或家庭照顧假，其實最常卡住的不是天數，而是前面就把不同假別混成同一套規則。
          這頁先把最常見的請假問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種請假，都在查同一件事</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {leaveScenarios.map(({ title, desc, to, cta }) => (
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
            請假不是一個單一主題，而是一整串假別規則。先把常見搜尋問句分開對到入口，才不會把特休、病假和親職假混在一起。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leaveSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">請假前先看</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談假別權益</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你查的是病假、事假、特休、家庭照顧假，還是親職相關假別。</li>
            <li>你在意的是天數、給薪、全勤獎金，還是公司有沒有用錯假別口徑。</li>
            <li>有沒有先留下請假申請紀錄、主管回覆與公司制度說明。</li>
            <li>是否把特休遞延、未休折發與一般法定請假規則混在一起。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把請假權益看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {leaveMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}