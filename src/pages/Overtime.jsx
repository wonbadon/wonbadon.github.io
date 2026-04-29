import { useState } from 'react'
import { calcOvertimeSummary } from '../calculators/overtime'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = {
  salaryType: 'monthly',
  monthlySalary: '',
  hourlyRateInput: '',
  weekdayHours: '',
  restDayHours: '',
  holidayHours: '',
}

export default function Overtime() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const payNote = form.salaryType === 'monthly'
    ? '月薪制結果顯示本次應另補發的金額；既有月薪本身不重複列入。'
    : '時薪制結果顯示本次出勤依法應給金額；國定假日 / 休假日 8 小時內按出勤時數加倍計算。'

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    const salary = form.salaryType === 'monthly' ? Number(form.monthlySalary) : Number(form.hourlyRateInput)
    if (!salary || salary <= 0) {
      setError('請輸入正確的薪資')
      return
    }
    const totalHours = Number(form.weekdayHours || 0) + Number(form.restDayHours || 0) + Number(form.holidayHours || 0)
    if (totalHours <= 0) {
      setError('請至少輸入一種加班時數')
      return
    }
    setResult(calcOvertimeSummary(form))
    setError('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工資與工時</p>
        <h1 className="page-title">加班與假日出勤試算</h1>
        <p className="page-subtitle">
          依《勞動基準法》第24條、第39條與主管機關公開說明整理。
          一般例假日原則不得要求出勤；若屬天災、事變或突發事件停止假期，應另依第40條補假與通報規定處理。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="rounded-[22px] border border-amber-300/20 bg-amber-400/10 p-4">
          <p className="text-sm font-semibold text-amber-100">先分清楚假別，才會有正確金額</p>
          <p className="mt-2 text-sm leading-7 text-amber-50/90">
            這頁提供平日延長工時、休息日出勤，以及國定假日 / 休假日出勤試算。
            一般例假日不是常態加班場景，因此沒有與國定假日混在一起計算。
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">薪資類型</label>
          <div className="flex gap-2">
            {[{ v: 'monthly', label: '月薪制' }, { v: 'hourly', label: '時薪制' }].map(({ v, label }) => (
              <button
                type="button"
                key={v}
                onClick={() => set('salaryType', v)}
                className={form.salaryType === v ? 'segmented-button segmented-button-active' : 'segmented-button'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {form.salaryType === 'monthly' ? (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">月薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：32000"
              value={form.monthlySalary}
              onChange={e => set('monthlySalary', e.target.value)}
            />
            <p className="fine-print mt-2">時薪換算公式：月薪 ÷ 30 ÷ 8。</p>
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">時薪（元）</label>
            <input
              type="number"
              className="input-field"
              placeholder="例：196（2026 年法定最低時薪）"
              value={form.hourlyRateInput}
              onChange={e => set('hourlyRateInput', e.target.value)}
            />
            <p className="fine-print mt-2">2026 年起法定最低工資為月薪 29,500 元、時薪 196 元。</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              平日延長工時（小時）
              <span className="mt-1 block text-xs font-normal text-slate-400">前 2h × 1.33 / 第 3h 起 × 1.67</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：2"
              min="0"
              max="12"
              value={form.weekdayHours}
              onChange={e => set('weekdayHours', e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              休息日出勤（小時）
              <span className="mt-1 block text-xs font-normal text-slate-400">前 2h × 1.33 / 3-8h × 1.67 / 第 9h 起 × 2.67</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：8"
              min="0"
              max="12"
              value={form.restDayHours}
              onChange={e => set('restDayHours', e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">
              國定假日 / 休假日出勤（小時）
              <span className="mt-1 block text-xs font-normal text-slate-400">月薪制 8h 內加發 1 日工資；超過 8h 再依第24條加成</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：8"
              min="0"
              max="12"
              value={form.holidayHours}
              onChange={e => set('holidayHours', e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <button onClick={calculate} className="btn-primary">計算應給金額</button>
      </div>

      {result && (
        <div className="section-card">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="page-eyebrow">試算結果</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">本次依法應給金額</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-300">{payNote}</p>
          </div>

          <div className="metric-tile mb-4 text-sm text-slate-300">
            適用時薪：<span className="font-semibold text-white">{fmt(result.hourlyRate)} 元</span>
          </div>

          <div className="mb-5 space-y-3">
            {result.weekdayPay > 0 && (
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-sm text-slate-300">平日延長工時（{form.weekdayHours} 小時）</span>
                <span className="font-semibold text-white">{fmt(result.weekdayPay)} 元</span>
              </div>
            )}
            {result.restDayPay > 0 && (
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-sm text-slate-300">休息日出勤（{form.restDayHours} 小時）</span>
                <span className="font-semibold text-white">{fmt(result.restDayPay)} 元</span>
              </div>
            )}
            {result.holidayPay > 0 && (
              <div className="flex items-center justify-between border-b border-white/10 py-3">
                <span className="text-sm text-slate-300">國定假日 / 休假日出勤（{form.holidayHours} 小時）</span>
                <span className="font-semibold text-white">{fmt(result.holidayPay)} 元</span>
              </div>
            )}
          </div>

          <div className="result-card flex justify-between items-center">
            <span className="font-bold text-white">本次應給合計</span>
            <span className="text-2xl font-bold text-sky-100">{fmt(result.total)} 元</span>
          </div>

          <p className="fine-print mt-4">
            * 一般例假日原則不得要求出勤；若屬天災、事變或突發事件停止假期，仍須補假並依法通報。
          </p>
        </div>
      )}

      <div className="section-card mt-6">
        <p className="page-eyebrow">計算原理</p>
        <h2 className="mt-3 text-2xl font-extrabold text-white">三種出勤情境，三種不同口徑</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
          <div className="metric-tile">
            <p className="mb-1 font-medium text-white">月薪換算時薪</p>
            <p>時薪 = 月薪 ÷ 30（天）÷ 8（小時）</p>
          </div>
          <div className="metric-tile">
            <p className="mb-1 font-medium text-white">平日延長工時（勞基法第24條）</p>
            <p>前 2 小時：時薪 × 4/3</p>
            <p>第 3 小時起：時薪 × 5/3</p>
          </div>
          <div className="metric-tile">
            <p className="mb-1 font-medium text-white">休息日出勤（勞基法第24條第2項）</p>
            <p>前 2 小時：時薪 × 4/3</p>
            <p>第 3 至 8 小時：時薪 × 5/3</p>
            <p>第 9 小時起：時薪 × 8/3</p>
          </div>
          <div className="metric-tile">
            <p className="mb-1 font-medium text-white">國定假日 / 休假日（勞基法第39條）</p>
            <p>月薪制：8 小時內另加發 1 日工資；超過 8 小時再依第24條加成。</p>
            <p>時薪制：8 小時內按出勤時數加倍給付；超過 8 小時再依第24條加成。</p>
          </div>
          <div className="rounded-[22px] border border-rose-300/20 bg-rose-400/10 p-4">
            <p className="mb-1 font-medium text-rose-100">一般例假日不是常態加班欄位</p>
            <p className="text-rose-50/90">
              一般例假日原則不得要求出勤。若是天災、事變或突發事件停止假期，才會進入第40條的加倍發給與補假規則。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
