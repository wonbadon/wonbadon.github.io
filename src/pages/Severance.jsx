import { useState } from 'react'
import { calcSeverance } from '../calculators/severance'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = { avgSalary: '', yearsNew: '', yearsOld: '' }

export default function Severance() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    if (!form.avgSalary || Number(form.avgSalary) <= 0) {
      setError('請輸入平均工資')
      return
    }
    const totalYears = Number(form.yearsNew || 0) + Number(form.yearsOld || 0)
    if (totalYears <= 0) {
      setError('請輸入年資（至少填寫一種制度）')
      return
    }
    setResult(calcSeverance(form))
    setError('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">資遣費計算器</h1>
        <p className="text-gray-500 text-sm">依《勞動基準法》第17條及《勞工退休金條例》第12條計算</p>
      </div>

      <div className="section-card mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            離職前6個月平均工資（元）
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="例：40000"
            value={form.avgSalary}
            onChange={e => set('avgSalary', e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">平均工資 = 離職前6個月薪資總額 ÷ 6</p>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm font-medium text-blue-900 mb-1">如何區分新舊制？</p>
          <p className="text-sm text-blue-700">
            2005年7月1日前的年資屬「舊制」；2005年7月1日後的年資屬「新制」。
            若你是 2005年後才入職，全部填新制即可。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              新制年資（年）
              <span className="text-xs font-normal text-gray-400 block">2005/7/1 後</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：5.5"
              min="0"
              step="0.1"
              value={form.yearsNew}
              onChange={e => set('yearsNew', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              舊制年資（年）
              <span className="text-xs font-normal text-gray-400 block">2005/7/1 前</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：3"
              min="0"
              step="0.1"
              value={form.yearsOld}
              onChange={e => set('yearsOld', e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={calculate} className="btn-primary">計算資遣費</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">計算結果</h2>

          <div className="space-y-3 mb-5">
            {result.newSystemPay > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">新制資遣費</p>
                  <p className="text-xs text-gray-400">{form.yearsNew} 年 × 0.5 月 = {result.newMonths.toFixed(1)} 個月工資</p>
                </div>
                <span className="font-semibold text-gray-900">{fmt(result.newSystemPay)} 元</span>
              </div>
            )}
            {result.oldSystemPay > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-800">舊制資遣費</p>
                  <p className="text-xs text-gray-400">{form.yearsOld} 年 × 1 月 = {result.oldMonths.toFixed(1)} 個月工資（上限6月）</p>
                </div>
                <span className="font-semibold text-gray-900">{fmt(result.oldSystemPay)} 元</span>
              </div>
            )}
          </div>

          <div className="result-card flex justify-between items-center">
            <span className="font-bold text-gray-800">資遣費合計</span>
            <span className="text-2xl font-bold text-brand-700">{fmt(result.total)} 元</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            * 新制年資上限為6個月工資；舊制年資上限亦為6個月工資，兩者分別計算後加總。
          </p>
        </div>
      )}

      {/* Explanation */}
      <div className="section-card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">資遣費計算說明</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-900 mb-1">勞退新制（2005/7/1後年資）</p>
            <p>資遣費 = 年資 × <span className="font-semibold">1/2</span> 個月平均工資</p>
            <p className="text-xs text-blue-600 mt-1">上限：6個月平均工資</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium text-purple-900 mb-1">勞退舊制（2005/7/1前年資）</p>
            <p>資遣費 = 年資 × <span className="font-semibold">1</span> 個月平均工資</p>
            <p className="text-xs text-purple-600 mt-1">上限：6個月平均工資</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <p className="font-medium text-amber-900 mb-1">什麼情況可以領資遣費？</p>
            <ul className="list-disc list-inside space-y-1 text-amber-800">
              <li>雇主縮減業務、虧損停業</li>
              <li>業務性質變更，勞工不願調職</li>
              <li>不可抗力暫停工作逾3個月</li>
              <li>大量解僱情形</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-medium text-red-900 mb-1">自願離職、重大過失免給資遣費</p>
            <p className="text-red-700">勞工主動辭職、或因嚴重違規遭解僱，雇主不須給付資遣費。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
