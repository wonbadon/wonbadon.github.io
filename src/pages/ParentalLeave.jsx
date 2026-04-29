import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatNumber } from '../utils/format'

const EVENT_OPTIONS = [
  { value: 'maternity', label: '分娩產假' },
  { value: 'miscarriageOver3Months', label: '妊娠滿 3 個月流產' },
  { value: 'miscarriage2To3Months', label: '妊娠 2 到 3 個月流產' },
  { value: 'miscarriageUnder2Months', label: '妊娠未滿 2 個月流產' },
  { value: 'paternity', label: '陪產檢及陪產假' },
  { value: 'parentalLeave', label: '育嬰留停津貼' },
]

const initialForm = {
  eventType: 'maternity',
  monthlySalary: '',
  insuredSalary: '',
  serviceMonths: '12',
  childrenCount: '1',
  leaveMonths: '6',
  eligibleEmploymentInsurance: 'yes',
}

function getLeaveDays(eventType) {
  switch (eventType) {
    case 'maternity':
      return 56
    case 'miscarriageOver3Months':
      return 28
    case 'miscarriage2To3Months':
      return 7
    case 'miscarriageUnder2Months':
      return 5
    case 'paternity':
      return 7
    default:
      return 0
  }
}

export default function ParentalLeave() {
  usePageMeta(
    '產假育嬰假計算',
    '整理產假、陪產檢及陪產假、勞保生育給付與育嬰留停津貼，協助快速抓出天數與金額。',
  )

  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const isParentalLeave = form.eventType === 'parentalLeave'

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setError('')
  }

  function calculate() {
    const monthlySalary = Number(form.monthlySalary) || 0
    const insuredSalary = Number(form.insuredSalary) || monthlySalary
    const serviceMonths = Number(form.serviceMonths) || 0
    const childrenCount = Math.max(1, Number(form.childrenCount) || 1)

    if (insuredSalary <= 0) {
      setError('請至少輸入可用的投保薪資')
      return
    }

    if (!isParentalLeave && monthlySalary <= 0) {
      setError('請輸入月薪，才能估算雇主給薪')
      return
    }

    if (isParentalLeave) {
      const requestedMonths = Math.max(0, Math.min(24, Number(form.leaveMonths) || 0))
      const payableMonths = form.eligibleEmploymentInsurance === 'yes' ? Math.min(6, requestedMonths) : 0
      const allowance = insuredSalary * 0.8 * payableMonths

      setResult({
        type: 'parentalLeave',
        requestedMonths,
        payableMonths,
        allowance,
        insuredSalary,
      })
      return
    }

    const leaveDays = getLeaveDays(form.eventType)
    const payRatio = serviceMonths >= 6 ? 1 : 0.5
    const employerPay = monthlySalary / 30 * leaveDays * payRatio
    const maternityBenefitDays = form.eventType === 'maternity' ? 60 + Math.max(0, childrenCount - 1) * 30 : 0
    const laborInsuranceBenefit = insuredSalary / 30 * maternityBenefitDays

    setResult({
      type: form.eventType,
      leaveDays,
      employerPay,
      payRatio,
      insuredSalary,
      laborInsuranceBenefit,
      maternityBenefitDays,
      childrenCount,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">假勤權益</p>
        <h1 className="page-title">產假育嬰假計算</h1>
        <p className="page-subtitle">
          這頁把雇主應給的假別薪資、勞保生育給付與育嬰留停津貼拆開顯示，避免把不同制度混成一個總額。
          陪產檢及陪產假目前以 7 日全薪整理，育嬰留停津貼則以最常見的整月請領 80% 試算。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">試算項目</label>
          <select
            className="input-field"
            value={form.eventType}
            onChange={(event) => set('eventType', event.target.value)}
          >
            {EVENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">月薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：42000"
              value={form.monthlySalary}
              onChange={(event) => set('monthlySalary', event.target.value)}
            />
            <p className="fine-print mt-2">產假、流產假與陪產檢及陪產假時，用來估算雇主給薪。</p>
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
            <p className="fine-print mt-2">勞保生育給付與育嬰留停津貼以投保薪資為主。</p>
          </div>
        </div>

        {!isParentalLeave && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">到職月數</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={form.serviceMonths}
                onChange={(event) => set('serviceMonths', event.target.value)}
              />
              <p className="fine-print mt-2">勞基法產假在受僱滿 6 個月以上時，原則上工資照給。</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">子女數</label>
              <input
                type="number"
                min="1"
                className="input-field"
                value={form.childrenCount}
                onChange={(event) => set('childrenCount', event.target.value)}
              />
              <p className="fine-print mt-2">勞保生育給付以 60 日為基礎，每多一胎再加 30 日。</p>
            </div>
          </div>
        )}

        {isParentalLeave && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">預計請領月數</label>
              <input
                type="number"
                min="0"
                max="24"
                className="input-field"
                value={form.leaveMonths}
                onChange={(event) => set('leaveMonths', event.target.value)}
              />
              <p className="fine-print mt-2">每一子女最長得請至子女滿 3 歲前，本站津貼先試算前 6 個月。</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">就保年資是否滿 1 年</label>
              <div className="flex gap-2">
                {[{ value: 'yes', label: '是' }, { value: 'no', label: '否' }].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={form.eligibleEmploymentInsurance === item.value ? 'segmented-button segmented-button-active' : 'segmented-button'}
                    onClick={() => set('eligibleEmploymentInsurance', item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>開始試算</button>
      </div>

      {result && (
        <section className="section-card">
          <div className={result.type === 'parentalLeave' ? 'result-hero result-hero-warning' : 'result-hero'}>
            <p className="result-hero-label">主要結果</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{result.type === 'parentalLeave' ? result.requestedMonths : result.leaveDays}</span>
              <span className="result-hero-unit">{result.type === 'parentalLeave' ? '個月' : '天'}</span>
            </div>
            <p className="result-hero-note">
              {result.type === 'parentalLeave'
                ? '育嬰留停本身是留職停薪，本站把法定天數與可請領的津貼金額分開顯示。'
                : '產假、流產假與陪產檢及陪產假屬不同制度；勞保生育給付也不是每一種假別都會發給。'}
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              {result.type === 'parentalLeave' ? (
                <>
                  <div className="result-meta-card">
                    <p className="result-meta-label">投保薪資</p>
                    <p className="result-meta-value">{formatCurrency(result.insuredSalary)} 元</p>
                    <p className="result-meta-subtext">80% 津貼以此為基礎</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">可請領月數</p>
                    <p className="result-meta-value">{result.payableMonths} 個月</p>
                    <p className="result-meta-subtext">本頁先以最常見的 6 個月津貼上限整理</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">津貼概算</p>
                    <p className="result-meta-value">{formatCurrency(result.allowance)} 元</p>
                    <p className="result-meta-subtext">就保 60% + 政府加碼 20%</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="result-meta-card">
                    <p className="result-meta-label">雇主給薪概算</p>
                    <p className="result-meta-value">{formatCurrency(result.employerPay)} 元</p>
                    <p className="result-meta-subtext">受僱 {formatNumber(result.payRatio * 100, 0)}% 給薪口徑估算</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">勞保生育給付</p>
                    <p className="result-meta-value">{formatCurrency(result.laborInsuranceBenefit)} 元</p>
                    <p className="result-meta-subtext">只有分娩產假情境才會列入</p>
                  </div>
                  <div className="result-meta-card">
                    <p className="result-meta-label">生育給付日數</p>
                    <p className="result-meta-value">{result.maternityBenefitDays || 0} 日</p>
                    <p className="result-meta-subtext">第 2 胎起每多一胎再加 30 日</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}