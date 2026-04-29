import { useState } from 'react'
import { calcAnnualLeave, getLeaveTable } from '../calculators/annualLeave'
import usePageMeta from '../hooks/usePageMeta'

export default function AnnualLeave() {
  usePageMeta(
    '特休天數計算',
    '依勞基法第 38 條，從到職日與查詢日期推算目前法定特休天數與下一個年資門檻。',
  )

  const [startDate, setStartDate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const yearsWorkedLabel = result
    ? `${Math.floor(result.yearsWorked)} 年 ${Math.round((result.yearsWorked % 1) * 12)} 個月`
    : ''

  function calculate() {
    if (!startDate) { setError('請選擇到職日期'); return }
    const start = new Date(startDate)
    if (start > new Date()) { setError('到職日期不能是未來日期'); return }
    setResult(calcAnnualLeave(startDate))
    setError('')
  }

  const table = getLeaveTable()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">休假與年資</p>
        <h1 className="page-title">特休資格與法定天數</h1>
        <p className="page-subtitle">
          依《勞動基準法》第38條門檻試算，並以「滿整月」年資判定，避免把未滿一個月的時間提前算進資格。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-4">
          <p className="text-sm font-semibold text-sky-800">試算口徑</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            這頁只處理法定年資門檻，不處理企業採周年制、曆年制、遞延折算或公司自訂優於法令的休假制度。
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">到職日期</label>
          <input
            type="date"
            className="input-field"
            value={startDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => { setStartDate(e.target.value); setResult(null); setError('') }}
          />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button onClick={calculate} className="btn-primary">計算特休天數</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <p className="page-eyebrow">試算結果</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">目前法定特休資格</h2>

          <div className={result.days === 0 ? 'result-hero result-hero-warning mt-5' : 'result-hero mt-5'}>
            <p className="result-hero-label">{result.days === 0 ? '目前狀態' : '目前法定特休'}</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{result.days}</span>
              <span className="result-hero-unit">天</span>
            </div>
            <p className="result-hero-note">
              {result.days === 0
                ? `尚未達到法定特休資格，還需 ${result.monthsToNext} 個月後（滿 6 個月）才會取得 3 天。`
                : `目前年資約 ${yearsWorkedLabel}。再 ${Math.ceil(result.monthsToNext)} 個月後，法定特休將升級為 ${result.nextDays} 天。`}
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">目前年資</p>
                <p className="result-meta-value">{yearsWorkedLabel}</p>
                <p className="result-meta-subtext">以滿整月口徑計算</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">下一門檻</p>
                <p className="result-meta-value">{result.days === 0 ? '滿 6 個月' : `升級為 ${result.nextDays} 天`}</p>
                <p className="result-meta-subtext">約再 {result.days === 0 ? result.monthsToNext : Math.ceil(result.monthsToNext)} 個月</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">判定邊界</p>
                <p className="result-meta-value">{result.days === 0 ? '尚未取得' : '已達法定資格'}</p>
                <p className="result-meta-subtext">不含曆年制、先行給假與遞延換算</p>
              </div>
            </div>
          </div>

          <p className="fine-print mt-4">
            * 若公司採曆年制、先行給假、年中轉制或未休遞延，本結果可能與內部制度換算後的實際天數不同。
          </p>
        </div>
      )}

      <div className="section-card">
        <p className="page-eyebrow">法定對照表</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">勞基法特休天數門檻</h2>
        <div className="table-shell mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-400">在職時間</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-400">法定特休天數</th>
              </tr>
            </thead>
            <tbody>
              {table.map(({ period, days }, i) => (
                <tr key={period} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border-t border-slate-200 px-4 py-4 text-slate-700">{period}</td>
                  <td className="border-t border-slate-200 px-4 py-4 text-right font-semibold text-sky-700">{days} 天</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 space-y-2 text-sm text-slate-600">
          <h3 className="font-semibold text-slate-950">常見提醒</h3>
          <div className="space-y-3">
            <div className="metric-tile">
              <p className="font-medium">特休未休完怎麼辦？</p>
              <p className="mt-2 text-slate-600">年度終結或契約終止時，雇主應以工資補償未休特休天數（依日薪計算）。</p>
            </div>
            <div className="metric-tile">
              <p className="font-medium">特休可以遞延嗎？</p>
              <p className="mt-2 text-slate-600">勞雇雙方可協議在次一年度內使用，但仍須注意年度終結時的補償義務。</p>
            </div>
            <div className="metric-tile">
              <p className="font-medium">特休怎麼排？</p>
              <p className="mt-2 text-slate-600">應由勞工自行排定，雇主不得強制指定時間，但可在不影響正常營運下協商調整。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
