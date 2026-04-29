import { useState } from 'react'
import { calcInsurancePremiums } from '../calculators/insurance'
import {
  DEFAULT_OCCUPATIONAL_ACCIDENT_RATE,
  MINIMUM_HOURLY_WAGE,
  MINIMUM_MONTHLY_WAGE,
} from '../data/insurance'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatPercent } from '../utils/format'

const initialForm = {
  salary: '',
  dependents: '0',
  voluntaryPensionRate: '0',
  occupationalRate: String(DEFAULT_OCCUPATIONAL_ACCIDENT_RATE),
}

export default function SalarySlip() {
  usePageMeta(
    '薪資明細計算機',
    '拆出 2026 年勞保、健保、勞退自提與實領月薪，協助你快速核對薪資單。',
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
        <h1 className="page-title">薪資明細計算機</h1>
        <p className="page-subtitle">
          依 2026 年勞保、健保與勞退級距，先把常見薪資單上的扣項拆開。
          本頁以一般受僱勞工為前提，健保眷屬最多以 3 口計入，職災保險預設用 0.20% 做概估。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-slate-700">
          2026 年法定最低工資為月薪 {formatCurrency(MINIMUM_MONTHLY_WAGE)} 元、時薪 {formatCurrency(MINIMUM_HOURLY_WAGE)} 元。
          如果公司申報的投保級距與你實際薪資落差很大，建議直接再核對薪資單或投保明細。
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">月薪（元）</label>
          <input
            type="number"
            className="input-field"
            placeholder="例：42000"
            value={form.salary}
            onChange={(event) => set('salary', event.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
            <p className="fine-print mt-2">勞工自付端最多先以 3 口估算。</p>
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
            <p className="fine-print mt-2">勞工自願提繳上限 6%。</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">職災保險概估費率（%）</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              className="input-field"
              value={form.occupationalRate}
              onChange={(event) => set('occupationalRate', event.target.value)}
            />
            <p className="fine-print mt-2">實際職災費率依行業別不同而不同，這裡只做概估。</p>
          </div>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>計算薪資明細</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">估算結果</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{formatCurrency(result.takeHomePay)}</span>
              <span className="result-hero-unit">元</span>
            </div>
            <p className="result-hero-note">
              這是扣掉勞保、健保與勞退自提後的估算實領月薪，不含所得稅、補充保費、伙食費或公司自訂扣款。
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">勞保投保薪資</p>
                <p className="result-meta-value">{formatCurrency(result.laborInsuranceBase)} 元</p>
                <p className="result-meta-subtext">員工自付 {formatCurrency(result.workerLaborInsurance)} 元</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">健保投保金額</p>
                <p className="result-meta-value">{formatCurrency(result.healthInsuranceBase)} 元</p>
                <p className="result-meta-subtext">含本人與 {result.dependentsCount} 位眷屬概估</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">勞退提繳級距</p>
                <p className="result-meta-value">{formatCurrency(result.pensionBase)} 元</p>
                <p className="result-meta-subtext">自提比率 {formatPercent(result.voluntaryRate, 0)}</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">勞保員工自付</p>
                <p className="result-breakdown-note">依 12.5% 總費率，勞工負擔 20%</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.workerLaborInsurance)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">健保員工自付</p>
                <p className="result-breakdown-note">費率 5.17%，眷屬人數上限先以 3 口估算</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.workerHealthInsurance)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">勞退自提</p>
                <p className="result-breakdown-note">依勞退提繳級距 {formatCurrency(result.pensionBase)} 元計算</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.voluntaryPension)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">雇主每月額外負擔</p>
                <p className="result-breakdown-note">含勞保、健保、職災保險與 6% 勞退提撥</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.employerTotalBurden)} 元</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}