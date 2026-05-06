import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const siteEntryCards = [
  {
    title: '試算工具總覽',
    desc: '如果你要找的是能直接算加班費、特休、資遣費、勞退與勞健保的勞工網站，首頁已經把常用工具集中在同一層。',
    to: '/',
    cta: '回首頁看工具總覽',
  },
  {
    title: '勞工權益入口',
    desc: '如果你還不確定自己的問題是工資、工時、請假、保險、離職還是申訴，先走權益分類入口會更快。',
    to: '/labor-rights-guide',
    cta: '先看勞工權益懶人包',
  },
  {
    title: '勞工試算入口',
    desc: '如果你知道自己要試算，但還不確定應該進加班費、特休、資遣費、勞退還是薪資單工具，先走試算入口。',
    to: '/labor-calculation-guide',
    cta: '先看勞工試算入口',
  },
  {
    title: '申訴與爭議入口',
    desc: '如果你不是只想查工具，而是已經遇到扣薪、逼離職、低報投保或要找勞工局申訴流程，應先走爭議入口。',
    to: '/complaint-guide',
    cta: '先看申訴流程',
  },
]

const toolSearchCards = [
  {
    keyword: '勞工網站',
    desc: '如果你要找的是把勞工試算、勞工權益與常見問題放在一起的網站，先從首頁與兩個總入口頁分流。',
    to: '/',
    page: '首頁工具總覽',
  },
  {
    keyword: '勞工工具',
    desc: '勞工工具通常不是一個單一頁面，而是加班費、特休、資遣費、勞退、薪資單與保費等不同試算工具組合。',
    to: '/labor-calculation-guide',
    page: '勞工計算與試算工具總整理',
  },
  {
    keyword: '勞工查詢',
    desc: '如果你是在查權益而不是算金額，先用勞工權益入口把工資、工時、請假、保險與離職問題分清楚。',
    to: '/labor-rights-guide',
    page: '勞工權益懶人包',
  },
  {
    keyword: '勞工工具網站',
    desc: '這類查詢通常是在找一站式入口。首頁已經整合熱門工具、內容導覽與站內搜尋，不需要再分開找。',
    to: '/',
    page: '首頁工具總覽',
  },
  {
    keyword: '勞工問題查詢',
    desc: '如果你遇到的是複合問題，像扣薪加離職或高薪低報加失業給付，最好先走問題拆解與申訴入口，不要只看單一工具。',
    to: '/dispute-checker',
    page: '勞資爭議檢查器',
  },
]

const siteChecklist = [
  '先分你要的是直接試算、權益導覽、爭議整理，還是主管機關申訴流程。',
  '只要問題牽涉金額或天數，回到對應工具頁面輸入資料會比一直看文字更快。',
  '只要問題牽涉制度差異，先看勞工權益入口，不要一開始就硬找某個法條名稱。',
  '進到正式申訴、協商或簽署文件前，還是要用原始資料與主管機關口徑做人工覆核。',
]

const siteMistakes = [
  '把勞工網站當成官方網站，直接把試算結果當最終結論。',
  '沒有先分是要算金額、查權益還是處理爭議，就在不同頁面間來回跳。',
  '看到勞工工具就以為每一題都能用同一個公式處理，忽略了制度與日別差異。',
  '進到申訴階段才開始找薪資單、班表與對話紀錄，導致證據整理太晚。',
]

export default function LaborToolsGuide() {
  usePageMeta(
    '勞工網站與勞工工具總整理｜試算工具、懶人包與查詢入口',
    '整理勞工網站、勞工工具、勞工查詢常用入口，整合加班費、特休、資遣費、勞退、薪資單、申訴與懶人包頁面。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">勞工網站整理</p>
        <h1 className="page-title">勞工網站不只是一個首頁，最好先知道你要找哪種入口</h1>
        <p className="page-subtitle max-w-3xl">
          如果你查的是勞工網站、勞工工具、勞工工具網站或勞工查詢，真正卡住的通常不是網站太少，
          而是你還沒先分清楚自己要的是試算工具、權益導覽、問題拆解，還是申訴流程。
          這頁先把網站裡最常用的入口整理好，讓你不用在站內亂跳。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">先找對入口</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">同一個勞工網站，裡面其實是不同用途的頁面</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteEntryCards.map(({ title, desc, to, cta }) => (
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
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你搜的關鍵字不同，最適合落到的頁面也不同</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            泛詞搜尋最怕的就是只丟到首頁，卻沒有第二層入口。這一區把「勞工網站」、「勞工工具」與「勞工查詢」拆成不同落點。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {toolSearchCards.map(({ keyword, desc, to, page }) => (
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
          <p className="page-eyebrow">使用順序</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">照這個順序走，會比一直搜尋同一個大詞有效</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {siteChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常走偏</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤解，最容易讓你查到一半還是得重找</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {siteMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}