import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const bonusScenarios = [
  {
    title: '先估固定月數與未滿一年比例',
    desc: '如果你卡在未滿一年年終怎麼算、在職幾個月大概有多少，應先把月薪、常見月數與在職比例拆開估。',
    to: '/year-end-bonus',
    cta: '先看年終獎金計算',
  },
  {
    title: '想知道年終算不算工資或少發怎麼辦',
    desc: '很多爭議不是公式問題，而是公司制度、發放條件、工資性質與證據怎麼整理。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
  {
    title: '想比較保證年薪、年終與 offer 結構',
    desc: '如果你同時在看保證年薪、年終月數、津貼與通勤成本，應把整體薪酬包一起攤開比較。',
    to: '/offer-negotiation-guide',
    cta: '先看 Offer 比較與薪資談判懶人包',
  },
]

const bonusSearchCards = [
  {
    keyword: '年終獎金一定要發嗎',
    desc: '重點通常不是只問有沒有，而是先看勞動契約、工作規則、歷年慣例與公司公告的發放條件。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '未滿一年年終怎麼算',
    desc: '最常見是固定月數按在職比例折算，但不同公司也可能綁績效、到職日或發放日資格。',
    to: '/year-end-bonus',
    page: '年終獎金計算',
  },
  {
    keyword: '提離職還拿得到年終嗎',
    desc: '先把最後工作日、發放日、交接狀態與公司制度拆開，不要只看自己是不是已經提離職。',
    to: '/exit-handover-guide',
    page: '離職交接與最後工作日懶人包',
  },
  {
    keyword: '保證年薪跟年終差在哪',
    desc: '有些 offer 寫保證年薪，但實際上會拆成固定月薪、年終、津貼與條件獎金，不能混成同一筆。',
    to: '/offer-negotiation-guide',
    page: 'Offer 比較與薪資談判懶人包',
  },
  {
    keyword: '年終算平均工資嗎',
    desc: '很多人把年終直接塞進平均工資，但實際上還要回頭看權益類型、工資性質與計算口徑。',
    to: '/severance-guide',
    page: '資遣費怎麼算懶人包',
  },
  {
    keyword: '年終少發怎麼申訴',
    desc: '如果你懷疑制度說法前後不一、少發或根本沒發，先把歷年公告、薪資單、訊息與契約整理起來。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
]

const bonusMistakes = [
  '把保證年薪、固定月薪、年終、績效獎金與分紅全部當成同一筆年終。',
  '只記得公司口頭說法，沒有先保留聘書、工作規則、公告與歷年發放紀錄。',
  '以為未滿一年一定是按比例折算，沒有先看公司制度與發放資格條件。',
  '離職前只看有沒有提出辭呈，沒有同時核對發放日、最後工作日與交接狀態。',
]

export default function YearEndBonusGuide() {
  usePageMeta(
    '年終獎金懶人包｜未滿一年比例、離職前後與年終發放一次看',
    '整理年終獎金一定要發嗎、未滿一年怎麼算、提離職還拿得到嗎與保證年薪差異，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">年終獎金</p>
        <h1 className="page-title">年終、未滿一年比例與離職前後最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋年終獎金，其實背後不一定是同一件事。有些人在查未滿一年怎麼折算，有些人在查提離職後還拿不拿得到，
          也有人其實是在比保證年薪與 offer 結構。這頁先把最常見的年終問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種年終問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {bonusScenarios.map(({ title, desc, to, cta }) => (
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
            年終最常把發放條件、在職比例、工資性質與離職時點混在一起。先把搜尋問句分流，才不會一開始就走錯方向。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bonusSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談年終獎金</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你遇到的是固定月數折算、制度發放爭議，還是在比較保證年薪與實際薪酬結構。</li>
            <li>有沒有先保留聘書、工作規則、歷年公告、薪資單與主管訊息。</li>
            <li>你在意的是在職比例、發放資格、工資性質，還是離職後還拿不拿得到。</li>
            <li>是否把年終、績效獎金、津貼、分紅與保證年薪全部混成同一筆。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把年終問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {bonusMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}