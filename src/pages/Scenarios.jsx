import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

const attendanceCases = [
  {
    title: '平日延長工時',
    law: '勞基法第 24 條',
    desc: '同一天仍是一般工作日，只是超過正常工時。前 2 小時與第 3 小時起倍率不同。',
    action: '先用加班費計算機輸入平日延長工時。',
    to: '/overtime',
  },
  {
    title: '休息日出勤',
    law: '勞基法第 24 條第 2 項',
    desc: '重點不是做幾小時，而是那一天本來是不是休息日。前 2 小時、3 至 8 小時與第 9 小時起倍率不同。',
    action: '不要把休息日倍率拿去套平日加班。',
    to: '/overtime',
  },
  {
    title: '國定假日 / 休假日出勤',
    law: '勞基法第 39 條',
    desc: '月薪制與時薪制的 8 小時內給付口徑不同，超過 8 小時才再接第 24 條的延長工時倍率。',
    action: '先分清楚薪資型態，再看 8 小時內與超過 8 小時的差異。',
    to: '/overtime',
  },
  {
    title: '一般例假日',
    law: '勞基法第 40 條',
    desc: '一般例假日原則不得要求出勤。若屬天災、事變或突發事件停止假期，還會牽涉補假與通報。',
    action: '這不是本站常態試算欄位，先看常見問題與法條說明。',
    to: '/faq',
  },
]

const exitCases = [
  {
    title: '非自願離職 / 資遣',
    desc: '先用資遣費頁抓新制、舊制金額，再回頭看預告工資、非自願離職證明與公司程序。',
    to: '/severance',
  },
  {
    title: '自請離職',
    desc: '多數情況不會直接發生資遣費。這類情境和資遣不同，不要把兩者套成同一套結果。',
    to: '/faq',
  },
  {
    title: '定期契約到期或特殊終止',
    desc: '還要回頭看契約性質、終止原因與實際約定，不適合只憑本站單頁結果直接下結論。',
    to: '/about',
  },
]

const mappingRows = [
  {
    situation: '剛被排在休息日上班，想知道今天的出勤費怎麼算',
    page: '加班費計算機',
    check: '先確認那一天真的是休息日，不是國定假日或一般工作日。',
    to: '/overtime',
  },
  {
    situation: '快滿半年或滿一年，想知道法定特休幾天',
    page: '特休天數計算',
    check: '先核對到職日與查詢日，不要只憑印象估年資。',
    to: '/annual-leave',
  },
  {
    situation: '公司臨時調班、改排休或連假排班，想先知道該怎麼分辨',
    page: '排班與出勤爭議懶人包',
    check: '先把原始班表、改班通知與當天性質放在一起看，不要直接跳倍率。',
    to: '/attendance-dispute-guide',
  },
  {
    situation: '颱風天停班停課、被叫去上班，想先知道能不能扣薪或怎麼算',
    page: '颱風假與天災出勤懶人包',
    check: '先分清楚你有沒有出勤，以及那天原本是工作日、休息日還是國定假日。',
    to: '/typhoon-workday-guide',
  },
  {
    situation: '收到資遣通知，想先抓公司大概應給多少',
    page: '資遣費計算機',
    check: '把新制與舊制年資拆開填，避免兩套制度混算。',
    to: '/severance',
  },
  {
    situation: '準備去勞工局申訴或調解，但還沒整理好證據和主張',
    page: '勞工申訴流程懶人包',
    check: '先整理時間線、主張項目與對應證據，再決定要帶哪些資料。',
    to: '/complaint-guide',
  },
  {
    situation: '拿到薪資單，想先核對實領薪資、勞健保扣項和勞退自提',
    page: '薪資單與勞健保懶人包',
    check: '先分清楚哪些是你自己負擔，哪些是雇主另外負擔，再看是不是扣錯。',
    to: '/salary-slip-guide',
  },
  {
    situation: '打工、兼職或工讀，想先分清時薪、加班費、特休和最低工資',
    page: '打工兼職權益懶人包',
    check: '先把薪資型態、班表日別與實際工時拆開，不要只看自己是不是兼職。',
    to: '/part-time-rights-guide',
  },
  {
    situation: '剛到職還在試用期，想知道被說不適任、離職預告和勞健保怎麼看',
    page: '試用期權益懶人包',
    check: '先分清楚是你主動離職、公司終止契約，還是只是在談薪資與投保。',
    to: '/probation-rights-guide',
  },
  {
    situation: '懷孕、生產或準備申請育嬰留停，想先知道該分哪些假別與津貼',
    page: '產假與育嬰留停懶人包',
    check: '先分清楚產假、陪產檢及陪產假、安胎假與育嬰留停，不要全部混成一題。',
    to: '/parental-leave-guide',
  },
  {
    situation: '想知道目前薪資對應哪個勞退級距，退休後可能累積多少',
    page: '勞退退休金試算',
    check: '自提比例是你自己另外提的百分比，不是雇主提撥比率。',
    to: '/labor-pension',
  },
  {
    situation: '想比較幾歲退休比較划算，或分清勞退和勞保年金差在哪',
    page: '退休準備懶人包',
    check: '先把勞退個人帳戶和勞保老年年金拆開，再比較退休年齡差異。',
    to: '/retirement-planning-guide',
  },
]

export default function Scenarios() {
  usePageMeta(
    '熱門情境比較',
    '快速比較平日加班、休息日出勤、國定假日、資遣與自請離職等常見勞工權益情境。',
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">情境比較</p>
        <h1 className="page-title">先分情境，再算金額</h1>
        <p className="page-subtitle max-w-3xl">
          站內最容易被混淆的，不是按鈕怎麼按，而是前面就把情境判錯。這頁把幾個最常混在一起的場景拆開，讓你先找對入口再進工具。
        </p>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">出勤類型</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">加班、休息日、國定假日，不是同一件事</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {attendanceCases.map(({ title, law, desc, action, to }) => (
            <Link
              key={title}
              to={to}
              className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">{law}</p>
              <h3 className="mt-3 text-xl font-extrabold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              <p className="mt-4 text-sm font-semibold text-sky-700">{action}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <p className="page-eyebrow">離職類型</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">不是所有離職都叫做資遣</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {exitCases.map(({ title, desc, to }) => (
            <Link
              key={title}
              to={to}
              className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
            >
              <h3 className="text-xl font-extrabold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="page-eyebrow">快速對照</p>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-950">你的情境，先看哪一頁</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            這裡不是完整法條解釋，而是快速分流表。先找對頁面，再進一步看對應工具與提醒。
          </p>
        </div>

        <div className="table-shell mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">你現在遇到的情境</th>
                <th className="px-4 py-3 font-semibold">先看哪一頁</th>
                <th className="px-4 py-3 font-semibold">進頁前先確認</th>
              </tr>
            </thead>
            <tbody>
              {mappingRows.map(({ situation, page, check, to }) => (
                <tr key={situation} className="border-b border-slate-200 last:border-b-0">
                  <td className="px-4 py-4 align-top leading-7 text-slate-700">{situation}</td>
                  <td className="px-4 py-4 align-top">
                    <Link to={to} className="font-semibold text-sky-700 transition hover:text-sky-800">{page}</Link>
                  </td>
                  <td className="px-4 py-4 align-top leading-7 text-slate-500">{check}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}