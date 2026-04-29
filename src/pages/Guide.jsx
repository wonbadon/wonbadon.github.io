import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { featuredTools } from '../data/toolCatalog'

const steps = [
  {
    label: 'Step 1',
    title: '先分清楚你現在是哪一類權益',
    desc: '加班、特休、資遣與勞退的法源不同。先分情境，後面看到的金額才有意義。',
  },
  {
    label: 'Step 2',
    title: '只準備必要資料，不要混入多餘欄位',
    desc: '本站大多只需要月薪、到職日、平均工資、年資或自提比例，不需要完整個資。',
  },
  {
    label: 'Step 3',
    title: '先把結果當成方向，不是最後認定',
    desc: '試算結果適合拿來抓範圍、確認法條口徑與整理提問，不適合直接當成結案數字。',
  },
  {
    label: 'Step 4',
    title: '碰到制度細節時，一定要回頭人工覆核',
    desc: '獎金、津貼、輪班、變形工時、非典型排班與爭議事實，不一定能被單頁試算完整覆蓋。',
  },
]

const checklist = [
  '確認你輸入的是月薪、時薪還是平均工資，不要互相代替。',
  '到職日、查詢日、離職日先核對好，避免日期差一天整個門檻錯掉。',
  '資遣費頁的年資要分清楚新制與舊制，不要把不同制度合併填。',
  '勞退頁的自提比例是你自己額外提繳的比例，不是公司提撥比率。',
]

const pitfalls = [
  '把休息日出勤誤算成平日延長工時，倍率就會直接錯。',
  '把國定假日和一般例假日混在一起看，容易誤解為所有假日都能常態出勤。',
  '把最近一個月薪資當平均工資，忽略前六個月工資總額與總日數。',
  '把試算結果當成公司一定要給的最終認定，沒有再回頭核對公司制度與實際事實。',
]

export default function Guide() {
  usePageMeta(
    '新手指南',
    '第一次使用台灣勞工權益計算器時，先看情境怎麼分、資料怎麼準備，以及哪些地方需要人工覆核。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">內容導覽</p>
        <h1 className="page-title">第一次使用本站，先這樣看</h1>
        <p className="page-subtitle max-w-3xl">
          這站的角色不是把所有勞動問題一次判完，而是幫你先把情境拆清楚、把資料準備好，再用正確工具抓出大致範圍。
          如果你剛進站還不確定該點哪一頁，先照這裡的順序走會比較穩。
        </p>
      </section>

      <section className="section-card">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ label, title, desc }) => (
            <div key={label} className="metric-tile h-full">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">{label}</p>
              <h2 className="mt-3 text-xl font-extrabold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="page-eyebrow">快速入口</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">四個工具，各自處理不同問題</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            不要把加班、特休、資遣與勞退混在同一頁看。先進對頁面，才不會一開始就用錯法條口徑。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featuredTools.map(({ to, title, guideDesc }) => (
            <Link
              key={to}
              to={to}
              className="metric-tile block transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"
            >
              <p className="text-lg font-extrabold text-slate-950">{title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{guideDesc}</p>
              <p className="mt-4 text-sm font-semibold text-sky-700">直接進入試算 →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="section-card">
          <p className="page-eyebrow">輸入前檢查</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">先確認這些欄位，錯誤率會低很多</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">最常犯錯</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">這些誤用，會讓結果整個偏掉</h2>
          <ul className="site-list mt-5 space-y-3 text-sm leading-7 text-slate-600">
            {pitfalls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-card">
        <div className="grid gap-5 xl:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className="page-eyebrow">下一步</p>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-950">如果你還卡在「到底算哪一種」，先去看情境頁</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              最常見的混淆點通常不是計算本身，而是前面就把情境分錯。像是把休息日和國定假日混為一談，或把資遣和自請離職放在同一套邏輯下看。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            <Link to="/scenarios" className="metric-tile block transition duration-200 hover:bg-sky-50">
              <p className="text-lg font-extrabold text-slate-950">看熱門情境比較</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">用情境對照表快速判斷現在應該先看哪個工具。</p>
            </Link>
            <Link to="/faq" className="metric-tile block transition duration-200 hover:bg-sky-50">
              <p className="text-lg font-extrabold text-slate-950">看常見問題</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">把最容易疑惑的口徑、法條和例外情況先看一遍。</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}