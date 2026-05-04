import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const reportingScenarios = [
  {
    title: '先比對投保薪資和實際月薪',
    desc: '很多人發現保費怪怪的，真正要先核對的是投保薪資、勞退提繳級距和薪資單上的固定工資是不是一致。',
    to: '/insurance-brackets',
    cta: '先查投保級距',
  },
  {
    title: '兼職、多份工作或雙重投保',
    desc: '如果你同時有正職、兼職或兩份工作，先分清楚哪些保險誰要保、哪一份工作影響投保與給付。',
    to: '/part-time-rights-guide',
    cta: '先看打工兼職權益懶人包',
  },
  {
    title: '懷疑公司高薪低報或少保',
    desc: '這通常不是只差幾百元保費，而是會一路影響勞保、職災、失業給付與未來勞退提繳。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
]

const reportingSearchCards = [
  {
    keyword: '勞健保高薪低報怎麼辦',
    desc: '先不要只比每月少扣多少，應先回頭對照固定工資、投保薪資、薪資單與公司申報口徑。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '多份工作勞保怎麼保',
    desc: '有正職又兼職時，常見誤區不是沒有保，而是搞不清楚哪一份工作該投保、給付會受什麼影響。',
    to: '/part-time-rights-guide',
    page: '打工兼職權益懶人包',
  },
  {
    keyword: '兼職要保勞健保嗎',
    desc: '不要只看工時高低，還要一起看雇主身分、投保條件、月薪結構與你是否已有其他工作投保。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '投保薪資跟月薪不一樣怎麼看',
    desc: '先把底薪、固定津貼、變動獎金與非經常性給付拆開，再回頭對照投保與提繳級距。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '低報薪資會影響失業給付嗎',
    desc: '會影響的不只眼前保費，還可能牽動就保、職災與後續給付基礎，應先把申報差異整理清楚。',
    to: '/insurance-benefits-guide',
    page: '勞保、職災與失業給付懶人包',
  },
  {
    keyword: '公司少保或沒保可以申訴嗎',
    desc: '先保留薪資單、勞保投保紀錄、對話紀錄與工作證據，再決定要不要走申訴、調解或檢舉。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const reportingMistakes = [
  '只看每月保費差額，沒有先比對底薪、固定津貼、投保薪資與勞退提繳級距。',
  '把兼職、多份工作、正職投保與眷屬健保混成一件事，結果每一條規則都看錯。',
  '發現低報後沒有先留薪資單、投保紀錄、匯款紀錄與工作證據，後面很難還原。',
  '以為低報只影響當月扣款，忽略職災、失業給付與退休提繳基礎也會被拉低。',
]

export default function InsuranceReportingGuide() {
  usePageMeta(
    '勞健保高薪低報與兼職投保懶人包｜低報、多份工作與級距一次看',
    '整理勞健保高薪低報怎麼看、多份工作與兼職投保規則、投保薪資級距差異與申訴方向，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">投保申報</p>
        <h1 className="page-title">勞健保高薪低報、兼職投保與多份工作最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋勞健保高薪低報或兼職要不要投保，實際上前一步常卡在投保薪資、月薪結構、
          多份工作與給付基礎到底怎麼互相影響。這頁先把最常見的投保申報問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種投保問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reportingScenarios.map(({ title, desc, to, cta }) => (
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
            投保爭議最常出錯的不是公式，而是前面把固定工資、級距、多份工作與給付來源混在一起。先分流，再看數字才不會失真。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportingSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談低報與投保</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在遇到的是高薪低報、兼職投保、多份工作，還是看不懂投保薪資和薪資單差在哪。</li>
            <li>有沒有先把底薪、固定津貼、變動獎金、投保薪資、勞退提繳級距與保費紀錄放在一起。</li>
            <li>你要處理的是每月保費、給付基礎、雇主申報責任，還是後續申訴與補繳問題。</li>
            <li>是否把勞保、健保、勞退、兼職規則與失業給付影響全部混成同一件事。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把投保問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {reportingMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}