import { Link } from 'react-router-dom'
import { useState } from 'react'
import { RIGHTS_CHECK_QUESTIONS, evaluateRightsCheck } from '../calculators/rightsCheck'
import usePageMeta from '../hooks/usePageMeta'

const levelMap = {
  low: { title: '暫時沒看到太多高風險訊號', tone: 'result-hero' },
  medium: { title: '已出現需要整理證據的警訊', tone: 'result-hero result-hero-warning' },
  high: { title: '高風險，建議先保全資料再行動', tone: 'result-hero result-hero-warning' },
}

export default function RightsCheck() {
  usePageMeta(
    '勞工權益健檢',
    '用問答方式快速掃描最低工資、工時、保險、請假與離職常見風險。',
  )

  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  function toggle(id) {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }))
    setResult(null)
  }

  function calculate() {
    const selectedIds = Object.keys(answers).filter((id) => answers[id])
    setResult(evaluateRightsCheck(selectedIds))
  }

  const selectedCount = Object.keys(answers).filter((id) => answers[id]).length
  const tone = result ? levelMap[result.risk] : levelMap.low

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工作判讀</p>
        <h1 className="page-title">勞工權益健檢</h1>
        <p className="page-subtitle">
          這不是法律裁判，而是先幫你找出最可能出問題的地方。你只要勾選自己實際遇到的情況，就能先知道哪些項目值得優先整理證據。
        </p>
      </section>

      <div className="section-card space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {RIGHTS_CHECK_QUESTIONS.map((question) => (
            <button
              key={question.id}
              type="button"
              onClick={() => toggle(question.id)}
              className={answers[question.id] ? 'metric-tile border-sky-300 bg-sky-50 text-left' : 'metric-tile text-left'}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-slate-950">{question.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{question.desc}</p>
                </div>
                <span className="home-directory-tag home-directory-tag-primary">{question.category}</span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{question.law}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600">目前已勾選 {selectedCount} 項。</p>
          <button type="button" className="btn-primary md:w-auto" onClick={calculate}>開始健檢</button>
        </div>
      </div>

      {result && (
        <section className="section-card">
          <div className={tone.tone}>
            <p className="result-hero-label">健檢結論</p>
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-slate-950 md:text-3xl">{tone.title}</p>
            </div>
            <p className="result-hero-note">分數越高，代表同時出現的權益風險越多，但仍要回到實際證據與個案事實判斷。</p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">總分</p>
                <p className="result-meta-value">{result.score}</p>
                <p className="result-meta-subtext">依問題嚴重度加權</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">命中項目</p>
                <p className="result-meta-value">{result.flaggedItems.length} 項</p>
                <p className="result-meta-subtext">建議先處理權重高的項目</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">主要類別</p>
                <p className="result-meta-value">{result.categories.join('、') || '未勾選'}</p>
                <p className="result-meta-subtext">可用來決定你要先整理哪一類證據</p>
              </div>
            </div>
          </div>

          <div className="result-breakdown">
            {result.flaggedItems.map((item) => (
              <div key={item.id} className="result-breakdown-row">
                <div>
                  <p className="result-breakdown-title">{item.title}</p>
                  <p className="result-breakdown-note">{item.law}</p>
                </div>
                <span className="result-breakdown-value">權重 {item.weight}</span>
              </div>
            ))}
          </div>

          {result.suggestions.length > 0 && (
            <div className="mt-5 rounded-[22px] border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-extrabold text-slate-950">下一步建議</p>
              <ul className="site-list mt-3 space-y-2 text-sm leading-7 text-slate-700">
                {result.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="section-card">
        <p className="page-eyebrow">延伸入口</p>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-950">健檢後常見的下一步，不外乎這三條</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            to="/insurance-reporting-guide"
            className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
          >
            <h3 className="text-xl font-extrabold text-slate-950">低報投保與兼職投保</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">勾到勞健保、扣薪或薪資單異常時，常常最後會回到投保薪資到底怎麼報。</p>
            <p className="mt-4 text-sm font-semibold text-sky-700">前往低報投保懶人包 →</p>
          </Link>
          <Link
            to="/unemployment-benefits-guide"
            className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
          >
            <h3 className="text-xl font-extrabold text-slate-950">非自願離職與失業給付</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">勾到解僱、逼離職或交接爭議時，下一步通常就是文件、時程和失業給付資格判讀。</p>
            <p className="mt-4 text-sm font-semibold text-sky-700">前往失業給付懶人包 →</p>
          </Link>
          <Link
            to="/flexible-schedule-guide"
            className="metric-tile block h-full transition duration-200 hover:-translate-y-1 hover:bg-sky-50"
          >
            <h3 className="text-xl font-extrabold text-slate-950">變形工時、責任制與輪班</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">勾到工時、排班或加班費問題時，很多情況不是單純時數，而是制度本身就要先拆開看。</p>
            <p className="mt-4 text-sm font-semibold text-sky-700">前往變形工時懶人包 →</p>
          </Link>
        </div>
      </section>
    </div>
  )
}