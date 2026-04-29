import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

function IconBase({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

function OvertimeIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v4.7l3 1.8" />
    </IconBase>
  )
}

function LeaveIcon() {
  return (
    <IconBase>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" />
      <path d="M8 3.8v3.4M16 3.8v3.4M4.5 9.5h15" />
    </IconBase>
  )
}

function SeveranceIcon() {
  return (
    <IconBase>
      <path d="M6.5 19.5h11a1.8 1.8 0 0 0 1.8-1.8V8.8a1.8 1.8 0 0 0-1.8-1.8h-11a1.8 1.8 0 0 0-1.8 1.8v8.9a1.8 1.8 0 0 0 1.8 1.8Z" />
      <path d="M9 7V5.8A2.8 2.8 0 0 1 11.8 3h.4A2.8 2.8 0 0 1 15 5.8V7M9.3 12h5.4" />
    </IconBase>
  )
}

function PensionIcon() {
  return (
    <IconBase>
      <path d="M7 8.8h10" />
      <path d="M7.8 5.5h8.4a1.7 1.7 0 0 1 1.8 1.8v9.4a1.7 1.7 0 0 1-1.8 1.8H7.8A1.7 1.7 0 0 1 6 16.7V7.3a1.7 1.7 0 0 1 1.8-1.8Z" />
      <path d="M9.5 12h5M9.5 15h5" />
    </IconBase>
  )
}

function ArrowIcon() {
  return (
    <IconBase className="home-directory-arrow">
      <path d="M7 17 17 7" />
      <path d="M9.5 7H17v7.5" />
    </IconBase>
  )
}

const tools = [
  {
    to: '/overtime',
    icon: OvertimeIcon,
    category: '工時計算',
    badge: '核心工具',
    law: '第 24 條 / 第 39 條',
    title: '加班費計算機',
    desc: '依勞基法口徑，整理平日、休息日、國定假日與休假日出勤金額。',
    suitable: '平日延長工時、休息日出勤、國定假日加班。',
    inputs: ['月薪或時薪', '加班時數', '假別'],
    output: '應給金額、倍率口徑、常見錯用法條提醒。',
  },
  {
    to: '/annual-leave',
    icon: LeaveIcon,
    category: '假勤權益',
    badge: '年資門檻',
    law: '第 38 條',
    title: '特休天數計算',
    desc: '依勞基法第 38 條，從到職日推算目前法定特休資格與下一個門檻。',
    suitable: '剛滿 6 個月、滿 1 年前後，或想確認特休資格時。',
    inputs: ['到職日期', '查詢日期'],
    output: '法定特休天數、目前年資狀態、下一個里程碑。',
  },
  {
    to: '/severance',
    icon: SeveranceIcon,
    category: '離職權益',
    badge: '新舊制拆算',
    law: '第 17 條 / 勞退條例第 12 條',
    title: '資遣費計算機',
    desc: '依平均工資與年資拆算新制、舊制資遣費，避免把兩套制度混在一起。',
    suitable: '收到資遣通知、非自願離職，或要先抓合理金額區間時。',
    inputs: ['平均工資', '新制年資', '舊制年資'],
    output: '新舊制分開結果、上限差異與試算總額。',
  },
  {
    to: '/labor-pension',
    icon: PensionIcon,
    category: '退休規劃',
    badge: '級距試算',
    law: '勞工退休金條例',
    title: '勞退退休金試算',
    desc: '依最新提繳級距估算雇主提撥、自提金額，以及長期累積結果。',
    suitable: '想確認目前提繳級距、自提比例與退休帳戶成長差異時。',
    inputs: ['月薪', '自提比例', '年限'],
    output: '提繳級距、每月提撥金額、長期累積試算。',
  },
]

const resources = [
  {
    to: '/guide',
    eyebrow: '第一次使用',
    title: '新手指南',
    desc: '先分情境、再準備資料，讓第一次使用的人可以快速進入正確工具。',
    points: ['先選工具', '整理輸入欄位', '知道哪些地方要人工覆核'],
  },
  {
    to: '/scenarios',
    eyebrow: '快速判斷',
    title: '熱門情境比較',
    desc: '把最容易混淆的加班、離職與假勤情境拆開比對，不用邊查邊猜。',
    points: ['平日 vs 休息日', '國定假日 vs 例假日', '資遣 vs 自請離職'],
  },
  {
    to: '/faq',
    eyebrow: '集中解答',
    title: '常見問題',
    desc: '整理站內最常見的法條口徑、結果差異與輸入誤區。',
    points: ['為什麼公司算的不一樣', '特休沒休完怎麼算', '平均工資怎麼看'],
  },
  {
    to: '/about',
    eyebrow: '站點說明',
    title: '關於本站',
    desc: '說清楚資料來源、更新邊界與免責定位，避免把試算站當成官方認定。',
    points: ['資料來源範圍', '不涵蓋的複雜情況', '使用前後要注意什麼'],
  },
]

export default function Home() {
  usePageMeta(
    '首頁與試算工具',
    '台灣勞工權益計算器首頁，整理加班費、特休、資遣費、勞退與新手指南、常見問題、情境比較等入口。',
  )

  return (
    <div className="home-directory-page">
      <div className="home-directory-wrap">
        <nav aria-label="Breadcrumb" className="home-breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <span className="home-breadcrumb-link">首頁</span>
            </li>
            <li className="text-slate-300">/</li>
            <li>
              <span className="text-slate-500">計算工具</span>
            </li>
          </ol>
        </nav>

        <div className="mt-3 max-w-3xl sm:mt-4">
          <h1 className="home-directory-title">勞工權益計算工具</h1>
          <p className="home-directory-subtitle mt-3 sm:mt-4">
            所有工具依據 2026 年最新勞基法與勞退級距資料整理，免費使用、即時計算。
          </p>
        </div>

        <section className="home-directory-grid mt-8 sm:mt-10">
          {tools.map(({ to, icon: Icon, category, badge, law, title, desc, suitable, inputs, output }) => (
            <Link key={to} to={to} className="home-directory-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="home-directory-icon" aria-hidden="true">
                  <Icon />
                </span>

                <div className="flex w-full flex-wrap justify-start gap-2 sm:w-auto sm:justify-end">
                  <span className="home-directory-tag home-directory-tag-primary">{category}</span>
                  <span className="home-directory-tag">{badge}</span>
                </div>
              </div>

              <p className="home-directory-law mt-5 sm:mt-7">法源｜{law}</p>
              <h2 className="home-directory-card-title mt-2 sm:mt-3">{title}</h2>
              <p className="home-directory-card-desc mt-3 sm:mt-4">{desc}</p>

              <div className="home-directory-detail-grid mt-5 sm:mt-6">
                <div>
                  <p className="home-directory-detail-label">適用情境</p>
                  <p className="home-directory-detail-text mt-2">{suitable}</p>
                </div>

                <div>
                  <p className="home-directory-detail-label">你會看到</p>
                  <p className="home-directory-detail-text mt-2">{output}</p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="home-directory-detail-label">需要資料</p>
                <div className="home-directory-chip-wrap mt-3">
                  {inputs.map((item) => (
                    <span key={item} className="home-directory-chip">{item}</span>
                  ))}
                </div>
              </div>

              <div className="home-directory-cta mt-6 sm:mt-7">
                立即試算
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </section>

        <section className="home-directory-section mt-14 sm:mt-16">
          <div className="max-w-3xl">
            <p className="home-directory-kicker">把工具站補成完整網站</p>
            <h2 className="home-directory-section-title mt-3">如果你還不確定該先算什麼，先從這幾頁進來</h2>
            <p className="home-directory-section-desc mt-3 sm:mt-4">
              首頁不只放入口，也把新手導覽、情境拆解、常見問題與站點邊界整理好，讓你不用一進站就直接掉進法條細節。
            </p>
          </div>

          <div className="home-directory-support-grid mt-6 sm:mt-8">
            {resources.map(({ to, eyebrow, title, desc, points }) => (
              <Link key={to} to={to} className="home-directory-support-card">
                <p className="home-directory-support-eyebrow">{eyebrow}</p>
                <h3 className="home-directory-support-title mt-3">{title}</h3>
                <p className="home-directory-support-desc mt-3 sm:mt-4">{desc}</p>

                <ul className="home-directory-support-list mt-4 sm:mt-5">
                  {points.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="home-directory-cta mt-6 sm:mt-7">
                  查看內容
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
