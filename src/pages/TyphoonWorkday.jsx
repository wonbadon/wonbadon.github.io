import { useState } from 'react'
import {
  calcHolidayOvertime,
  calcHourlyRate,
  calcRestDayOvertime,
} from '../calculators/overtime'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatNumber } from '../utils/format'

const initialForm = {
  salaryType: 'monthly',
  monthlySalary: '',
  hourlyRate: '',
  status: 'worked',
  dayType: 'scheduled',
  workedHours: '8',
  extraMultiplier: '1',
}

export default function TyphoonWorkday() {
  usePageMeta(
    '颱風假薪資計算機',
    '先分清楚有無出勤與工作日類型，再判斷颱風天的法定最低給付與公司額外加碼。',
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
    const hourlyRate = form.salaryType === 'monthly'
      ? calcHourlyRate(Number(form.monthlySalary))
      : Number(form.hourlyRate)
    const workedHours = Math.max(0, Number(form.workedHours) || 0)
    const extraMultiplier = Math.max(1, Number(form.extraMultiplier) || 1)

    if (!hourlyRate || hourlyRate <= 0) {
      setError('請輸入正確的薪資')
      return
    }

    let legalMinimum = 0
    let note = '颱風停班停課本身不是法定雙倍薪，關鍵在於你有沒有出勤、以及那天原本是哪種工作日。'

    if (form.status === 'worked') {
      if (form.dayType === 'scheduled') {
        legalMinimum = form.salaryType === 'monthly' ? 0 : hourlyRate * workedHours
        note = form.salaryType === 'monthly'
          ? '月薪制在原排班工作日出勤，通常不會因為颱風天自動多一倍；是否加發要看公司規定。'
          : '時薪制在原排班工作日出勤，至少要給實際工時薪資。'
      }

      if (form.dayType === 'rest') {
        legalMinimum = calcRestDayOvertime(hourlyRate, workedHours)
        note = '如果颱風天剛好是休息日，而且你實際出勤，仍回到休息日出勤加班費規則。'
      }

      if (form.dayType === 'holiday') {
        legalMinimum = calcHolidayOvertime(hourlyRate, workedHours, form.salaryType)
        note = '如果颱風天剛好是國定假日或休假日，應回到該假別的法定給薪方式。'
      }
    } else {
      note = '勞動部指引多半採「宜不扣薪」與「不得不利處分」的方向，但法律上未必當然形成固定雙倍薪或必給全薪。'
    }

    const companyExtra = form.status === 'worked'
      ? hourlyRate * workedHours * (extraMultiplier - 1)
      : 0

    setResult({
      legalMinimum,
      companyExtra,
      total: legalMinimum + companyExtra,
      note,
      hourlyRate,
      workedHours,
      extraMultiplier,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工時計算</p>
        <h1 className="page-title">颱風假薪資計算機</h1>
        <p className="page-subtitle">
          颱風假最常見的錯誤，就是把它直接當成「一定雙倍」或「一定可以扣薪」。這頁先把有沒有出勤、那天原本是哪種工作日分開判斷。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">薪資類型</label>
            <div className="flex gap-2">
              {[{ value: 'monthly', label: '月薪制' }, { value: 'hourly', label: '時薪制' }].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={form.salaryType === item.value ? 'segmented-button segmented-button-active' : 'segmented-button'}
                  onClick={() => set('salaryType', item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">{form.salaryType === 'monthly' ? '月薪（元）' : '時薪（元）'}</label>
            <input
              type="number"
              className="input-field"
              value={form.salaryType === 'monthly' ? form.monthlySalary : form.hourlyRate}
              onChange={(event) => set(form.salaryType === 'monthly' ? 'monthlySalary' : 'hourlyRate', event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">當天狀態</label>
            <select className="input-field" value={form.status} onChange={(event) => set('status', event.target.value)}>
              <option value="worked">有出勤</option>
              <option value="notWorked">未出勤</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">原本是哪種工作日</label>
            <select className="input-field" value={form.dayType} onChange={(event) => set('dayType', event.target.value)}>
              <option value="scheduled">原排班工作日</option>
              <option value="rest">休息日</option>
              <option value="holiday">國定假日 / 休假日</option>
            </select>
          </div>
        </div>

        {form.status === 'worked' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">實際出勤時數</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={form.workedHours}
                onChange={(event) => set('workedHours', event.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">公司額外加發倍率</label>
              <input
                type="number"
                min="1"
                step="0.1"
                className="input-field"
                value={form.extraMultiplier}
                onChange={(event) => set('extraMultiplier', event.target.value)}
              />
              <p className="fine-print mt-2">例如公司承諾多給 1.5 倍，就填 1.5。</p>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>計算颱風天給付</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero result-hero-warning">
            <p className="result-hero-label">法定最低給付</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{formatCurrency(result.legalMinimum)}</span>
              <span className="result-hero-unit">元</span>
            </div>
            <p className="result-hero-note">{result.note}</p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">換算時薪</p>
                <p className="result-meta-value">{formatCurrency(result.hourlyRate)} 元</p>
                <p className="result-meta-subtext">月薪制依月薪 ÷ 30 ÷ 8 換算</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">公司額外加碼</p>
                <p className="result-meta-value">{formatCurrency(result.companyExtra)} 元</p>
                <p className="result-meta-subtext">倍率 {formatNumber(result.extraMultiplier, 1)} 倍</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">合計參考</p>
                <p className="result-meta-value">{formatCurrency(result.total)} 元</p>
                <p className="result-meta-subtext">把法定最低給付與公司自訂加碼加總後的參考值</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}