import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const parentalScenarios = [
  {
    title: '懷孕與生產前先看產假',
    desc: '先分清楚你要查的是產假天數、給薪、生育給付，還是安胎期間的其他假別。',
    to: '/parental-leave',
    cta: '先看產假育嬰假試算',
  },
  {
    title: '另一半要請陪產檢或陪產假',
    desc: '陪產檢與陪產假不是一般事假，也不是和產假同一套規則，應分開確認天數與給薪。',
    to: '/parental-leave',
    cta: '先看親職假別入口',
  },
  {
    title: '準備申請育嬰留停與津貼',
    desc: '先把留停資格、就保條件、申請期間與育嬰津貼拆開看，不要只問能不能領。',
    to: '/parental-leave',
    cta: '先看育嬰留停試算',
  },
]

const parentalSearchCards = [
  {
    keyword: '產假幾天有薪嗎',
    desc: '先分清楚你要問的是法定天數、雇主給薪，還是勞保生育給付，不同來源不能混成一筆。',
    to: '/parental-leave',
    page: '產假育嬰假計算',
  },
  {
    keyword: '陪產假幾天',
    desc: '要先確認你請的是陪產檢及陪產假，而不是一般事假，並分清楚可以怎麼安排。',
    to: '/parental-leave',
    page: '產假育嬰假計算',
  },
  {
    keyword: '育嬰留停津貼怎麼領',
    desc: '先分清楚留停資格、就保身分、申請時間與文件，不是只要有小孩就一定可以領。',
    to: '/parental-leave',
    page: '產假育嬰假計算',
  },
  {
    keyword: '生育給付多少',
    desc: '生育給付和產假給薪不是同一筆錢，先分清楚是保險給付還是雇主在產假期間的給薪義務。',
    to: '/parental-leave',
    page: '產假育嬰假計算',
  },
  {
    keyword: '安胎假算病假嗎',
    desc: '重點不是只看名字，而是要先分清楚安胎期間實際適用的假別與診斷證明。',
    to: '/leave-guide',
    page: '請假權益懶人包',
  },
  {
    keyword: '公司不給請育嬰留停怎麼辦',
    desc: '如果卡在程序、文件或雇主回應，通常要先把申請紀錄與對話證據整理好。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const parentalMistakes = [
  '把產假、安胎假、普通病假、陪產假與育嬰留停當成同一套假別在看。',
  '以為產假有薪、生育給付與育嬰津貼都是同一個來源，只差金額不同。',
  '沒有先確認就保身分、年資與申請期間，就直接問育嬰留停津貼能不能領。',
  '沒有保留診斷證明、請假申請、雇主回覆與留停文件，後面卡住時只剩口頭說法。',
]

export default function ParentalLeaveGuide() {
  usePageMeta(
    '產假與育嬰留停懶人包｜產假、陪產檢、生育給付與育嬰津貼一次看',
    '整理產假幾天、陪產檢及陪產假、生育給付、安胎假與育嬰留停津貼常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">親職權益</p>
        <h1 className="page-title">產假、陪產檢與育嬰留停最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋產假、陪產假或育嬰留停，其實最常卡住的不是天數本身，而是前面就把不同假別、給薪來源與保險津貼混在一起。
          這頁先把親職相關問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種親職問題，都在查同一件事</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {parentalScenarios.map(({ title, desc, to, cta }) => (
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
            親職假別同時牽涉假別規則、雇主給薪與保險津貼。先把搜尋問句分流，才不會把產假、生育給付和育嬰津貼混成一題。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {parentalSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談產假與育嬰留停</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你查的是產假、陪產檢及陪產假、安胎期間假別，還是育嬰留停與津貼。</li>
            <li>你在意的是法定天數、雇主給薪、保險給付，還是雇主是否配合申請。</li>
            <li>有沒有先留下診斷證明、出生證明、請假申請與公司回覆紀錄。</li>
            <li>是否把一般請假制度和親職相關假別規則混在一起。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把親職權益看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {parentalMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}