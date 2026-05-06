import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const selfHelpActionCards = [
  {
    title: '先不要急著簽文件',
    desc: '如果公司現在要你簽自請離職、切結、和解或放棄權利文件，先分清楚文件用途，再決定要不要簽。',
    to: '/dismissal-guide',
    cta: '先看被開除怎麼辦懶人包',
  },
  {
    title: '先把事件排成時間線',
    desc: '把薪資、班表、打卡、對話訊息、通知與文件照日期排開，才知道真正卡住的是哪一段事實。',
    to: '/dispute-checker',
    cta: '先做勞資爭議快查',
  },
  {
    title: '先把金額與權利拆開',
    desc: '欠薪、加班費、特休折發、資遣費與低報投保不能混成同一筆，先分項目才知道要主張什麼。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
  {
    title: '再決定要不要申訴',
    desc: '當你已經分清楚問題類型、證據和金額後，再進申訴或調解流程，通常會比一開始就直衝主管機關更有效。',
    to: '/complaint-guide',
    cta: '再看勞工申訴流程',
  },
]

const selfHelpSearchCards = [
  {
    keyword: '公司違反勞基法怎麼辦',
    desc: '先不要急著背法條，先把你遇到的是工資、工時、離職、投保還是請假問題分清楚。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '勞工自救先做什麼',
    desc: '大多數案件第一步不是申訴，而是先留原始資料、整理時序，避免後面只剩口頭印象。',
    to: '/labor-problem-guide',
    page: '勞工問題查詢懶人包',
  },
  {
    keyword: '被公司違法對待怎麼辦',
    desc: '先把問題拆成可主張的項目，再決定是要先快篩風險、整理爭點，還是直接進蒐證流程。',
    to: '/rights-check',
    page: '勞工權益健檢',
  },
  {
    keyword: '公司叫我簽離職單怎麼辦',
    desc: '先釐清這是不是公司把解僱包裝成自請離職，再看要保留哪些訊息、文件和時序。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '先蒐證還是先申訴',
    desc: '如果手上的資料還沒整理好，通常先蒐證、先分爭點，會比直接進申訴流程更有效率。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '欠薪怎麼自救',
    desc: '先把欠的是本薪、加班費、獎金、特休折發還是其他項目拆開，再決定下一步。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '公司沒保勞健保怎麼自救',
    desc: '先核對投保薪資、級距、勞退提繳與到職時間，再看是漏保、少保還是高薪低報。',
    to: '/insurance-reporting-guide',
    page: '勞健保高薪低報與兼職投保懶人包',
  },
]

const selfHelpChecklist = [
  '先不要刪對話、重做文件或只留截圖；能保留原始訊息、原始檔案與完整時序更重要。',
  '先把問題分成工資、工時、離職、投保或請假類型，不要一開始就把所有不滿混在一起。',
  '只要主張會牽涉金額、級距或天數，先把數字口徑算清楚，後面協商或申訴才有基礎。',
  '如果公司已經要求你簽文件、離職或和解，先弄清楚文件效果，再決定要不要往下走。',
]

const selfHelpMistakes = [
  '一生氣就先簽離職單、切結書或和解書，後面才回頭想補救。',
  '只記得大概發生過什麼，卻沒有把日期、對話、班表與薪資資料整理起來。',
  '一開始就說公司違法很多，但沒有分清楚哪些是工資、哪些是離職、哪些是投保爭議。',
  '還沒算清楚金額與項目，就先談和解或申訴，導致主張一直變。',
]

export default function LaborSelfHelpGuide() {
  usePageMeta(
    '勞工自救懶人包｜公司違反勞基法、蒐證與申訴前先做什麼',
    '整理勞工自救、公司違反勞基法怎麼辦、被公司違法對待怎麼處理、申訴前蒐證與自救順序，幫你先分清先後步驟。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞工自救整理</p>
        <h1 className="page-title">勞工自救最怕的不是沒法條，而是第一步就做錯</h1>
        <p className="page-subtitle max-w-3xl">
          如果你查的是勞工自救、公司違反勞基法怎麼辦、被公司違法對待怎麼處理，
          真正重要的通常不是先去哪個機關，而是先不要亂簽文件、先把證據留好、先把主張項目拆開。
          這頁先把自救順序整理好，讓你在正式申訴前先做對第一步。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先做這四步</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">勞工自救不是硬撐，而是先把順序做對</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {selfHelpActionCards.map(({ title, desc, to, cta }) => (
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
            <p className="page-eyebrow">常見查法</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你腦中那句「怎麼辦」，站內通常要先進哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            自救類搜尋最容易卡在太大範圍。這一區直接把「違法怎麼辦」、「先蒐證還是先申訴」和「被逼離職怎麼辦」拆成不同落點。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selfHelpSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">自救順序</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先把這些事做完，再進下一步會穩很多</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {selfHelpChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最容易出事</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些動作太快，常常會把後面的路走窄</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {selfHelpMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}