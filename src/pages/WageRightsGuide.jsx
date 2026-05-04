import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const wageScenarios = [
  {
    title: '先看薪資單扣項',
    desc: '先把勞保、健保、勞退自提與實領月薪拆開，避免只看入帳數字就判斷公司有沒有少給。',
    to: '/salary-slip-guide',
    cta: '先看薪資單與勞健保懶人包',
  },
  {
    title: '被欠薪或亂扣薪',
    desc: '先把應發工資、已發金額、扣款名目、出勤紀錄與公司說法整理清楚，再判斷是不是違法扣薪。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
  {
    title: '懷疑低報勞保勞退',
    desc: '先對照投保級距與提繳級距，再看公司申報基礎和你的實際薪資是不是落差過大。',
    to: '/insurance-brackets',
    cta: '先查投保級距',
  },
]

const wageSearchCards = [
  {
    keyword: '公司可以任意扣薪嗎',
    desc: '先分清楚是依法代扣、請假扣薪、損害賠償，還是單純以懲罰名義亂扣。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '欠薪怎麼辦',
    desc: '先整理應發薪資、實際入帳、薪資週期與證據，不要只留口頭說法。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '薪資單怎麼看',
    desc: '先拆清楚勞保、健保、勞退自提與各種扣項，不要把所有差額都算成公司少給。',
    to: '/salary-slip-guide',
    page: '薪資單與勞健保懶人包',
  },
  {
    keyword: '平均工資怎麼算',
    desc: '不要直接拿最近一個月薪水代入，資遣、職災與其他給付的口徑常常不同。',
    to: '/severance-guide',
    page: '資遣費攻略',
  },
  {
    keyword: '勞保低報怎麼看',
    desc: '先對照投保級距、薪資單與勞退提繳級距，再判斷公司是不是低報。',
    to: '/insurance-brackets',
    page: '投保級距查詢',
  },
  {
    keyword: '打工最低時薪多少',
    desc: '如果你同時在查兼職時薪、加班費、特休或刪班問題，應先把薪資型態和班表日別拆開看。',
    to: '/part-time-rights-guide',
    page: '打工兼職權益懶人包',
  },
]

const wageMistakes = [
  '把遲到、工作表現、損耗賠償或全勤獎金差額都當成公司當然可以直接扣薪。',
  '只看最後實領金額，沒有逐項核對勞保、健保、勞退自提與其他扣款依據。',
  '把最近一個月薪資直接當平均工資，忽略不同權益計算可能有不同口徑。',
  '沒有先留薪資單、打卡、匯款紀錄與對話截圖，就只用口頭反應。',
]

export default function WageRightsGuide() {
  usePageMeta(
    '工資與扣薪懶人包｜欠薪、扣薪、薪資單與平均工資一次看',
    '整理欠薪怎麼辦、公司可以怎麼扣薪、薪資單怎麼看與平均工資常見誤區，幫你先找到正確入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工資權益</p>
        <h1 className="page-title">工資、扣薪與薪資單最常查的問題，先在這裡分清楚</h1>
        <p className="page-subtitle max-w-3xl">
          很多人搜尋扣薪、欠薪或薪資單，其實背後不一定是同一件事。有時候是薪資單看不懂，有時候是公司少給錢，
          有時候則是投保級距和實際薪資對不上。這頁先把最常見的工資問題拆開，讓你直接進到對的工具或說明頁。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分情境</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是每一種工資問題，都該從同一頁開始</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {wageScenarios.map(({ title, desc, to, cta }) => (
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
            工資爭議不只是在查一個數字，而是在查「是哪一種錢出問題」。先把搜尋問句分流，Google 和使用者都更容易找到對的入口。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wageSearchCards.map(({ keyword, desc, to, page }) => (
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
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這四件事，再談工資爭議</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            <li>你現在要查的是實領薪資、欠薪、扣薪合法性，還是投保與提繳級距。</li>
            <li>有沒有先把薪資單、匯款紀錄、打卡資料與公司訊息放在一起對照。</li>
            <li>你要爭的是基本工資、加班費、獎金津貼，還是平均工資口徑。</li>
            <li>扣款名目到底是依法代扣、請假扣薪，還是沒有依據的懲罰性扣薪。</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常看錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易把工資問題看歪</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {wageMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}