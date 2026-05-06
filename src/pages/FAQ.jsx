import { useDeferredValue, useState } from 'react'
import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { faqEntries } from '../data/faqEntries'

const faqTopicGroups = [
  {
    id: 'hours',
    label: '工時排班',
    routes: ['/overtime', '/scenarios', '/attendance-dispute-guide', '/flexible-schedule-guide', '/typhoon-workday-guide'],
  },
  {
    id: 'leaving',
    label: '離職解僱',
    routes: ['/severance', '/leaving-job', '/exit-handover-guide', '/dismissal-guide', '/unemployment-benefits-guide', '/probation-rights-guide'],
  },
  {
    id: 'leave',
    label: '請假親職',
    routes: ['/annual-leave', '/leave-guide', '/parental-leave-guide'],
  },
  {
    id: 'pay',
    label: '工資投保',
    routes: ['/wage-rights', '/salary-slip-guide', '/insurance-reporting-guide', '/insurance-benefits-guide', '/part-time-rights-guide'],
  },
  {
    id: 'career',
    label: '談薪退休',
    routes: ['/offer-negotiation-guide', '/year-end-bonus-guide', '/labor-pension', '/retirement-planning-guide'],
  },
  {
    id: 'help',
    label: '申訴與使用',
    routes: ['/guide', '/complaint-guide', '/about'],
  },
]

const faqTopicByRoute = faqTopicGroups.reduce((result, group) => {
  group.routes.forEach((route) => {
    result[route] = group.id
  })

  return result
}, {})

const faqTopicLabelById = faqTopicGroups.reduce((result, group) => {
  result[group.id] = group.label
  return result
}, {})

const faqTopicCounts = faqTopicGroups.map((group) => ({
  ...group,
  count: faqEntries.filter((entry) => faqTopicByRoute[entry.to] === group.id).length,
}))

function normalizeFaqText(value = '') {
  return String(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/臺/g, '台')
    .replace(/\s+/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[，。、「」『』（）()【】〔〕［］!！?？:：;；,./\\'"`~@#$%^&*_+=|<>-]/g, '')
}

export default function FAQ() {
  const [activeTopic, setActiveTopic] = useState('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = normalizeFaqText(deferredQuery)
  const visibleEntries = faqEntries.filter(({ question, answers, to }) => {
    if (activeTopic !== 'all' && faqTopicByRoute[to] !== activeTopic) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const searchableText = normalizeFaqText([question, ...answers, faqTopicLabelById[faqTopicByRoute[to]] ?? '其他'].join(' '))
    return searchableText.includes(normalizedQuery)
  })

  usePageMeta(
    '勞工權益常見問題',
    '整理加班費、請假、扣薪、資遣、離職、年終、offer 比較、離職交接、失業給付文件、低報投保、變形工時與勞退試算中最常見的法條口徑、輸入誤區與結果差異。',
  )

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-3">
        <p className="page-eyebrow">常見問題</p>
        <h1 className="page-title">先把最常卡住的地方講清楚</h1>
        <p className="page-subtitle max-w-3xl">
          這頁整理的是最常被問到、也最容易讓計算結果偏掉的問題。建議先看這裡，再回工具頁做試算，會比較不容易一開始就走錯方向。
        </p>
      </section>

      <section className="section-card space-y-4">
        <div className="space-y-4 rounded-[22px] border border-slate-200 bg-slate-50 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">快速篩選</p>
            <p className="mt-2 text-sm leading-7 text-slate-500">先選主題，再用關鍵字縮小範圍，找 FAQ 不用從頭一路展開。</p>
          </div>

          <div>
            <label htmlFor="faq-search" className="sr-only">搜尋 FAQ 關鍵字</label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如：平均工資、試用期、勞退、離職文件"
              className="w-full rounded-[20px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTopic('all')}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${activeTopic === 'all' ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700'}`}
              aria-pressed={activeTopic === 'all'}
            >
              全部問題
              <span className="ml-2 text-slate-400">{faqEntries.length}</span>
            </button>
            {faqTopicCounts.map(({ id, label, count }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTopic(id)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${activeTopic === id ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700'}`}
                aria-pressed={activeTopic === id}
              >
                {label}
                <span className="ml-2 text-slate-400">{count}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500">目前顯示 {visibleEntries.length} 個問題{activeTopic === 'all' ? '' : `，主題為「${faqTopicLabelById[activeTopic]}」`}。</p>
        </div>

        {visibleEntries.length > 0 ? (
          visibleEntries.map(({ question, answers, to, cta }, index) => {
            const topicLabel = faqTopicLabelById[faqTopicByRoute[to]] ?? '其他問題'

            return (
              <details key={question} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5" open={index === 0}>
                <summary className="cursor-pointer list-none">
                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    {topicLabel}
                  </span>
                  <span className="mt-3 block text-lg font-extrabold text-slate-950">{question}</span>
                </summary>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  {answers.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <Link to={to} className="inline-flex pt-1 font-semibold text-sky-700 transition hover:text-sky-800">
                    {cta} →
                  </Link>
                </div>
              </details>
            )
          })
        ) : (
          <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
            <p>目前沒有符合的 FAQ。可以換別的關鍵字，或先切回全部主題再找。</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTopic('all')
                  setQuery('')
                }}
                className="rounded-full border border-amber-300 bg-white px-3 py-2 font-semibold text-amber-700 transition hover:border-amber-400 hover:bg-amber-100"
              >
                清除篩選
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}