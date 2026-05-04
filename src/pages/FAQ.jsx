import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { faqEntries } from '../data/faqEntries'

export default function FAQ() {
  usePageMeta(
    '常見問題',
    '整理加班費、特休、資遣費與勞退試算中最常見的法條口徑、輸入誤區與結果差異。',
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
        {faqEntries.map(({ question, answers, to, cta }, index) => (
          <details key={question} className="rounded-[22px] border border-slate-200 bg-slate-50 p-5" open={index === 0}>
            <summary className="cursor-pointer text-lg font-extrabold text-slate-950">{question}</summary>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {answers.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link to={to} className="inline-flex pt-1 font-semibold text-sky-700 transition hover:text-sky-800">
                {cta} →
              </Link>
            </div>
          </details>
        ))}
      </section>
    </div>
  )
}