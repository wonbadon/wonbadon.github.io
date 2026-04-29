import { Link } from 'react-router-dom'

const tools = [
  {
    to: '/overtime',
    icon: '⏰',
    title: '加班費計算器',
    desc: '依勞基法第24條，計算平日、休息日、例假日的加班費',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    to: '/annual-leave',
    icon: '🌴',
    title: '特休天數計算器',
    desc: '輸入到職日，立即顯示本年度特休天數與下次升級時間',
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    to: '/severance',
    icon: '💼',
    title: '資遣費計算器',
    desc: '依勞退新制、舊制計算資遣費，含年資比例拆算',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    to: '/labor-pension',
    icon: '🏦',
    title: '勞退金試算',
    desc: '試算雇主6%提撥加上自願提撥的退休金累積總額',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
]

const faqs = [
  {
    q: '加班費怎麼算？',
    a: '依勞基法第24條：月薪÷30÷8得出時薪。平日前2小時加班費為時薪×4/3，第3小時起為時薪×5/3。',
  },
  {
    q: '特休有幾天？',
    a: '依勞基法第38條：到職滿6個月3天、1年7天、2年10天、3年14天、5年15天，滿10年後每年加1天（上限30天）。',
  },
  {
    q: '資遣費怎麼計算？',
    a: '勞退新制：每滿1年給1/2個月平均工資，上限6個月。舊制：每滿1年給1個月，上限6個月。',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-10 md:py-14">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-brand-100">
          <span>✅</span> 依據最新勞基法計算
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          台灣勞工權益計算器
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-8">
          加班費、特休天數、資遣費、勞退金 — 30 秒算清楚你的勞工權益
        </p>
        <Link to="/overtime" className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
          立即試算加班費 →
        </Link>
      </section>

      {/* Tools grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tools.map(({ to, icon, title, desc, bg, border }) => (
          <Link
            key={to}
            to={to}
            className={`${bg} ${border} border rounded-2xl p-6 hover:shadow-md transition-shadow group`}
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">
              {title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            <div className="mt-4 text-sm font-medium text-brand-600 flex items-center gap-1">
              立即試算 <span>→</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Stats banner */}
      <section className="section-card mb-12 bg-gradient-to-r from-brand-600 to-brand-800 text-white border-0">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { num: '1,100萬+', label: '台灣受僱勞工' },
            { num: '100%', label: '依勞基法計算' },
            { num: '免費', label: '永久免費使用' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-2xl md:text-3xl font-bold">{num}</div>
              <div className="text-sm text-blue-100 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-card mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">常見問題</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold text-gray-900 mb-1">{q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center pb-4">
        本工具計算結果僅供參考，實際權益認定請洽勞動部或專業勞資顧問。
      </p>
    </div>
  )
}
