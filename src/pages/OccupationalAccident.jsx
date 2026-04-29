import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/format'

const initialForm = {
  scenario: 'medicalLeave',
  averageSalary: '',
  insuredSalary: '',
  unableWorkDays: '30',
}

export default function OccupationalAccident() {
  usePageMeta(
    '職災給付計算',
    '整理職災醫療休養期間的工資補償、災保傷病給付與死亡補償的初步估算。',
  )

  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setError('')
  }

  function calculate() {
    const averageSalary = Number(form.averageSalary)
    const insuredSalary = Number(form.insuredSalary)

    if (!averageSalary || !insuredSalary || averageSalary <= 0 || insuredSalary <= 0) {
      setError('請輸入正確的平均工資與投保薪資')
      return
    }

    if (form.scenario === 'medicalLeave') {
      const unableWorkDays = Math.max(0, Number(form.unableWorkDays) || 0)
      if (unableWorkDays <= 0) {
        setError('請輸入不能工作的天數')
        return
      }

      const averageDailySalary = averageSalary / 30
      const insuredDailySalary = insuredSalary / 30
      const payableDays = Math.max(0, unableWorkDays - 3)
      const fullDays = Math.min(payableDays, 60)
      const reducedDays = Math.max(0, payableDays - 60)
      const employerCompensation = averageDailySalary * unableWorkDays
      const insuranceFull = insuredDailySalary * fullDays
      const insuranceReduced = insuredDailySalary * reducedDays * 0.7

      setResult({
        scenario: 'medicalLeave',
        unableWorkDays,
        employerCompensation,
        insuranceTotal: insuranceFull + insuranceReduced,
        insuranceFull,
        insuranceReduced,
        fullDays,
        reducedDays,
      })
      return
    }

    setResult({
      scenario: 'death',
      employerCompensation: averageSalary * 45,
      insuranceTotal: insuredSalary * 45,
      averageSalary,
      insuredSalary,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">災保與補償</p>
        <h1 className="page-title">職災給付計算</h1>
        <p className="page-subtitle">
          這頁先抓最常見的兩種輪廓：醫療休養期間的工資補償與傷病給付，還有重大事故時的死亡補償參考。
          失能等級、遺屬資格、照護補助與抵充問題仍要回頭看正式認定文件。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">情境</label>
          <div className="flex gap-2">
            {[{ value: 'medicalLeave', label: '醫療休養' }, { value: 'death', label: '死亡補償' }].map((item) => (
              <button
                key={item.value}
                type="button"
                className={form.scenario === item.value ? 'segmented-button segmented-button-active' : 'segmented-button'}
                onClick={() => set('scenario', item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">平均工資（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：42000"
              value={form.averageSalary}
              onChange={(event) => set('averageSalary', event.target.value)}
            />
            <p className="fine-print mt-2">雇主補償通常以平均工資為核心口徑。</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">投保薪資（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：42000"
              value={form.insuredSalary}
              onChange={(event) => set('insuredSalary', event.target.value)}
            />
            <p className="fine-print mt-2">災保傷病給付以平均日投保薪資試算。</p>
          </div>
        </div>

        {form.scenario === 'medicalLeave' && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">不能工作天數</label>
            <input
              type="number"
              min="1"
              className="input-field"
              value={form.unableWorkDays}
              onChange={(event) => set('unableWorkDays', event.target.value)}
            />
            <p className="fine-print mt-2">災保傷病給付從不能工作第 4 日起發給；前 60 日先按 100% 平均日投保薪資估算，超過 60 日後改按 70%。</p>
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>計算職災給付</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">主要結果</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{formatCurrency(result.insuranceTotal)}</span>
              <span className="result-hero-unit">元</span>
            </div>
            <p className="result-hero-note">
              {result.scenario === 'medicalLeave'
                ? '這裡顯示災保給付概算，雇主的原領工資補償與抵充問題另外列在下方。'
                : '死亡補償情境先以 45 個月口徑做方向估算，遺屬實領方式仍要依實際身份與保險認定判斷。'}
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">雇主補償概算</p>
                <p className="result-meta-value">{formatCurrency(result.employerCompensation)} 元</p>
                <p className="result-meta-subtext">依平均工資口徑試算</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">災保給付概算</p>
                <p className="result-meta-value">{formatCurrency(result.insuranceTotal)} 元</p>
                <p className="result-meta-subtext">依投保薪資口徑試算</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">情境類型</p>
                <p className="result-meta-value">{result.scenario === 'medicalLeave' ? '醫療休養' : '死亡補償'}</p>
                <p className="result-meta-subtext">職災爭議與失能等級仍需另外人工覆核</p>
              </div>
            </div>
          </div>

          {result.scenario === 'medicalLeave' && (
            <div className="result-breakdown">
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">不能工作第 4 日起前 60 日</p>
                  <p className="result-breakdown-note">本次列入 {result.fullDays} 天，以平均日投保薪資 100% 概算</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.insuranceFull)} 元</span>
              </div>
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">第 61 日後</p>
                  <p className="result-breakdown-note">本次列入 {result.reducedDays} 天，以 70% 概算</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.insuranceReduced)} 元</span>
              </div>
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">雇主原領工資補償</p>
                  <p className="result-breakdown-note">如果雇主已全額補償，實際給付與抵充關係仍要再對照實務文件</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.employerCompensation)} 元</span>
              </div>
            </div>
          )}

          {result.scenario === 'death' && (
            <div className="result-breakdown">
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">雇主補償 45 個月</p>
                  <p className="result-breakdown-note">5 個月喪葬費加 40 個月死亡補償的常見理解口徑</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.employerCompensation)} 元</span>
              </div>
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">災保死亡給付參考</p>
                  <p className="result-breakdown-note">遺屬身份、一次金或年金選擇會影響實際結果</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.insuranceTotal)} 元</span>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}