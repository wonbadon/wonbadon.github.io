import { useState } from 'react'
import { calcInsurancePremiums, getInsuranceBracketSummary } from '../calculators/insurance'
import usePageMeta from '../hooks/usePageMeta'
import { formatCurrency } from '../utils/format'

export default function InsuranceBrackets() {
  usePageMeta(
    '投保級距查詢',
    '輸入薪資後，同步對照 2026 年勞保、健保與勞退的申報級距。',
  )

  const [salary, setSalary] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  function calculate() {
    const amount = Number(salary)
    if (!amount || amount <= 0) {
      setError('請輸入正確的月薪')
      return
    }

    setResult({
      brackets: getInsuranceBracketSummary(amount),
      premiums: calcInsurancePremiums({ salary: amount }),
    })
    setError('')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">保費與薪資</p>
        <h1 className="page-title">投保級距查詢</h1>
        <p className="page-subtitle">
          把一筆月薪同時對照到勞保投保薪資、健保投保金額與勞退提繳級距，最適合拿來先看公司申報是否落在合理範圍。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">月薪（元）</label>
          <input
            type="number"
            className="input-field"
            placeholder="例：42750"
            value={salary}
            onChange={(event) => {
              setSalary(event.target.value)
              setResult(null)
              setError('')
            }}
          />
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>查詢級距</button>
      </div>

      {result && (
        <section className="section-card">
          <div className="result-hero">
            <p className="result-hero-label">級距對照</p>
            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">勞保投保薪資</p>
                <p className="result-meta-value">{formatCurrency(result.brackets.laborInsuranceBase)} 元</p>
                <p className="result-meta-subtext">常見受僱勞工 11 級制</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">健保投保金額</p>
                <p className="result-meta-value">{formatCurrency(result.brackets.healthInsuranceBase)} 元</p>
                <p className="result-meta-subtext">115.01.01 生效分級表</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">勞退提繳級距</p>
                <p className="result-meta-value">{formatCurrency(result.brackets.pensionBase)} 元</p>
                <p className="result-meta-subtext">雇主 6% 與勞工自提都用這組級距</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">薪資與勞保級距差額</p>
                <p className="result-breakdown-note">如果實際薪資高於申報級距太多，建議再核對投保資料</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.brackets.laborInsuranceBase - result.brackets.salary)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">以此級距估算的員工勞保</p>
                <p className="result-breakdown-note">先用無眷屬、無自提的基本情境示意</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.premiums.workerLaborInsurance)} 元</span>
            </div>
            <div className="result-breakdown-row">
              <div>
                <p className="result-breakdown-title">以此級距估算的員工健保</p>
                <p className="result-breakdown-note">如有眷屬或補充保費，實際金額會再不同</p>
              </div>
              <span className="result-breakdown-value">{formatCurrency(result.premiums.workerHealthInsurance)} 元</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}