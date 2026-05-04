import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const salaryScenarios = [
  {
    title: '先看薪資單扣項',
    desc: '先把底薪、加班費、勞保、健保、勞退自提與其他項目拆開，避免只看實領差額就判斷公司有沒有少給。',
    to: '/salary-slip',
    cta: '先看薪資明細試算',
  },
  {
    title: '先估每月勞健保負擔',
    desc: '如果你在意的是調薪後每月會多扣多少，應先看保費與級距，而不是只對著薪資單猜。',
    to: '/insurance-premium',
    cta: '先看勞健保保費試算',
  },
  {
    title: '懷疑公司低報投保',
    desc: '這通常不是單純看扣款高低，而是要先對照實際薪資、投保薪資與勞退提繳級距。',
    to: '/insurance-brackets',
    cta: '先查投保級距',
  },
]

const salarySearchCards = [
  {
    keyword: '薪資單怎麼看',
    desc: '先拆清楚本薪、加班費、勞保、健保、勞退自提與其他扣款，不要把所有差額都算成公司少給。',
    to: '/salary-slip',
    page: '薪資明細計算機',
  },
  {
    keyword: '勞健保一個月扣多少',
    desc: '重點通常不是只問扣多少，而是先看月薪落在哪個級距、眷屬有沒有影響，以及勞退有沒有自提。',
    to: '/insurance-premium',
    page: '勞健保保費計算',
  },
  {
    keyword: '實領薪資怎麼算',
    desc: '要先把保費、自提、加班費與其他津貼拆開，不然名目薪資和實領薪資會一直混在一起。',
    to: '/salary-slip',
    page: '薪資明細計算機',
  },
  {
    keyword: '勞退自提會扣多少',
    desc: '勞退自提是你自己選擇另外提繳的比例，不是雇主 6% 那一筆。兩者不能混成同一個扣項。',
    to: '/labor-pension-guide',
    page: '勞退怎麼算懶人包',
  },
  {
    keyword: '投保級距怎麼查',
    desc: '先用月薪對照勞保、健保與勞退級距，再回頭看公司申報是不是明顯偏低。',
    to: '/insurance-brackets',
    page: '投保級距查詢',
  },
  {
    keyword: 'offer 怎麼比才準',
    desc: '如果你同時在比月薪、年終、津貼與試用期條件，應先把固定收入和時間成本攤成同一個口徑。',
    to: '/offer-negotiation-guide',
    page: 'Offer 比較與薪資談判懶人包',
  },
  {
    keyword: '公司保低了怎麼看',
    desc: '先整理薪資單、匯款紀錄、勞保投保資料與勞退提繳紀錄，再判斷是低報還是單純級距理解錯誤。',
    to: '/insurance-reporting-guide',
    page: '勞健保高薪低報與兼職投保懶人包',
  },
  {
    keyword: '輪班津貼算不算薪水',
    desc: '如果你同時在看排班、夜班津貼與平均工資，先把制度名稱、工時紀錄和津貼項目拆開。',
    to: '/flexible-schedule-guide',
    page: '變形工時、責任制與輪班津貼懶人包',
  },
]

const salaryMistakes = [
  '把雇主負擔的勞保、健保或勞退提撥，也一起算進自己每月應被扣的項目。',
  '只看實領差額，沒有逐項核對本薪、加班費、獎金、保費、自提與其他扣款依據。',
  '把勞退自提和雇主提撥 6% 混在一起，以為兩者都會直接從自己的薪資扣掉。',
  '沒有先對照投保級距與實際薪資，就直接認定公司一定低報或少保。',
]

export default function SalarySlipGuide() {
  usePageMeta(
    '薪資單與勞健保懶人包｜實領薪資、勞健保扣項與投保級距一次看',
    '整理薪資單怎麼看、實領薪資怎麼算、勞健保扣項、勞退自提與投保級距常見問題，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">薪資明細</p>
        <h1 className="page-title">薪資單、勞健保與實領薪資最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋薪資單、實領薪資或勞健保扣款，其實背後不一定是同一件事。有時候只是看不懂扣項，
          有時候是在懷疑投保低報，有時候則是把勞退自提和雇主提撥混在一起。這頁先把常見問句拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種薪資問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {salaryScenarios.map(({ title, desc, to, cta }) => (
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
            薪資與保費問題最常卡在前面就把不同扣項混成一筆錢。先把搜尋問句分流，使用者與搜尋引擎都更容易找到對的入口。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {salarySearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談薪資與保費</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你要查的是薪資單扣項、保費負擔、投保低報，還是勞退自提差異。</li>
            <li>有沒有先把薪資單、匯款紀錄、投保資料與勞退提繳資訊放在一起對照。</li>
            <li>你在意的是實領薪資變少，還是公司申報級距和實際薪資不一致。</li>
            <li>有沒有先分清楚哪些是你自己負擔，哪些是雇主另外負擔。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把薪資單看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {salaryMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}