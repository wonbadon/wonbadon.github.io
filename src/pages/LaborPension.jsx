import { useState } from 'react'
import { calcLaborPension } from '../calculators/laborPension'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = {
  salary: '',
  voluntaryRate: '0',
  years: '30',
  annualReturnRate: '3',
}

export default function LaborPension() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    if (!form.salary || Number(form.salary) <= 0) {
      setError('請輸入月薪')
      return
    }
    setResult(calcLaborPension(form))
    setError('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">勞退金試算</h1>
        <p className="text-gray-500 text-sm">依《勞工退休金條例》計算雇主提撥及複利累積試算</p>
      </div>

      <div className="section-card mb-6">
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">月薪（元）</label>
          <input
            type="number"
            className="input-field"
            placeholder="例：40000"
            value={form.salary}
            onChange={e => set('salary', e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">系統會自動對應勞保局薪資分級表</p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            自願提撥率（%）
            <span className="ml-2 text-xs font-normal text-gray-400">0–6%，可抵扣所得稅</span>
          </label>
          <div className="flex gap-2">
            {['0', '1', '2', '3', '6'].map(v => (
              <button
                key={v}
                onClick={() => set('voluntaryRate', v)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  form.voluntaryRate === v
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">試算年數</label>
            <select className="input-field" value={form.years} onChange={e => set('years', e.target.value)}>
              {[5, 10, 15, 20, 25, 30, 35, 40].map(y => (
                <option key={y} value={y}>{y} 年</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">年化收益率</label>
            <select className="input-field" value={form.annualReturnRate} onChange={e => set('annualReturnRate', e.target.value)}>
              {[
                { v: '2', label: '2%（保守）' },
                { v: '3', label: '3%（穩健）' },
                { v: '5', label: '5%（積極）' },
                { v: '7', label: '7%（長期股市）' },
              ].map(({ v, label }) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={calculate} className="btn-primary">試算退休金</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">試算結果</h2>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            提繳工資級距：<span className="font-semibold text-gray-900">{fmt(result.base)} 元</span>
          </div>

          {/* Monthly breakdown */}
          <div className="space-y-2 mb-5">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-600">雇主每月提撥（6%）</span>
              <span className="font-semibold text-gray-900">{fmt(result.employerMonthly)} 元</span>
            </div>
            {result.voluntaryMonthly > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                <span className="text-gray-600">自願提撥（{form.voluntaryRate}%）</span>
                <span className="font-semibold text-gray-900">{fmt(result.voluntaryMonthly)} 元</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
              <span className="text-gray-600 font-medium">每月合計提撥</span>
              <span className="font-bold text-gray-900">{fmt(result.totalMonthly)} 元</span>
            </div>
          </div>

          {/* Accumulated results */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">本金合計</p>
              <p className="text-lg font-bold text-gray-900">{fmt(result.totalContributed)}</p>
              <p className="text-xs text-gray-400">元</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">投資收益</p>
              <p className="text-lg font-bold text-green-700">{fmt(result.earnings)}</p>
              <p className="text-xs text-gray-400">元</p>
            </div>
          </div>

          <div className="result-card flex justify-between items-center">
            <span className="font-bold text-gray-800">{form.years} 年後累積退休金</span>
            <span className="text-2xl font-bold text-brand-700">{fmt(result.totalAccumulated)} 元</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            * 以月複利計算，實際報酬依勞動基金管理局運作結果為準。勞保局保證最低收益不低於2年期定期存款利率。
          </p>
        </div>
      )}

      {/* Explanation */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">勞退金說明</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900 mb-1">雇主強制提撥（6%）</p>
            <p>依法，雇主每月須提撥不低於勞工月薪 6% 的金額至個人勞退帳戶，費用由雇主負擔，不從薪資扣除。</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-900 mb-1">自願提撥（最高 6%）</p>
            <p>勞工可自願提撥，每月上限為薪資 6%。自願提撥金額可全額列為當年度個人所得扣除額，有效節稅！</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="font-medium text-amber-900 mb-1">何時可以領？</p>
            <p>年滿 60 歲，月領或一次領皆可。帳戶餘額是你的，換工作或失業不影響，雇主無法動用。</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium text-purple-900 mb-1">自願提撥節稅試算</p>
            <p>假設月薪 4 萬、自願提撥 6%（2,400元/月），全年 28,800 元可申報扣除，</p>
            <p>適用 12% 稅率可節省 <span className="font-bold">3,456 元</span> 所得稅。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
