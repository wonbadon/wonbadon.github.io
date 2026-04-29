import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatNumber } from '../utils/format'

const initialForm = {
  monthlySalary: '',
  monthsWorked: '12',
  targetBonusMonths: '1',
}

export default function YearEndBonus() {
  usePageMeta(
    '年終獎金計算',
    '依月薪、在職月數與目標發放月數，估算年終獎金比例與落點。',
  )

  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setError('')
  }

  function calculate() {
    const monthlySalary = Number(form.monthlySalary)
    const monthsWorked = Math.min(12, Math.max(0, Number(form.monthsWorked)))
    const targetBonusMonths = Math.max(0, Number(form.targetBonusMonths))

    if (!monthlySalary || monthlySalary <= 0) {
      setError('請輸入正確的月薪')
      return
    }

    setResult({
      monthlySalary,
      monthsWorked,
      targetBonusMonths,
      fullYearBonus: monthlySalary * targetBonusMonths,
      prorationRatio: monthsWorked / 12,
      estimatedBonus: monthlySalary * targetBonusMonths * (monthsWorked / 12),
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">薪酬估算</p>
        <h1 className="page-title">年終獎金計算</h1>
        <p className="page-subtitle">
          年終通常高度依賴公司制度與績效規則，這頁先把最常見的固定月數與在職比例拆開給你看，方便抓大致區間。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">月薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：40000"
              value={form.monthlySalary}
              onChange={(event) => set('monthlySalary', event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">年度內在職月數</label>
            <input
              type="number"
              min="0"
              max="12"
              step="0.5"
              className="input-field"
              value={form.monthsWorked}
              onChange={(event) => set('monthsWorked', event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">公司常見年終月數</label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="input-field"
              value={form.targetBonusMonths}
              onChange={(event) => set('targetBonusMonths', event.target.value)}
            />
          </div>
        </div>

        <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
          這頁只處理「固定月數」或「按在職比例折算」的常見情境。如果公司還會看部門績效、考績、出勤或獎懲，實際數字會不同。
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>估算年終獎金</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">估算結果</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{formatCurrency(result.estimatedBonus)}</span>
              <span className="result-hero-unit">元</span>
            </div>
            <p className="result-hero-note">如果公司採固定 {formatNumber(result.targetBonusMonths, 1)} 個月，且依在職比例計算，這是最常見的概算方式。</p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">全年滿額年終</p>
                <p className="result-meta-value">{formatCurrency(result.fullYearBonus)} 元</p>
                <p className="result-meta-subtext">月薪 × {formatNumber(result.targetBonusMonths, 1)} 個月</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">在職比例</p>
                <p className="result-meta-value">{formatNumber(result.prorationRatio * 100, 1)}%</p>
                <p className="result-meta-subtext">今年在職 {formatNumber(result.monthsWorked, 1)} 個月</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">估算方式</p>
                <p className="result-meta-value">按比例折算</p>
                <p className="result-meta-subtext">不含考績、部門分潤與額外獎金</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}