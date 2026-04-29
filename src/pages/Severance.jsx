import { useState } from 'react'
import { calcSeverance } from '../calculators/severance'
import usePageMeta from '../hooks/usePageMeta'

const fmt = (n) => Math.round(n).toLocaleString('zh-TW')

const initialForm = { avgSalary: '', yearsNew: '', yearsOld: '' }

export default function Severance() {
  usePageMeta(
    '資遣費計算機',
    '依平均工資與新舊制年資，試算勞基法與勞退條例下的資遣費金額。',
  )

  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const totalYears = Number(form.yearsNew || 0) + Number(form.yearsOld || 0)

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
    setError('')
  }

  function calculate() {
    if (!form.avgSalary || Number(form.avgSalary) <= 0) {
      setError('請輸入平均工資')
      return
    }
    if (totalYears <= 0) {
      setError('請輸入年資（至少填寫一種制度）')
      return
    }
    setResult(calcSeverance(form))
    setError('')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">離職與補償</p>
        <h1 className="page-title">資遣費新舊制拆算</h1>
        <p className="page-subtitle">
          依《勞動基準法》第17條、《勞工退休金條例》第12條與平均工資定義試算。這頁只處理資遣費，不等同預告工資、非自願離職證明或失業給付資格審查。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            一個月平均工資（元）
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="例：40000"
            value={form.avgSalary}
            onChange={e => set('avgSalary', e.target.value)}
          />
          <p className="fine-print mt-2">本工具不代算平均工資本身。請先依勞基法第2條第4款確認口徑：原則上是事由發生前 6 個月工資總額除以該期間總日數；工作未滿 6 個月者則按實際工作期間計算。</p>
        </div>

        <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-4">
          <p className="mb-1 text-sm font-medium text-sky-800">如何區分新舊制？</p>
          <p className="text-sm leading-7 text-slate-700">
            2005年7月1日前的年資屬「舊制」；2005年7月1日後的年資屬「新制」。
            若你是 2005年後才入職，全部填新制即可。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              新制年資（年）
              <span className="mt-1 block text-xs font-normal text-slate-400">2005/7/1 後</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：5.5"
              min="0"
              step="0.1"
              value={form.yearsNew}
              onChange={e => set('yearsNew', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              舊制年資（年）
              <span className="mt-1 block text-xs font-normal text-slate-400">2005/7/1 前</span>
            </label>
            <input
              type="number"
              className="input-field"
              placeholder="例：3"
              min="0"
              step="0.1"
              value={form.yearsOld}
              onChange={e => set('yearsOld', e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-700">
          本工具以「年資小數」比例試算，並假設你輸入的是已確認的一個月平均工資。若有未滿 1 個月進位、停職期間是否計入、或平均工資認定爭議，請再人工確認。
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button onClick={calculate} className="btn-primary">計算資遣費</button>
      </div>

      {result && (
        <div className="section-card mb-6">
          <p className="page-eyebrow">試算結果</p>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-950">資遣費估算</h2>

          <div className="result-hero mt-5">
            <p className="result-hero-label">資遣費合計</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{fmt(result.total)}</span>
              <span className="result-hero-unit">元</span>
            </div>
            <p className="result-hero-note">
              本結果只含資遣費本身，不含預告工資、未休特休結清、謀職假工資與其他補償項目。
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">平均工資</p>
                <p className="result-meta-value">{fmt(Number(form.avgSalary))} 元</p>
                <p className="result-meta-subtext">請先按法定口徑人工確認</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">新制月數</p>
                <p className="result-meta-value">{result.newMonths.toFixed(1)} 個月</p>
                <p className="result-meta-subtext">
                  {Number(form.yearsNew || 0) > 0 ? `${form.yearsNew} 年 × 0.5 月（上限 6 月）` : '未填新制年資'}
                </p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">舊制月數</p>
                <p className="result-meta-value">{result.oldMonths.toFixed(1)} 個月</p>
                <p className="result-meta-subtext">
                  {Number(form.yearsOld || 0) > 0 ? `${form.yearsOld} 年 × 1 月` : '未填舊制年資'}
                </p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            {result.newSystemPay > 0 && (
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">新制資遣費</p>
                  <p className="result-breakdown-note">{form.yearsNew} 年 × 0.5 月 = {result.newMonths.toFixed(1)} 個月平均工資（上限 6 月）</p>
                </div>
                <span className="result-breakdown-value">{fmt(result.newSystemPay)} 元</span>
              </div>
            )}
            {result.oldSystemPay > 0 && (
              <div className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">舊制資遣費</p>
                  <p className="result-breakdown-note">{form.yearsOld} 年 × 1 月 = {result.oldMonths.toFixed(1)} 個月平均工資</p>
                </div>
                <span className="result-breakdown-value">{fmt(result.oldSystemPay)} 元</span>
              </div>
            )}
          </div>

          <p className="fine-print mt-4">
            * 新制年資最高以 6 個月平均工資為限；舊制依實際年資比例計算。本結果不含預告工資、未休特休結清與其他補償項目。
          </p>
        </div>
      )}

      <div className="section-card">
        <p className="page-eyebrow">計算說明</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">新舊制不要混在一起看</h2>
        <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
          <div className="metric-tile">
            <p className="mb-1 font-medium text-slate-950">勞退新制（2005/7/1後年資）</p>
            <p>資遣費 = 年資 × <span className="font-semibold">1/2</span> 個月平均工資</p>
            <p className="mt-2 text-xs text-slate-400">上限：6 個月平均工資</p>
          </div>
          <div className="metric-tile">
            <p className="mb-1 font-medium text-slate-950">勞退舊制（2005/7/1前年資）</p>
            <p>資遣費 = 年資 × <span className="font-semibold">1</span> 個月平均工資</p>
            <p className="mt-2 text-xs text-slate-400">依實際年資比例計算，不與新制共用 6 個月上限。</p>
          </div>
          <div className="metric-tile">
            <p className="mb-1 font-medium text-slate-950">什麼情況可以領資遣費？</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>雇主縮減業務、虧損停業</li>
              <li>業務性質變更，勞工不願調職</li>
              <li>不可抗力暫停工作逾3個月</li>
              <li>大量解僱情形</li>
            </ul>
          </div>
          <div className="rounded-[22px] border border-rose-200 bg-rose-50 p-4">
            <p className="mb-1 font-medium text-rose-800">自願離職、重大過失免給資遣費</p>
            <p className="text-rose-700">勞工主動辭職，或因嚴重違規遭雇主依規定解僱時，通常不會有資遣費。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
