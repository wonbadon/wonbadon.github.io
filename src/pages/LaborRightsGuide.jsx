import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const rightsAreas = [
  {
    title: '工資與扣薪',
    desc: '先分清楚是欠薪、扣薪、薪資單看不懂，還是平均工資口徑被算錯。這一類問題通常要先回到工資結構。',
    to: '/wage-rights',
    cta: '先看工資與扣薪懶人包',
  },
  {
    title: '工時與加班',
    desc: '如果你查的是勞工加班、國定假日出勤、排班或責任制，先把工作日類型與制度分清楚，再進試算。',
    to: '/overtime-guide',
    cta: '先看加班費入口',
  },
  {
    title: '請假與特休',
    desc: '病假、事假、生理假、家庭照顧假與特休是不同制度。先分清假別與年資，後面才不會把權益混掉。',
    to: '/leave-guide',
    cta: '先看請假權益懶人包',
  },
  {
    title: '保險與給付',
    desc: '勞保、健保、勞退、職災與失業給付不是同一套制度。先分清投保、提繳與給付類型，再往下查。',
    to: '/insurance-benefits-guide',
    cta: '先看保險與給付入口',
  },
  {
    title: '離職、解僱與申訴',
    desc: '離職預告期、資遣費、非自願離職文件、被開除與勞工局申訴，最好先依終止情境與證據完整度分流。',
    to: '/leaving-job',
    cta: '先看離職權益懶人包',
  },
]

const rightsSearchCards = [
  {
    keyword: '勞工權益有哪些',
    desc: '如果你還不知道問題屬於工資、工時、請假、保險或離職，先用新手指南與權益健檢做第一層分流。',
    to: '/guide',
    page: '新手指南',
  },
  {
    keyword: '勞工被扣薪怎麼辦',
    desc: '先分清楚是遲到扣薪、全勤扣回、做錯事賠償，還是薪資單與平均工資口徑本身有問題。',
    to: '/wage-rights',
    page: '工資與扣薪懶人包',
  },
  {
    keyword: '勞工可以去哪裡申訴',
    desc: '如果已經要進到勞工局申訴、調解或檢舉，最重要的是把時序、證據與計算口徑先整理好。',
    to: '/complaint-guide',
    page: '勞工申訴流程懶人包',
  },
  {
    keyword: '勞工被逼離職或被開除怎麼辦',
    desc: '這一類問題通常會同時牽涉終止事由、非自願離職文件、失業給付與資遣費，不要只看單一頁。',
    to: '/dismissal-guide',
    page: '被開除怎麼辦懶人包',
  },
  {
    keyword: '勞工請假、特休和加班要怎麼分',
    desc: '如果你卡在假別、年資、排班或國定假日出勤，先分制度，再回去看試算工具才不會整串算錯。',
    to: '/scenarios',
    page: '熱門情境比較',
  },
]

const rightsChecklist = [
  '最近幾個月的薪資單、出勤紀錄、班表與假單，先整理成同一份時序。',
  '到職日、離職通知日、資遣通知或公司要求簽署的文件，先留下原始版本。',
  '投保薪資、勞健保扣項、勞退提繳與任何公司公告，先確認是不是同一個口徑。',
  '如果已經進到爭議階段，對話紀錄、訊息截圖與公司回覆時間點要一併保存。',
]

const rightsMistakes = [
  '還沒分清是工資、工時、請假、保險還是終止爭議，就直接找一個公式硬套。',
  '把勞保、勞退、健保、職災與失業給付混成同一個制度，結果越查越亂。',
  '沒有先保存薪資單、排班表與訊息紀錄，等到申訴前才開始回頭找證據。',
  '把試算結果當成最終法律意見，沒有再回到原始資料與主管機關口徑做覆核。',
]

export default function LaborRightsGuide() {
  usePageMeta(
    '勞工權益懶人包｜工資、工時、請假、保險、離職與申訴入口總整理',
    '整理勞工權益最常見的工資、工時、請假、保險、離職、申訴與勞資爭議問題，幫你先找到正確工具與閱讀入口。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞工權益整理</p>
        <h1 className="page-title">勞工權益問題很多，但大多可以先分成五塊</h1>
        <p className="page-subtitle max-w-3xl">
          如果你查的是勞工權益、勞工權益查詢或勞工權益網站，最常卡住的不是法條太多，而是前面就把問題分錯類。
          這頁先把工資、工時、請假、保險、離職與申訴的入口拆開，讓你先找到正確工具與懶人包。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先分權益類型</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同樣叫勞工權益，背後其實是不同制度</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rightsAreas.map(({ title, desc, to, cta }) => (
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
            <p className="page-eyebrow">熱門查法</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">別只查「勞工權益」，把問題句子拆開會更快</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            搜尋引擎抓的是完整問句，不只是單一名詞。把常見查詢拆成入口頁，能讓第一次進站的人更快找到對的工具或懶人包。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {rightsSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">查之前先備好</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">把這些資料先整理好，後面才有辦法算也有辦法申訴</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {rightsChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常繞遠路</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易讓勞工權益問題查半天還是回到原點</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {rightsMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}