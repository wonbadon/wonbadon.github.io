import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatNumber } from '../utils/format'

const initialForm = {
  mode: 'monthly',
  amount: '',
  dailyHours: '8',
  monthlyWorkDays: '22',
}

export default function WageConverter() {
  usePageMeta(
    '時薪月薪換算',
    '把月薪、時薪、日薪與年薪互相換算，分清楚法定換算與工作日估算。',
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
    const amount = Number(form.amount)
    const dailyHours = Number(form.dailyHours) || 8
    const monthlyWorkDays = Number(form.monthlyWorkDays) || 22

    if (!amount || amount <= 0) {
      setError('請輸入正確的金額')
      return
    }

    if (form.mode === 'monthly') {
      const legalDaily = amount / 30
      const legalHourly = amount / 30 / 8

      setResult({
        mode: 'monthly',
        amount,
        legalDaily,
        legalHourly,
        annualSalary: amount * 12,
      })
      return
    }

    const monthlyBy30Days = amount * 8 * 30
    const monthlyByWorkDays = amount * dailyHours * monthlyWorkDays

    setResult({
      mode: 'hourly',
      amount,
      dailyHours,
      monthlyWorkDays,
      dailySalary: amount * dailyHours,
      monthlyBy30Days,
      monthlyByWorkDays,
      annualByWorkDays: monthlyByWorkDays * 12,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">保費與薪資</p>
        <h1 className="page-title">時薪月薪換算</h1>
        <p className="page-subtitle">
          如果你在面試、排班或兼職情境中一直在來回換算薪資，這頁會把法定月薪換時薪，以及常見工作日估算分開列給你看。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">換算方向</label>
          <div className="flex gap-2">
            {[{ value: 'monthly', label: '月薪轉時薪' }, { value: 'hourly', label: '時薪轉月薪' }].map((item) => (
              <button
                key={item.value}
                type="button"
                className={form.mode === item.value ? 'segmented-button segmented-button-active' : 'segmented-button'}
                onClick={() => set('mode', item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">{form.mode === 'monthly' ? '月薪（元）' : '時薪（元）'}</label>
          <input
            type="number"
            className="input-field"
            value={form.amount}
            placeholder={form.mode === 'monthly' ? '例：36000' : '例：220'}
            onChange={(event) => set('amount', event.target.value)}
          />
        </div>

        {form.mode === 'hourly' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">每日工時</label>
              <input
                type="number"
                min="1"
                max="12"
                className="input-field"
                value={form.dailyHours}
                onChange={(event) => set('dailyHours', event.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">每月工作日數</label>
              <input
                type="number"
                min="1"
                max="31"
                className="input-field"
                value={form.monthlyWorkDays}
                onChange={(event) => set('monthlyWorkDays', event.target.value)}
              />
            </div>
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>開始換算</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">換算結果</p>
            <div className="result-meta-grid md:grid-cols-3">
              {result.mode === 'monthly' ? (
                <>
                  <div className="result-meta-card">
                    <p className="result-meta-label">法定日薪</p>
                    <p className="result-meta-value">{formatCurrency(result.legalDaily)} 元</p>
                    <p className="result-meta-subtext">月薪 ÷ 30</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">法定時薪</p>
                    <p className="result-meta-value">{formatCurrency(result.legalHourly)} 元</p>
                    <p className="result-meta-subtext">月薪 ÷ 30 ÷ 8</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">年薪底薪</p>
                    <p className="result-meta-value">{formatCurrency(result.annualSalary)} 元</p>
                    <p className="result-meta-subtext">不含年終、津貼與加班費</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="result-meta-card">
                    <p className="result-meta-label">日薪</p>
                    <p className="result-meta-value">{formatCurrency(result.dailySalary)} 元</p>
                    <p className="result-meta-subtext">時薪 × {formatNumber(result.dailyHours)} 小時</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">30 日制月薪</p>
                    <p className="result-meta-value">{formatCurrency(result.monthlyBy30Days)} 元</p>
                    <p className="result-meta-subtext">時薪 × 8 × 30</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">工作日月估</p>
                    <p className="result-meta-value">{formatCurrency(result.monthlyByWorkDays)} 元</p>
                    <p className="result-meta-subtext">以 {formatNumber(result.monthlyWorkDays)} 個工作日估算</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {result.mode === 'hourly' && (
            <div className="result-breakdown">
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">年薪底薪估算</p>
                  <p className="result-breakdown-note">依你輸入的每日工時與每月工作日數推估</p>
                </div>
                <span className="result-breakdown-value">{formatCurrency(result.annualByWorkDays)} 元</span>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  )
}