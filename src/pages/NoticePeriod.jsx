import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { formatDate, formatNumber } from '../utils/format'

function parseDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function diffInDays(startDate, endDate) {
  const start = parseDate(startDate)
  const end = parseDate(endDate)
  return Math.floor((end - start) / 86400000)
}

function addDays(dateString, days) {
  const date = parseDate(dateString)
  date.setDate(date.getDate() + days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getNoticeDays(serviceDays) {
  if (serviceDays < 90) return 0
  if (serviceDays < 365) return 10
  if (serviceDays < 1095) return 20
  return 30
}

const initialForm = {
  startDate: '',
  noticeDate: '',
  initiator: 'employee',
}

export default function NoticePeriod() {
  usePageMeta(
    '離職預告期計算',
    '依到職日與通知日估算預告天數、最後工作日與離職時程。',
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
    if (!form.startDate || !form.noticeDate) {
      setError('請先輸入到職日與通知日')
      return
    }

    const serviceDays = diffInDays(form.startDate, form.noticeDate)
    if (Number.isNaN(serviceDays) || serviceDays < 0) {
      setError('通知日不得早於到職日')
      return
    }

    const noticeDays = getNoticeDays(serviceDays)
    const earliestLastDay = addDays(form.noticeDate, noticeDays)

    setResult({
      serviceDays,
      noticeDays,
      earliestLastDay,
      initiator: form.initiator,
    })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">離職權益</p>
        <h1 className="page-title">離職預告期計算</h1>
        <p className="page-subtitle">
          先把預告天數和最早離職日抓出來，避免提離職或收到通知後，才發現時程安排錯誤。
          固定期限契約、試用爭議或即時解僱等特殊情況，仍要另外人工判斷。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">由誰提出</label>
          <div className="flex gap-2">
            {[{ value: 'employee', label: '勞工提出離職' }, { value: 'employer', label: '雇主提出終止' }].map((item) => (
              <button
                key={item.value}
                type="button"
                className={form.initiator === item.value ? 'segmented-button segmented-button-active' : 'segmented-button'}
                onClick={() => set('initiator', item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">到職日</label>
            <input
              type="date"
              className="input-field"
              value={form.startDate}
              onChange={(event) => set('startDate', event.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">通知日</label>
            <input
              type="date"
              className="input-field"
              value={form.noticeDate}
              onChange={(event) => set('noticeDate', event.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>計算預告期間</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">預告期結果</p>
            <div className="result-hero-value-row">
              <span className="result-hero-value">{result.noticeDays}</span>
              <span className="result-hero-unit">天</span>
            </div>
            <p className="result-hero-note">
              以目前輸入的年資概算，{result.initiator === 'employee' ? '你至少應提前這麼多天告知雇主。' : '雇主若要依一般預告程序終止，通常至少要提前這麼多天通知。'}
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">累計年資</p>
                <p className="result-meta-value">{formatNumber(result.serviceDays / 365, 2)} 年</p>
                <p className="result-meta-subtext">約 {formatNumber(result.serviceDays / 30, 1)} 個月</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">通知日</p>
                <p className="result-meta-value">{formatDate(form.noticeDate)}</p>
                <p className="result-meta-subtext">預告期通常自通知後起算</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">最早離職日</p>
                <p className="result-meta-value">{formatDate(result.earliestLastDay)}</p>
                <p className="result-meta-subtext">仍應扣回實際排班、交接與雙方協議</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">未滿 3 個月</p>
                <p className="result-breakdown-note">通常沒有固定 10 / 20 / 30 天口徑，但仍建議保留書面紀錄</p>
              </div>
              <span className="result-breakdown-value">0 天</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">3 個月以上未滿 1 年</p>
                <p className="result-breakdown-note">常見預告期間</p>
              </div>
              <span className="result-breakdown-value">10 天</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">1 年以上未滿 3 年</p>
                <p className="result-breakdown-note">常見預告期間</p>
              </div>
              <span className="result-breakdown-value">20 天</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">3 年以上</p>
                <p className="result-breakdown-note">常見預告期間</p>
              </div>
              <span className="result-breakdown-value">30 天</span>
            </div>
          </div>
        </section>
      )}

      <section className="section-card">
        <p className="page-eyebrow">延伸判讀</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">預告期算完後，最常接著卡住的是這兩題</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            to="/exit-handover-guide"
            className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">交接時序</p>
            <h3 className="mt-3 text-xl font-extrabold text-slate-950">離職交接與最後工作日懶人包</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">很多人預告期算完，下一步就卡在最後工作日、交接清單、離職文件與薪資結清怎麼排。</p>
            <p className="mt-4 text-sm font-semibold text-sky-700">前往離職交接懶人包 →</p>
          </Link>
          <Link
            to="/unemployment-benefits-guide"
            className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">非自願離職文件</p>
            <h3 className="mt-3 text-xl font-extrabold text-slate-950">失業給付與非自願離職文件懶人包</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">如果這次不是自請離職，而是資遣或非自願離職，接著就要看文件名稱、申請時程和失業給付怎麼接。</p>
            <p className="mt-4 text-sm font-semibold text-sky-700">前往失業給付懶人包 →</p>
          </Link>
        </div>
      </section>
    </div>
  )
}