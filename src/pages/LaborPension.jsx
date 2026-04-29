import { useState } from 'react'
import { calcLaborPension } from '../calculators/laborPension'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = {
  salary: '',
  voluntaryRate: '0',
  years: '30',
  annualReturnRate: '3',
}

export default function LaborPension() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    if (!form.salary || Number(form.salary) <= 0) {
      setError('請輸入月薪')
      return
    }
    setResult(calcLaborPension(form))
    setError('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">退休與長期累積</p>
        <h1 className="page-title">勞退提撥與累積試算</h1>
        <p className="page-subtitle">
          依《勞工退休金條例》與 115/01/01 生效月提繳分級表整理雇主 6% 提撥、自願提撥與長期複利結果。這裡是規劃工具，不是基金保證收益或正式核定金額。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">月薪（元）</label>
          <input
            type="number"
            className="input-field"
            placeholder="例：40000"
            value={form.salary}
            onChange={e => set('salary', e.target.value)}
          />
          <p className="fine-print mt-2">系統會自動依 115/01/01 生效官方月提繳分級表對應級距，方便快速試算。</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-200">
            自願提撥率（%）
            <span className="mt-1 block text-xs font-normal text-slate-400">0–6%，可抵扣所得稅</span>
          </label>
          <div className="flex gap-2">
            {['0', '1', '2', '3', '6'].map(v => (
              <button
                type="button"
                key={v}
                onClick={() => set('voluntaryRate', v)}
                className={form.voluntaryRate === v ? 'segmented-button segmented-button-active' : 'segmented-button'}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">試算年數</label>
            <select className="input-field" value={form.years} onChange={e => set('years', e.target.value)}>
              {[5, 10, 15, 20, 25, 30, 35, 40].map(y => (
                <option key={y} value={y}>{y} 年</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200">年化收益率</label>
            <select className="input-field" value={form.annualReturnRate} onChange={e => set('annualReturnRate', e.target.value)}>
              {[
                { v: '2', label: '2%（保守）' },
                { v: '3', label: '3%（穩健）' },
                { v: '5', label: '5%（積極）' },
                { v: '7', label: '7%（長期股市）' },
              ].map(({ v, label }) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-[22px] border border-amber-300/20 bg-amber-400/10 p-4 text-sm leading-7 text-amber-50/95">
          這裡的收益率是長期規劃假設，方便你比較不同提撥率與報酬情境，不代表勞退基金或個人帳戶一定會達成該報酬。
        </div>

        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button onClick={calculate} className="btn-primary">試算退休金</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <p className="page-eyebrow">試算結果</p>
          <h2 className="mt-3 text-2xl font-extrabold text-white">{form.years} 年後的估算累積</h2>

          <div className="metric-tile mb-4 mt-5 text-sm text-slate-300">
            適用月提繳工資級距：<span className="font-semibold text-white">{fmt(result.base)} 元</span>
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
              <span className="text-slate-300">雇主每月提撥（6%）</span>
              <span className="font-semibold text-white">{fmt(result.employerMonthly)} 元</span>
            </div>
            {result.voluntaryMonthly > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
                <span className="text-slate-300">自願提撥（{form.voluntaryRate}%）</span>
                <span className="font-semibold text-white">{fmt(result.voluntaryMonthly)} 元</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 border-b border-white/10 text-sm">
              <span className="text-slate-200 font-medium">每月合計提撥</span>
              <span className="font-bold text-white">{fmt(result.totalMonthly)} 元</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="metric-tile text-center">
              <p className="text-xs text-slate-400 mb-1">本金合計</p>
              <p className="text-lg font-bold text-white">{fmt(result.totalContributed)}</p>
              <p className="text-xs text-slate-500">元</p>
            </div>
            <div className="rounded-[22px] border border-emerald-300/20 bg-emerald-400/10 p-4 text-center">
              <p className="text-xs text-emerald-100/80 mb-1">試算收益</p>
              <p className="text-lg font-bold text-emerald-50">{fmt(result.earnings)}</p>
              <p className="text-xs text-emerald-100/60">元</p>
            </div>
          </div>

          <div className="result-card flex justify-between items-center">
            <span className="font-bold text-white">{form.years} 年後估算累積</span>
            <span className="text-2xl font-bold text-sky-100">{fmt(result.totalAccumulated)} 元</span>
          </div>

          <p className="fine-print mt-4">
            * 以月複利試算，實際提繳、分配與最低收益保障，仍以主管機關公告及實際帳戶結果為準。
          </p>
        </div>
      )}

      <div className="section-card">
        <p className="page-eyebrow">說明與邊界</p>
        <h2 className="mt-3 text-2xl font-extrabold text-white">這是一個規劃工具，不是保證收益承諾</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
          <div className="metric-tile">
            <p className="font-medium text-white mb-1">雇主強制提撥（6%）</p>
            <p>依法，雇主每月須按申報的月提繳工資提繳不低於 6% 至個人勞退帳戶，費用由雇主負擔，不從薪資扣除。</p>
          </div>
          <div className="metric-tile">
            <p className="font-medium text-white mb-1">自願提撥（最高 6%）</p>
            <p>勞工可依月提繳工資在 6% 範圍內自願提撥。自願提撥金額可全額列為當年度個人所得扣除額，但仍應以申報級距為準。</p>
          </div>
          <div className="metric-tile">
            <p className="font-medium text-white mb-1">何時可以領？</p>
            <p>年滿 60 歲，月領或一次領皆可。帳戶餘額是你的，換工作或失業不影響，雇主無法動用。</p>
          </div>
          <div className="metric-tile">
            <p className="font-medium text-white mb-1">自願提撥節稅試算</p>
            <p>假設月薪 4 萬，對應月提繳工資級距為 40,100 元，自願提撥 6% 時每月約 2,406 元，全年約 28,872 元可申報扣除。</p>
            <p>若適用 12% 稅率，約可節省 <span className="font-bold text-white">3,465 元</span> 所得稅。</p>
          </div>
          <div className="rounded-[22px] border border-amber-300/20 bg-amber-400/10 p-4">
            <p className="font-medium text-amber-100 mb-1">站內免責聲明</p>
            <p className="text-amber-50/90">
              站內已套用 115/01/01 生效官方級距表；但收益率仍屬規劃假設，目的是協助你比較提撥策略，而不是預測保證報酬。若你要作為退休規劃決策依據，建議再交叉比對官方試算工具與個人帳戶資料。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
