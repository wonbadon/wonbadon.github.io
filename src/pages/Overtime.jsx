import { useState } from 'react'
import { calcOvertimeSummary } from '../calculators/overtime'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = {
  salaryType: 'monthly',
  monthlySalary: '',
  hourlyRateInput: '',
  weekdayHours: '',
  restDayHours: '',
  holidayHours: '',
}

export default function Overtime() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    const salary = form.salaryType === 'monthly' ? Number(form.monthlySalary) : Number(form.hourlyRateInput)
    if (!salary || salary <= 0) {
      setError('請輸入正確的薪資')
      return
    }
    const totalHours = Number(form.weekdayHours || 0) + Number(form.restDayHours || 0) + Number(form.holidayHours || 0)
    if (totalHours <= 0) {
      setError('請至少輸入一種加班時數')
      return
    }
    setResult(calcOvertimeSummary(form))
    setError('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">加班費計算器</h1>
        <p className="text-gray-500 text-sm">依《勞動基準法》第24條、第39條、第40條計算</p>
      </div>

      <div className="section-card mb-6">
        {/* Salary type toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">薪資類型</label>
          <div className="flex gap-2">
            {[{ v: 'monthly', label: '月薪制' }, { v: 'hourly', label: '時薪制' }].map(({ v, label }) => (
              <button
                key={v}
                onClick={() => set('salaryType', v)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  form.salaryType === v
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Salary input */}
        {form.salaryType === 'monthly' ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">月薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：32000"
              value={form.monthlySalary}
              onChange={e => set('monthlySalary', e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">時薪將自動換算：月薪 ÷ 30 ÷ 8</p>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">時薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：183（法定基本時薪）"
              value={form.hourlyRateInput}
              onChange={e => set('hourlyRateInput', e.target.value)}
            />
          </div>
        )}

        {/* Hours inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              平日延長工時（小時）
              <span className="ml-2 text-xs font-normal text-gray-400">前2h×1.33 / 第3h起×1.67</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：2"
              min="0"
              max="12"
              value={form.weekdayHours}
              onChange={e => set('weekdayHours', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              休息日出勤（小時）
              <span className="ml-2 text-xs font-normal text-gray-400">前2h×1.33 / 第3h起×1.67</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：8"
              min="0"
              max="12"
              value={form.restDayHours}
              onChange={e => set('restDayHours', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              例假日 / 國定假日出勤（小時）
              <span className="ml-2 text-xs font-normal text-gray-400">×2.0</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：8"
              min="0"
              max="12"
              value={form.holidayHours}
              onChange={e => set('holidayHours', e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button onClick={calculate} className="btn-primary">計算加班費</button>
      </div>

      {/* Results */}
      {result && (
        <div className="section-card">
          <h2 className="text-lg font-bold text-gray-900 mb-4">計算結果</h2>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            適用時薪：<span className="font-semibold text-gray-900">{fmt(result.hourlyRate)} 元</span>
          </div>

          <div className="space-y-3 mb-5">
            {result.weekdayPay > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">平日加班費（{form.weekdayHours} 小時）</span>
                <span className="font-semibold text-gray-900">+ {fmt(result.weekdayPay)} 元</span>
              </div>
            )}
            {result.restDayPay > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">休息日加班費（{form.restDayHours} 小時）</span>
                <span className="font-semibold text-gray-900">+ {fmt(result.restDayPay)} 元</span>
              </div>
            )}
            {result.holidayPay > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">例假日加班費（{form.holidayHours} 小時）</span>
                <span className="font-semibold text-gray-900">+ {fmt(result.holidayPay)} 元</span>
              </div>
            )}
          </div>

          <div className="result-card flex justify-between items-center">
            <span className="font-bold text-gray-800">本次加班費合計</span>
            <span className="text-2xl font-bold text-brand-700">{fmt(result.total)} 元</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            * 加班費為雇主應「額外」給付的金額，不含原本工資。例假日出勤尚須取得勞工同意，雇主不得強制要求。
          </p>
        </div>
      )}

      {/* Explanation */}
      <div className="section-card mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">加班費計算原理</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900 mb-1">月薪換算時薪</p>
            <p>時薪 = 月薪 ÷ 30（天）÷ 8（小時）</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-900 mb-1">平日加班（勞基法第24條第1項）</p>
            <p>前 2 小時：時薪 × 4/3（即加發 1/3）</p>
            <p>第 3 小時起：時薪 × 5/3（即加發 2/3）</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="font-medium text-amber-900 mb-1">休息日加班（勞基法第24條第2項）</p>
            <p>前 2 小時：時薪 × 4/3</p>
            <p>第 3 小時起：時薪 × 5/3</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-medium text-red-900 mb-1">例假日 / 國定假日（勞基法第40條）</p>
            <p>每小時：時薪 × 2（雙倍給付）</p>
          </div>
        </div>
      </div>
    </div>
  )
}
