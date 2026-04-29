import { useState } from 'react'
import { calcInsurancePremiums } from '../calculators/insurance'
import {
  DEFAULT_OCCUPATIONAL_ACCIDENT_RATE,
  HEALTH_INSURANCE_EMPLOYER_DEPENDENT_FACTOR,
} from '../data/insurance'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/format'

const initialForm = {
  salary: '',
  dependents: '0',
  voluntaryPensionRate: '0',
  occupationalRate: String(DEFAULT_OCCUPATIONAL_ACCIDENT_RATE),
  employerHealthDependentFactor: String(HEALTH_INSURANCE_EMPLOYER_DEPENDENT_FACTOR),
}

export default function InsurancePremium() {
  usePageMeta(
    '勞健保保費計算',
    '用 2026 年勞保、健保與勞退級距，試算勞工、雇主與政府的每月負擔。',
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
    const salary = Number(form.salary)
    if (!salary || salary <= 0) {
      setError('請輸入正確的月薪')
      return
    }

    setResult(calcInsurancePremiums(form))
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">保費與薪資</p>
        <h1 className="page-title">勞健保保費計算</h1>
        <p className="page-subtitle">
          先把勞工、雇主、政府三方的每月負擔拆開看，再決定調薪、聘用或轉職成本。
          健保雇主端預設使用平均眷口數 0.56 概估，職災保險則依你輸入的費率估算。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">月薪（元）</label>
          <input
            type="number"
            className="input-field"
            placeholder="例：48000"
            value={form.salary}
            onChange={(event) => set('salary', event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">健保眷屬人數</label>
            <input
              type="number"
              min="0"
              max="3"
              className="input-field"
              value={form.dependents}
              onChange={(event) => set('dependents', event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">勞退自提比例（%）</label>
            <input
              type="number"
              min="0"
              max="6"
              className="input-field"
              value={form.voluntaryPensionRate}
              onChange={(event) => set('voluntaryPensionRate', event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">職災費率（%）</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              className="input-field"
              value={form.occupationalRate}
              onChange={(event) => set('occupationalRate', event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">雇主健保平均眷口數</label>
            <input
              type="number"
              min="0"
              max="3"
              step="0.01"
              className="input-field"
              value={form.employerHealthDependentFactor}
              onChange={(event) => set('employerHealthDependentFactor', event.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>計算每月保費</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">保費總覽</p>
            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">勞工每月負擔</p>
                <p className="result-meta-value">{formatCurrency(result.employeeTotalDeduction)} 元</p>
                <p className="result-meta-subtext">勞保 + 健保 + 勞退自提</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">雇主每月負擔</p>
                <p className="result-meta-value">{formatCurrency(result.employerTotalBurden)} 元</p>
                <p className="result-meta-subtext">含職災保險與 6% 勞退提撥</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">政府每月分擔</p>
                <p className="result-meta-value">{formatCurrency(result.governmentTotalBurden)} 元</p>
                <p className="result-meta-subtext">僅作試算，不代表實際補助審核結果</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">勞保投保薪資</p>
                <p className="result-breakdown-note">勞工 {formatCurrency(result.workerLaborInsurance)} / 雇主 {formatCurrency(result.employerLaborInsurance)} / 政府 {formatCurrency(result.governmentLaborInsurance)}</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.laborInsuranceBase)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">健保投保金額</p>
                <p className="result-breakdown-note">勞工 {formatCurrency(result.workerHealthInsurance)} / 雇主 {formatCurrency(result.employerHealthInsurance)} / 政府 {formatCurrency(result.governmentHealthInsurance)}</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.healthInsuranceBase)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">職災保險雇主負擔</p>
                <p className="result-breakdown-note">以 {result.occupationalRatePercent}% 概估，實際仍以行業別核定費率為準</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.employerOccupationalInsurance)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">勞退提撥</p>
                <p className="result-breakdown-note">雇主強制提撥 {formatCurrency(result.mandatoryPension)} 元，自提 {formatCurrency(result.voluntaryPension)} 元</p>
              </div>
              <span className="result-breakdown-value">級距 {formatCurrency(result.pensionBase)} 元</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}