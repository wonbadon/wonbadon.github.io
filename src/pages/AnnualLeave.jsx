import { useState } from 'react'
import { calcAnnualLeave, getLeaveTable } from '../calculators/annualLeave'

export default function AnnualLeave() {
  const [startDate, setStartDate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    if (!startDate) { setError('請選擇到職日期'); return }
    const start = new Date(startDate)
    if (start > new Date()) { setError('到職日期不能是未來日期'); return }
    setResult(calcAnnualLeave(startDate))
    setError('')
  }

  const table = getLeaveTable()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">特休天數計算器</h1>
        <p className="text-gray-500 text-sm">依《勞動基準法》第38條計算</p>
      </div>

      <div className="section-card mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">到職日期</label>
          <input
            type="date"
            className="input-field"
            value={startDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => { setStartDate(e.target.value); setResult(null); setError('') }}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={calculate} className="btn-primary">計算特休天數</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">計算結果</h2>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            目前年資：<span className="font-semibold text-gray-900">
              {Math.floor(result.yearsWorked)} 年{' '}
              {Math.round((result.yearsWorked % 1) * 12)} 個月
            </span>
          </div>

          {result.days === 0 ? (
            <div className="result-card mb-4 bg-amber-50 border-amber-200">
              <p className="font-semibold text-amber-800 mb-1">尚未達到特休資格</p>
              <p className="text-sm text-amber-700">
                還需 <span className="font-bold">{result.monthsToNext}</span> 個月後（滿6個月），
                即可享有 <span className="font-bold">3天</span> 特休
              </p>
            </div>
          ) : (
            <>
              <div className="result-card flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">目前特休天數</span>
                <span className="text-2xl font-bold text-brand-700">{result.days} 天</span>
              </div>
              <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-800">
                再 <span className="font-bold">{Math.ceil(result.monthsToNext)}</span> 個月後特休將升級為{' '}
                <span className="font-bold">{result.nextDays} 天</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Leave table */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">勞基法特休天數對照表</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2.5 text-left font-semibold text-gray-700 rounded-tl-lg">在職時間</th>
                <th className="px-4 py-2.5 text-right font-semibold text-gray-700 rounded-tr-lg">特休天數</th>
              </tr>
            </thead>
            <tbody>
              {table.map(({ period, days }, i) => (
                <tr key={period} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-gray-700">{period}</td>
                  <td className="px-4 py-3 text-right font-semibold text-brand-700">{days} 天</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-900">常見問題</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium">特休未休完怎麼辦？</p>
              <p className="text-gray-500">年度終結或契約終止時，雇主應以工資補償未休特休天數（依日薪計算）。</p>
            </div>
            <div>
              <p className="font-medium">特休可以遞延嗎？</p>
              <p className="text-gray-500">勞雇雙方可協議在次一年度內使用，但仍須注意以日薪結清的義務。</p>
            </div>
            <div>
              <p className="font-medium">特休怎麼排？</p>
              <p className="text-gray-500">應由勞工自行排定，雇主不得強制指定時間，但可在不影響正常營運下協商調整。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
