import { Link } from 'react-router-dom'

const tools = [
  {
    to: '/overtime',
    code: '01',
    tag: '最常用',
    tone: 'tool-card-overtime',
    law: '第24條 / 第39條',
    title: '加班與假日出勤工資',
    desc: '平日延長工時、休息日出勤、國定假日與休假日出勤，一次換成具體金額。',
    audience: '今天正在對班表、出勤紀錄、薪資單，想知道公司至少該給多少。',
    prepare: '計薪方式、時數、時薪或月薪換算基礎、假別。',
    result: '應給金額、倍率口徑，以及最容易套錯法條的情境提醒。',
    note: '一般例假日原則不得要求出勤；天災事變停止假期情形，應另依第40條認定。',
  },
  {
    to: '/annual-leave',
    code: '02',
    tag: '最容易算錯',
    tone: 'tool-card-leave',
    law: '第38條',
    title: '特休資格與年資門檻',
    desc: '以滿整月年資計算，不會提前把未滿一個月的時間算進特休資格。',
    audience: '你想先確認自己目前到底有沒有特休、差多久到下一個門檻。',
    prepare: '到職日、查詢日期，以及公司採周年制或曆年制的基本認知。',
    result: '法定天數、目前年資狀態、距離下一個門檻還差多久。',
    note: '周年制、曆年制折算與遞延規則，仍須以公司制度與勞雇約定為準。',
  },
  {
    to: '/severance',
    code: '03',
    tag: '離職前必看',
    tone: 'tool-card-severance',
    law: '第17條 / 勞退條例第12條',
    title: '資遣費新舊制拆算',
    desc: '同時處理 2005/7/1 前後的年資段，避免把舊制錯套成新制上限。',
    audience: '你正在面對非自願離職、裁員、資遣通知，想先抓合理區間。',
    prepare: '到職日、離職日、平均工資，以及 2005/7/1 前後的年資切點。',
    result: '新舊制拆算結果、上限差異，以及接近邊界時需要人工覆核的提醒。',
    note: '本工具用年資小數比例試算，接近未滿 1 個月進位邊界時請人工覆核。',
  },
  {
    to: '/labor-pension',
    code: '04',
    tag: '長期規劃',
    tone: 'tool-card-pension',
    law: '勞工退休金條例',
    title: '勞退提撥與累積試算',
    desc: '把月提繳工資級距、雇主 6% 提撥與自願提撥，整理成長期累積結果。',
    audience: '你想看現在的提撥級距、是否要自提，以及長期累積大概長什麼樣。',
    prepare: '月提繳工資、自願提撥比例、年限，以及你接受的報酬率假設。',
    result: '每月提撥金額、累積試算，以及假設報酬率下的長期差距。',
    note: '已套用 115/01/01 官方級距表；但收益率仍是站內規劃假設，並非個人帳戶實際結算。',
  },
]

const workflow = [
  {
    title: '先確認情境',
    desc: '你是要查加班、特休、非自願離職，還是長期退休累積。',
  },
  {
    title: '再確認計薪口徑',
    desc: '月薪制與時薪制、平均工資、年資跨新舊制，會直接改變結果。',
  },
  {
    title: '最後看免責聲明',
    desc: '遇到制度折算、獎金、津貼或特殊排班，請再做人工作業確認。',
  },
]

const faqs = [
  {
    q: '加班費怎麼算？',
    a: '平日與休息日加班的倍率不同，國定假日 / 休假日也不能直接套同一條。站內已把這三種場景拆開，避免用錯法條。',
  },
  {
    q: '特休有幾天？',
    a: '法定門檻是到職滿 6 個月 3 天、1 年 7 天、2 年 10 天、3 年 14 天、5 年 15 天，滿 10 年後每年再加 1 天，最高 30 天。',
  },
  {
    q: '資遣費怎麼計算？',
    a: '新制年資每滿 1 年給 1/2 個月平均工資，最高 6 個月；舊制年資則是每滿 1 年給 1 個月平均工資，需依實際年資計算。',
  },
]

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <div className="section-card">
          <p className="page-eyebrow">台灣勞工權益快速試算</p>
          <h1 className="page-title mt-4">
            把勞工權益，換成能立即判讀的數字。
          </h1>
          <p className="page-subtitle mt-4 max-w-2xl">
            這不是花俏的展示頁，而是一個把加班費、特休、資遣費與勞退拆成四個核心試算器的實用工具。
            你可以先在這裡抓到方向，再決定下一步要不要補資料、找主管機關或進一步法律諮詢。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/overtime" className="btn-primary sm:w-auto">先算加班與出勤工資</Link>
            <Link to="/severance" className="btn-secondary">查看資遣費拆算</Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { value: '4', label: '核心試算頁' },
              { value: '法規', label: '依條文與主管機關說明整理' },
              { value: '深色', label: '高對比、手機桌機皆可用' },
            ].map(({ value, label }) => (
              <div key={label} className="metric-tile">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="section-card">
          <p className="page-eyebrow">使用前先知道</p>
          <div className="mt-4 space-y-4">
            {[
              {
                title: '先確認你的計薪制',
                desc: '月薪制與時薪制在國定假日 / 休假日的顯示口徑不同，不能直接套同一個倍率。',
              },
              {
                title: '先分清法條情境',
                desc: '休息日、國定假日、一般例假日不是同一件事。把假別分對，才會有對的數字。',
              },
              {
                title: '最後一定看免責聲明',
                desc: '像是曆年制特休、獎金是否列入平均工資、特殊排班等，仍需要人工確認。',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="metric-tile">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="tools" className="grid gap-4 md:grid-cols-2">
        <div className="section-card md:col-span-2">
          <p className="page-eyebrow">功能總覽</p>
          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
            不知道要按哪個功能，就先用情境選。
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            下面每一張卡都直接告訴你：這頁是算什麼、適合什麼情況、你要先準備哪些資料、算完會得到什麼。
            你不用先理解全部法條，先對到你的問題就好。
          </p>
        </div>

        {tools.map(({ to, code, tag, tone, law, title, desc, audience, prepare, result, note }) => (
          <Link key={to} to={to} className={`tool-card group ${tone}`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tool-code">{code}</span>
                  <span className="tool-tag">{tag}</span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">
                    {law}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white">{title}</h2>
                <p className="mt-3 text-base font-semibold text-white/90">{desc}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 xl:grid-cols-3">
              <div className="tool-panel">
                <p className="tool-panel-label">適合這種狀況</p>
                <p className="mt-2 text-sm leading-7 text-slate-100">{audience}</p>
              </div>
              <div className="tool-panel">
                <p className="tool-panel-label">你要先準備</p>
                <p className="mt-2 text-sm leading-7 text-slate-100">{prepare}</p>
              </div>
              <div className="tool-panel">
                <p className="tool-panel-label">算完會看到</p>
                <p className="mt-2 text-sm leading-7 text-slate-100">{result}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-white/10 bg-black/20 p-4">
              <p className="tool-panel-label text-rose-200/85">這頁不幫你處理的部分</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{note}</p>
            </div>

            <div className="mt-5 text-base font-extrabold text-white transition group-hover:translate-x-1">
              直接進這頁開始試算
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="section-card">
          <p className="page-eyebrow">快速判讀流程</p>
          <div className="mt-5 space-y-4">
            {workflow.map(({ title, desc }, index) => (
              <div key={title} className="metric-tile">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-300/20 bg-sky-400/10 text-sm font-bold text-sky-200">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <p className="page-eyebrow">常見問題</p>
          <div className="mt-5 space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="rounded-[22px] border border-white/10 bg-white/5 p-4 transition open:bg-white/10">
                <summary className="cursor-pointer pr-8 text-sm font-semibold text-white">
                  {q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-300">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
