import { useState } from 'react'
import { buildRetirementAgeOptions, buildRetirementScenario } from '../calculators/retirementPlanner'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/format'

const initialForm = {
  currentAge: '35',
  targetAge: '60',
  insuredYears: '10',
  averageInsuredSalary: '42000',
  currentBalance: '0',
  monthlySalary: '42000',
  voluntaryRate: '0',
  annualReturnRate: '3',
  lifeExpectancy: '85',
}

export default function RetirementPlanner() {
  usePageMeta(
    '退休年齡規劃',
    '結合勞保老年年金與勞退帳戶累積，試算不同退休年齡下的月收入輪廓。',
  )

  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [ageOptions, setAgeOptions] = useState([])
  const [error, setError] = useState('')

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setAgeOptions([])
    setError('')
  }

  function calculate() {
    const currentAge = Number(form.currentAge)
    const targetAge = Number(form.targetAge)

    if (!currentAge || !targetAge || targetAge < currentAge) {
      setError('退休年齡不能小於目前年齡')
      return
    }

    const scenario = buildRetirementScenario(form)
    const options = buildRetirementAgeOptions(form)

    setResult(scenario)
    setAgeOptions(options)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">退休規劃</p>
        <h1 className="page-title">退休年齡規劃</h1>
        <p className="page-subtitle">
          這頁把勞保老年年金與勞退帳戶投資後的金額放在一起看，目的是幫你比較不同退休年齡下的大致月收入，不是取代正式請領審核。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input type="number" className="input-field" placeholder="目前年齡" value={form.currentAge} onChange={(event) => set('currentAge', event.target.value)} />
          <input type="number" className="input-field" placeholder="想退休年齡" value={form.targetAge} onChange={(event) => set('targetAge', event.target.value)} />
          <input type="number" className="input-field" placeholder="已投保年資" value={form.insuredYears} onChange={(event) => set('insuredYears', event.target.value)} />
          <input type="number" className="input-field" placeholder="平均投保薪資" value={form.averageInsuredSalary} onChange={(event) => set('averageInsuredSalary', event.target.value)} />
          <input type="number" className="input-field" placeholder="目前勞退餘額" value={form.currentBalance} onChange={(event) => set('currentBalance', event.target.value)} />
          <input type="number" className="input-field" placeholder="目前月薪" value={form.monthlySalary} onChange={(event) => set('monthlySalary', event.target.value)} />
          <input type="number" className="input-field" placeholder="勞退自提 %" value={form.voluntaryRate} onChange={(event) => set('voluntaryRate', event.target.value)} />
          <input type="number" className="input-field" placeholder="年化報酬率 %" value={form.annualReturnRate} onChange={(event) => set('annualReturnRate', event.target.value)} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">預估壽命</label>
          <input type="number" className="input-field" value={form.lifeExpectancy} onChange={(event) => set('lifeExpectancy', event.target.value)} />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>開始規劃</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">目標退休年齡月收入輪廓</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{formatCurrency(result.combinedMonthlyIncome)}</span>
              <span className="result-hero-unit">元 / 月</span>
            </div>
            <p className="result-hero-note">這是把勞保老年年金與勞退帳戶按預估壽命均分後的月收入概算。法定請領年齡與資格仍要依出生年與制度細節確認。</p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">勞保老年年金</p>
                <p className="result-meta-value">{formatCurrency(result.annuity.chosen)} 元</p>
                <p className="result-meta-subtext">採 {result.annuity.method}（A 式 {formatCurrency(result.annuity.planA)} / B 式 {formatCurrency(result.annuity.planB)}）</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">勞退帳戶預估</p>
                <p className="result-meta-value">{formatCurrency(result.projectedBalance)} 元</p>
                <p className="result-meta-subtext">提繳級距 {formatCurrency(result.pensionBase)} 元</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">勞退換算月額</p>
                <p className="result-meta-value">{formatCurrency(result.estimatedMonthlyDraw)} 元</p>
                <p className="result-meta-subtext">依預估壽命均分，非官方年金核定值</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            {ageOptions.map((option) => (
              <div key={option.targetAge} className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">{option.targetAge} 歲退休</p>
                  <p className="result-breakdown-note">勞保年金 {formatCurrency(option.annuity.chosen)} 元 + 勞退月額 {formatCurrency(option.estimatedMonthlyDraw)} 元</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(option.combinedMonthlyIncome)} 元 / 月</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}