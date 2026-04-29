import { useState } from 'react'
import { compareOffers } from '../calculators/offerCompare'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency, formatNumber } from '../utils/format'

const initialOffer = {
  name: '',
  monthlySalary: '',
  bonusMonths: '1',
  monthlyAllowance: '0',
  overtimeHours: '0',
  annualLeaveDays: '0',
  commuteMinutes: '30',
}

function OfferForm({ title, offer, onChange }) {
  return (
    <div className="section-card space-y-4">
      <div>
        <p className="page-eyebrow">{title}</p>
        <input
          type="text"
          className="input-field mt-3"
          placeholder={`${title} 名稱`}
          value={offer.name}
          onChange={(event) => onChange('name', event.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input type="number" className="input-field" placeholder="月薪" value={offer.monthlySalary} onChange={(event) => onChange('monthlySalary', event.target.value)} />
        <input type="number" className="input-field" placeholder="年終月數" value={offer.bonusMonths} onChange={(event) => onChange('bonusMonths', event.target.value)} />
        <input type="number" className="input-field" placeholder="每月固定津貼" value={offer.monthlyAllowance} onChange={(event) => onChange('monthlyAllowance', event.target.value)} />
        <input type="number" className="input-field" placeholder="每月平均加班小時" value={offer.overtimeHours} onChange={(event) => onChange('overtimeHours', event.target.value)} />
        <input type="number" className="input-field" placeholder="一年特休天數" value={offer.annualLeaveDays} onChange={(event) => onChange('annualLeaveDays', event.target.value)} />
        <input type="number" className="input-field" placeholder="單趟通勤分鐘" value={offer.commuteMinutes} onChange={(event) => onChange('commuteMinutes', event.target.value)} />
      </div>
    </div>
  )
}

export default function SalaryCompare() {
  usePageMeta(
    '薪資比較器',
    '把兩份工作的年現金、假期價值、通勤與有效時薪放在同一個版面比較。',
  )

  const [offerA, setOfferA] = useState({ ...initialOffer, name: 'Offer A' })
  const [offerB, setOfferB] = useState({ ...initialOffer, name: 'Offer B' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function setOffer(which, key, value) {
    if (which === 'A') {
      setOfferA((prev) => ({ ...prev, [key]: value }))
    } else {
      setOfferB((prev) => ({ ...prev, [key]: value }))
    }
    setResult(null)
    setError('')
  }

  function calculate() {
    if (!Number(offerA.monthlySalary) || !Number(offerB.monthlySalary)) {
      setError('兩份工作都至少要輸入月薪')
      return
    }

    setResult(compareOffers(offerA, offerB))
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">薪酬估算</p>
        <h1 className="page-title">薪資比較器</h1>
        <p className="page-subtitle">
          單看月薪很容易失真。這頁把年終、津貼、加班、特休與通勤一起攤開，讓兩份工作機會可以用同一個口徑比較。
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <OfferForm title="工作 A" offer={offerA} onChange={(key, value) => setOffer('A', key, value)} />
        <OfferForm title="工作 B" offer={offerB} onChange={(key, value) => setOffer('B', key, value)} />
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button type="button" className="btn-primary" onClick={calculate}>比較兩份工作</button>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">比較結果</p>
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-slate-950 md:text-3xl">年包優勢：{result.annualWinner}</p>
            </div>
            <p className="result-hero-note">如果你更重視時間成本，可以再一起看有效時薪與通勤時間，三個面向不一定會得出同一個贏家。</p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">年包優勢</p>
                <p className="result-meta-value">{result.annualWinner}</p>
                <p className="result-meta-subtext">年現金加上假期價值</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">有效時薪優勢</p>
                <p className="result-meta-value">{result.hourlyWinner}</p>
                <p className="result-meta-subtext">把加班與通勤一起算進去</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">通勤優勢</p>
                <p className="result-meta-value">{result.commuteWinner}</p>
                <p className="result-meta-subtext">通勤時間越少越有利</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            {[result.offerA, result.offerB].map((offer) => (
              <div key={offer.name} className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">{offer.name}</p>
                  <p className="result-breakdown-note">年現金 {formatCurrency(offer.annualCash)} 元，假期價值 {formatCurrency(offer.leaveValue)} 元，通勤 {formatNumber(offer.commuteHoursPerYear, 1)} 小時 / 年</p>
                </div>
                <span className="result-breakdown-value">有效時薪 {formatCurrency(offer.effectiveHourlyValue)} 元</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}