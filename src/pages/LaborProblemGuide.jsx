import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const problemEntryCards = [
  {
    title: '工資與扣薪問題',
    desc: '如果你遇到的是欠薪、亂扣薪、薪資單看不懂、加班費沒給或平均工資口徑不清，先把工資項目和證據拆開。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
  {
    title: '離職與解僱問題',
    desc: '如果你卡在被逼離職、自請離職、資遣、最後工作日、非自願離職或文件怎麼拿，先分清楚終止類型。',
    to: '/leaving-job',
    cta: '先看離職權益懶人包',
  },
  {
    title: '投保與低報問題',
    desc: '如果你查的是沒保勞健保、少保、高薪低報、兼職投保或多份工作，先回到投保和提繳資料做比對。',
    to: '/insurance-reporting-guide',
    cta: '先看低報投保懶人包',
  },
  {
    title: '申訴與蒐證問題',
    desc: '如果你已經準備要去勞工局申訴、調解或內部協商，先把時序、主張與證據整理成同一條線。',
    to: '/complaint-guide',
    cta: '先看申訴流程',
  },
]

const problemSearchCards = [
  {
    keyword: '勞工自救',
    desc: '如果你還沒確定要不要正式申訴，先把問題類型、主張項目與證據整理順序釐清。',
    to: '/labor-self-help-guide',
    page: '勞工自救懶人包',
  },
  {
    keyword: '勞工糾紛',
    desc: '如果你遇到的是扣薪、逼離職、未投保或排班爭議同時出現，先用爭議檢查器做第一層拆解。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
  {
    keyword: '公司亂扣薪怎麼辦',
    desc: '這類問題通常要先分本薪、加班費、獎金、全勤與請假扣薪，不要把所有差額混成一題。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '被逼離職怎麼辦',
    desc: '如果公司要你自己簽離職、口頭叫你走或不簽就不給薪，先分清楚是自請離職還是變相解僱。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '高薪低報怎麼辦',
    desc: '這類問題不能只看每月扣款，要把實領薪資、投保級距、勞退提繳與給付影響一起核對。',
    to: '/insurance-reporting-guide',
    page: '勞健保高薪低報與兼職投保懶人包',
  },
  {
    keyword: '勞工申訴前要準備什麼',
    desc: '正式申訴前最重要的不是背法條，而是先把事件時間線、證據和你要主張的金額或權利整理好。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '公司違反勞基法怎麼辦',
    desc: '如果你現在還沒分清楚第一步該做什麼，先走自救入口把文件、時序、證據與後續流程拆開。',
    to: '/labor-self-help-guide',
    page: '勞工自救懶人包',
  },
]

const problemChecklist = [
  '先分清楚你卡的是工資、工時、離職、投保還是正式申訴流程，不要一開始就把所有問題塞成同一題。',
  '先留原始證據，至少包括薪資單、打卡、班表、匯款紀錄、對話訊息、投保資料與離職文件。',
  '只要問題牽涉金額、級距或天數，先回對應工具或懶人包看口徑，再決定要不要進申訴流程。',
  '進到勞工局申訴、調解或協商前，把事件時序、主張項目與證據放到同一份整理裡。',
]

const problemMistakes = [
  '一開始只問自己是不是被違法對待，卻沒有先整理事實、日期與文件。',
  '把自請離職、資遣、開除、最後工作日與非自願離職證明混成同一件事。',
  '發現少保或低報時只看每月扣款，沒有一起核對投保級距和勞退提繳。',
  '碰到複合問題時只找單一公式，忽略真正卡住的是蒐證、時序與申訴方向。',
]

export default function LaborProblemGuide() {
  usePageMeta(
    '勞工問題查詢懶人包｜欠薪、扣薪、離職、低報投保與申訴入口',
    '整理勞工問題查詢、勞工自救、勞工糾紛與勞工申訴前最常見的欠薪、扣薪、離職、低報投保與蒐證入口，幫你先分清問題類型。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞工問題整理</p>
        <h1 className="page-title">勞工問題查詢最怕的是一次問太多，最好先把問題種類拆開</h1>
        <p className="page-subtitle max-w-3xl">
          如果你查的是勞工問題、勞工問題查詢、勞工自救、勞工糾紛或勞工申訴前要先做什麼，
          真正卡住的通常不是沒有答案，而是你還沒先分清楚自己遇到的是工資、離職、投保、工時，還是已經要進正式申訴流程。
          這頁先把最常見的問題入口拆開，讓你不用把不同爭點混成同一題。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分問題</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">你遇到的勞工問題，多半會先落在這四種入口</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problemEntryCards.map(({ title, desc, to, cta }) => (
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
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你腦中講的是問題，站內真正要進的是哪種頁面</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            搜尋勞工問題時，常常會把「自救」、「糾紛」、「扣薪」和「申訴」混在一起。這一區直接把常見問法拆成不同落點。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {problemSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">處理順序</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先把問題整理成這個順序，會比一直查大詞有效</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {problemChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常卡住</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些混法，最容易讓你查了很多卻還是沒走到正確頁面</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {problemMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}