import { Link } from 'react-router-dom'
import { useState } from 'react'
import { analyzeDispute } from '../calculators/disputeChecker'
import usePageMeta from '../hooks/usePageMeta'

const toolLabelMap = {
  '/overtime': '加班費計算機',
  '/salary-slip': '薪資明細計算機',
  '/insurance-premium': '勞健保保費計算',
  '/insurance-brackets': '投保級距查詢',
  '/severance': '資遣費計算機',
  '/notice-period': '離職預告期計算',
  '/annual-leave': '特休天數計算',
  '/parental-leave': '產假育嬰假計算',
  '/occupational-accident': '職災給付計算',
  '/rights-check': '勞工權益健檢',
}

export default function DisputeChecker() {
  usePageMeta(
    '勞資爭議檢查器',
    '把事件描述轉成可能的爭議類型、相關法條、證據清單與後續工具入口。',
  )

  const [story, setStory] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function calculate() {
    if (!story.trim()) {
      setError('請先描述你遇到的情況')
      return
    }

    setResult(analyzeDispute(story))
    setError('')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">工作判讀</p>
        <h1 className="page-title">勞資爭議檢查器</h1>
        <p className="page-subtitle">
          把你遇到的事情用自然語言描述出來，這頁會先協助你分類成可能的爭議類型，並提醒該收哪些證據。
          它不會替你裁決誰對誰錯，但能幫你把問題拆得更清楚。
        </p>
      </section>

      <div className="section-card space-y-6">
        <textarea
          className="input-field min-h-[220px]"
          placeholder="例：公司要求我每天加班 2 小時，但薪資單沒有加班費，最近又叫我自己簽自請離職，還說試用期不用保勞健保。"
          value={story}
          onChange={(event) => {
            setStory(event.target.value)
            setResult(null)
            setError('')
          }}
        />

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <button type="button" className="btn-primary" onClick={calculate}>分析爭議方向</button>
      </div>

      {result && (
        <section className="section-card">
          <div className={result.issues.length > 0 ? 'result-hero result-hero-warning' : 'result-hero'}>
            <p className="result-hero-label">分析結果</p>
            <div className="mt-4">
              <p className="text-2xl font-extrabold text-slate-950 md:text-3xl">
                {result.issues.length > 0 ? `找到 ${result.issues.length} 個可能爭議方向` : '目前沒有抓到明確關鍵字'}
              </p>
            </div>
            <p className="result-hero-note">
              {result.issues.length > 0
                ? '越高風險的問題越應該先保留證據，再決定是內部溝通、申訴或直接尋求外部協助。'
                : '如果描述較短或用詞比較間接，建議再補上「扣薪、加班、離職、保險、假別、職災」等實際情境字詞。'}
            </p>

            <div className="result-meta-grid md:grid-cols-3">
              <div className="result-meta-card">
                <p className="result-meta-label">高風險項目</p>
                <p className="result-meta-value">{result.highSeverityCount} 項</p>
                <p className="result-meta-subtext">先處理高風險項目最有效</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">建議證據</p>
                <p className="result-meta-value">{result.evidence.length} 類</p>
                <p className="result-meta-subtext">先把這些資料整理出來</p>
              </div>
              <div className="result-meta-card">
                <p className="result-meta-label">相關工具</p>
                <p className="result-meta-value">{result.relatedTools.length} 個</p>
                <p className="result-meta-subtext">可以用來把金額與時序算得更準</p>
              </div>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="result-breakdown">
              {result.issues.map((issue) => (
                <div key={issue.id} className="result-breakdown-row">
                  <div>
                    <p className="result-breakdown-title">{issue.title}</p>
                    <p className="result-breakdown-note">{issue.law}｜命中關鍵字：{issue.hits.join('、')}</p>
                  </div>
                  <span className="result-breakdown-value">{issue.severity === 'high' ? '高風險' : issue.severity === 'medium' ? '中風險' : '低風險'}</span>
                </div>
              ))}
            </div>
          )}

          {result.evidence.length > 0 && (
            <div className="mt-5 rounded-[22px] border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-extrabold text-slate-950">先整理這些證據</p>
              <ul className="site-list mt-3 space-y-2 text-sm leading-7 text-slate-700">
                {result.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {result.relatedTools.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {result.relatedTools.map((path) => (
                <Link key={path} to={path} className="home-directory-chip">
                  {toolLabelMap[path] || path}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}