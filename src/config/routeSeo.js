import { faqEntries } from '../data/faqEntries.js'
import { contentCatalog, toolCatalog } from '../data/toolCatalog.js'

export const SITE_NAME = '台灣勞工權益計算器'
export const DEFAULT_DESCRIPTION = '2026 最新勞工權益計算工具，免費試算薪資、加班費、特休、資遣費、勞退與勞健保，並整理扣薪、離職、失業給付文件、交接、年終、offer、低報投保、變形工時、請假、職災、排班、颱風假、兼職、試用期、育嬰與退休規劃重點。'
export const SOCIAL_IMAGE_PATH = 'social-card.svg'

export function composeDocumentTitle(pageTitle) {
  if (!pageTitle) {
    return SITE_NAME
  }

  return pageTitle.includes(SITE_NAME) ? pageTitle : `${pageTitle}｜${SITE_NAME}`
}

export const routeSeoEntries = [
  {
    path: '/',
    title: '勞工權益計算工具｜免費試算加班費、離職、特休、資遣費、勞退與勞健保',
    description: DEFAULT_DESCRIPTION,
    keywords: ['勞工權益計算工具', '加班費計算機', '離職權益', '離職預告期', '特休天數計算', '資遣費計算機', '勞退試算', '勞健保保費計算', '扣薪怎麼辦', '請假權益', '被開除怎麼辦', '職災怎麼申請', '排班爭議', '勞工局申訴', '薪資單怎麼看', '颱風假有薪嗎', '打工兼職權益', '試用期可以開除嗎', '年終獎金', 'offer 比較', '離職交接清單', '失業給付文件', '高薪低報', '變形工時', '輪班津貼', '育嬰留停', '勞保老年年金'],
    schemaType: 'CollectionPage',
  },
  {
    path: '/guide',
    title: '新手指南｜勞工權益試算前要準備什麼資料',
    description: '第一次使用台灣勞工權益計算器時，先看情境怎麼分、資料怎麼準備，以及哪些地方需要人工覆核。',
    keywords: ['勞工權益新手指南', '加班費怎麼算', '資遣費怎麼算', '特休怎麼算', '勞退怎麼算'],
    schemaType: 'Guide',
  },
  {
    path: '/overtime-guide',
    title: '加班費怎麼算懶人包｜平日、休息日、國定假日加班費一次看',
    description: '整理加班費怎麼算、休息日加班費、國定假日上班薪水與月薪制假日出勤的常見問題，先分情境再進試算。',
    keywords: ['加班費怎麼算', '加班費', '休息日加班費', '國定假日加班費', '月薪制加班費', '加班費計算'],
    schemaType: 'Guide',
  },
  {
    path: '/attendance-dispute-guide',
    title: '排班與出勤爭議懶人包｜調班、輪班、國定假日與補休一次看',
    description: '整理調班、排班、輪班、國定假日出勤、補休與颱風天出勤常見問題，幫你先找到正確入口。',
    keywords: ['調班怎麼算', '排班爭議', '輪班國定假日', '補休怎麼算', '國定假日出勤', '排休違法嗎'],
    schemaType: 'Guide',
  },
  {
    path: '/typhoon-workday-guide',
    title: '颱風假與天災出勤懶人包｜停班停課、扣薪、出勤與加班怎麼看',
    description: '整理颱風假有薪嗎、停班停課可以扣薪嗎、颱風天上班怎麼算與天災出勤補休常見問題，幫你先找到正確入口。',
    keywords: ['颱風假有薪嗎', '颱風天上班薪水', '停班停課可以扣薪嗎', '天災出勤怎麼算', '颱風天加班費', '颱風假扣薪'],
    schemaType: 'Guide',
  },
  {
    path: '/annual-leave-guide',
    title: '特休怎麼算懶人包｜滿半年、滿一年、未休折發與遞延一次看',
    description: '整理特休幾天、滿半年特休、未休折發工資與特休遞延的常見問題，幫你先找到正確入口。',
    keywords: ['特休怎麼算', '特休幾天', '滿半年特休', '特休沒休完', '特休遞延', '特休折發'],
    schemaType: 'Guide',
  },
  {
    path: '/part-time-rights-guide',
    title: '打工兼職權益懶人包｜時薪、排班、加班費與最低工資一次看',
    description: '整理打工加班費怎麼算、兼職有特休嗎、最低時薪、兼職投保與刪班扣薪常見問題，幫你先找到正確入口。',
    keywords: ['打工加班費怎麼算', '兼職有特休嗎', '最低時薪多少', '打工國定假日薪水', '兼職勞健保', '打工被刪班'],
    schemaType: 'Guide',
  },
  {
    path: '/year-end-bonus-guide',
    title: '年終獎金懶人包｜未滿一年比例、離職前後與年終發放一次看',
    description: '整理年終獎金一定要發嗎、未滿一年怎麼算、提離職還拿得到嗎與保證年薪差異，幫你先找到正確入口。',
    keywords: ['年終獎金一定要發嗎', '未滿一年年終怎麼算', '提離職還拿得到年終嗎', '年終算平均工資嗎', '保證年薪跟年終差在哪', '年終少發怎麼辦'],
    schemaType: 'Guide',
  },
  {
    path: '/wage-rights',
    title: '工資與扣薪懶人包｜欠薪、扣薪、薪資單與平均工資一次看',
    description: '整理欠薪怎麼辦、公司可以怎麼扣薪、薪資單怎麼看與平均工資常見誤區，幫你先找到正確入口。',
    keywords: ['扣薪怎麼辦', '欠薪怎麼辦', '薪資單怎麼看', '平均工資怎麼算', '勞保低報', '工資爭議'],
    schemaType: 'Guide',
  },
  {
    path: '/offer-negotiation-guide',
    title: 'Offer 比較與薪資談判懶人包｜年薪、談薪與新鮮人起薪一次看',
    description: '整理 offer 怎麼比、薪資談判看哪些數字、保證年薪差異與新鮮人起薪常見問題，幫你先找到正確入口。',
    keywords: ['offer 怎麼比', '薪資談判要看什麼', '新鮮人起薪怎麼談', '保證年薪是什麼', '兩份 offer 比較', '談薪要看哪些數字'],
    schemaType: 'Guide',
  },
  {
    path: '/salary-slip-guide',
    title: '薪資單與勞健保懶人包｜實領薪資、勞健保扣項與投保級距一次看',
    description: '整理薪資單怎麼看、實領薪資怎麼算、勞健保扣項、勞退自提與投保級距常見問題，幫你先找到正確入口。',
    keywords: ['薪資單怎麼看', '實領薪資怎麼算', '勞健保扣多少', '勞退自提', '投保級距怎麼查', '薪資明細'],
    schemaType: 'Guide',
  },
  {
    path: '/insurance-reporting-guide',
    title: '勞健保高薪低報與兼職投保懶人包｜低報、多份工作與級距一次看',
    description: '整理勞健保高薪低報怎麼看、多份工作與兼職投保規則、投保薪資級距差異與申訴方向，幫你先找到正確入口。',
    keywords: ['勞健保高薪低報怎麼辦', '多份工作勞保怎麼保', '兼職要保勞健保嗎', '投保薪資跟月薪不一樣', '低報薪資會影響失業給付嗎', '公司少保可以申訴嗎'],
    schemaType: 'Guide',
  },
  {
    path: '/insurance-benefits-guide',
    title: '勞保、職災與失業給付懶人包｜勞保給付、職災補償與失業給付流程一次看',
    description: '整理勞保給付怎麼看、職災補償與失業給付申請流程、文件與常見誤區，幫你先找到正確入口。',
    keywords: ['失業給付怎麼領', '職災怎麼申請', '勞保給付', '勞保低報', '職災補償', '非自願離職失業給付'],
    schemaType: 'Guide',
  },
  {
    path: '/unemployment-benefits-guide',
    title: '失業給付與非自願離職文件懶人包｜申請資格、證明文件與時程一次看',
    description: '整理失業給付怎麼領、非自願離職證明文件、申請時程、退件原因與公司不開文件時怎麼處理，幫你先找到正確入口。',
    keywords: ['失業給付怎麼領', '非自願離職證明文件', '失業給付要準備哪些文件', '被資遣後多久申請失業給付', '公司不開非自願離職證明怎麼辦', '失業給付退件'],
    schemaType: 'Guide',
  },
  {
    path: '/leaving-job',
    title: '離職權益懶人包｜離職預告期、資遣費、特休結清與非自願離職怎麼看',
    description: '整理離職預告期、資遣費、特休結清、非自願離職與勞資爭議的常見問題，幫你先找到正確入口。',
    keywords: ['離職', '離職權益', '離職預告期', '資遣費怎麼算', '非自願離職', '離職特休結清'],
    schemaType: 'Guide',
  },
  {
    path: '/exit-handover-guide',
    title: '離職交接與最後工作日懶人包｜交接清單、離職文件與結清一次看',
    description: '整理離職交接清單、最後工作日怎麼算、離職文件、薪資結清與特休折發常見問題，幫你先找到正確入口。',
    keywords: ['離職交接清單', '最後工作日怎麼算', '離職文件有哪些', '離職證明多久拿到', '離職薪資何時結清', '不交接可以扣薪嗎'],
    schemaType: 'Guide',
  },
  {
    path: '/flexible-schedule-guide',
    title: '變形工時、責任制與輪班津貼懶人包｜排班、工時與加班一次看',
    description: '整理變形工時怎麼看、責任制有沒有加班費、輪班津貼算不算工資與排班申訴方向，幫你先找到正確入口。',
    keywords: ['變形工時是什麼', '責任制沒有加班費嗎', '輪班津貼算不算工資', '四週變形工時', '排班制國定假日怎麼算', '做二休二加班'],
    schemaType: 'Guide',
  },
  {
    path: '/dismissal-guide',
    title: '被開除怎麼辦懶人包｜解僱、逼離職、非自願離職與失業給付一次看',
    description: '整理被開除怎麼辦、被逼離職、非自願離職證明與失業給付常見問題，幫你先找到正確入口。',
    keywords: ['被開除怎麼辦', '被逼離職', '非自願離職證明', '失業給付', '解僱', '資遣通知'],
    schemaType: 'Guide',
  },
  {
    path: '/probation-rights-guide',
    title: '試用期權益懶人包｜試用期開除、離職預告、薪資與勞健保一次看',
    description: '整理試用期可以隨時開除嗎、試用期離職要預告嗎、試用期薪水與勞健保常見問題，幫你先找到正確入口。',
    keywords: ['試用期可以隨時開除嗎', '試用期離職要預告嗎', '試用期薪水可以比較低嗎', '試用期要保勞健保嗎', '試用期算年資嗎', '試用期沒過'],
    schemaType: 'Guide',
  },
  {
    path: '/complaint-guide',
    title: '勞工申訴流程懶人包｜蒐證、勞工局申訴、調解與檢舉一次看',
    description: '整理勞工局申訴、勞資調解、檢舉前蒐證、時序整理與常見文件，幫你先找到正確入口。',
    keywords: ['勞工局申訴流程', '勞資調解', '勞工申訴', '蒐證清單', '勞工檢舉', '勞資爭議調解'],
    schemaType: 'Guide',
  },
  {
    path: '/severance-guide',
    title: '資遣費怎麼算懶人包｜非自願離職、平均工資與新舊制一次看',
    description: '整理資遣費怎麼算、非自願離職、平均工資、新舊制年資與自請離職差異，幫你先找到正確入口。',
    keywords: ['資遣費怎麼算', '資遣費', '非自願離職', '平均工資', '新制資遣費', '舊制資遣費'],
    schemaType: 'Guide',
  },
  {
    path: '/leave-guide',
    title: '請假權益懶人包｜病假、事假、婚假、喪假、生理假與家庭照顧假',
    description: '整理病假、事假、婚假、喪假、生理假、家庭照顧假與親職假常見問題，幫你先找到正確入口。',
    keywords: ['病假', '事假', '婚假', '喪假', '生理假', '家庭照顧假'],
    schemaType: 'Guide',
  },
  {
    path: '/parental-leave-guide',
    title: '產假與育嬰留停懶人包｜產假、陪產檢、生育給付與育嬰津貼一次看',
    description: '整理產假幾天、陪產檢及陪產假、生育給付、安胎假與育嬰留停津貼常見問題，幫你先找到正確入口。',
    keywords: ['產假幾天', '陪產假幾天', '育嬰留停津貼', '生育給付', '安胎假', '育嬰留停'],
    schemaType: 'Guide',
  },
  {
    path: '/labor-pension-guide',
    title: '勞退怎麼算懶人包｜雇主 6%、自提、級距與退休規劃一次看',
    description: '整理勞退 6% 怎麼算、勞退自提、提繳級距與勞退和勞保差異，幫你先找到正確入口。',
    keywords: ['勞退怎麼算', '勞退 6%', '勞退自提', '勞退級距', '勞退和勞保差別', '退休金試算'],
    schemaType: 'Guide',
  },
  {
    path: '/retirement-planning-guide',
    title: '退休準備懶人包｜勞退、勞保老年年金與退休年齡規劃一次看',
    description: '整理勞退、勞保老年年金、退休年齡、退休月收入與自提差異常見問題，幫你先找到正確入口。',
    keywords: ['勞保老年年金怎麼算', '勞保退休金怎麼算', '退休年齡規劃', '退休每月可以領多少', '勞退和勞保差在哪', '幾歲退休比較划算'],
    schemaType: 'Guide',
  },
  {
    path: '/scenarios',
    title: '熱門情境比較｜休息日加班、國定假日、資遣與離職差異',
    description: '快速比較平日加班、休息日出勤、國定假日、資遣與自請離職等常見勞工權益情境。',
    keywords: ['休息日加班費', '國定假日加班費', '自請離職和資遣差別', '勞工權益情境比較'],
    schemaType: 'WebPage',
  },
  {
    path: '/faq',
    title: '勞工權益常見問題｜加班費、請假、扣薪、職災、排班與申訴 FAQ',
    description: '整理加班費、請假、扣薪、職災、排班、颱風假、兼職、試用期、年終、offer 比較、離職交接、失業給付文件、低報投保、變形工時、申訴、育嬰與退休規劃中最常見的法條口徑、輸入誤區與結果差異。',
    keywords: ['勞工權益 FAQ', '加班費常見問題', '請假常見問題', '扣薪常見問題', '職災常見問題', '排班常見問題', '颱風假常見問題', '兼職常見問題', '試用期常見問題', '年終常見問題', 'offer 比較常見問題', '離職交接常見問題', '失業給付文件常見問題', '低報投保常見問題', '變形工時常見問題', '申訴常見問題', '育嬰留停常見問題', '退休規劃常見問題'],
    schemaType: 'FAQPage',
  },
  {
    path: '/about',
    title: '關於本站｜資料來源、更新邊界與使用限制',
    description: '說明台灣勞工權益計算器的資料來源、更新邊界、站點角色與不涵蓋的複雜情況。',
    keywords: ['台灣勞工權益計算器', '勞工權益資料來源', '勞動法試算工具'],
    schemaType: 'AboutPage',
  },
  {
    path: '/overtime',
    title: '加班費計算機｜平日、休息日、國定假日加班費怎麼算',
    description: '依勞基法第 24 條與第 39 條，試算平日延長工時、休息日與國定假日 / 休假日出勤金額。',
    keywords: ['加班費計算機', '加班費怎麼算', '平日加班費', '休息日加班費', '國定假日加班費'],
    schemaType: 'WebPage',
  },
  {
    path: '/annual-leave',
    title: '特休天數計算｜滿半年、滿一年特休幾天',
    description: '依勞基法第 38 條，從到職日與查詢日期推算目前法定特休天數與下一個年資門檻。',
    keywords: ['特休天數計算', '特休幾天', '滿半年特休', '滿一年特休', '勞基法特休'],
    schemaType: 'WebPage',
  },
  {
    path: '/severance',
    title: '資遣費計算機｜非自願離職資遣費怎麼算',
    description: '依平均工資與新舊制年資，試算勞基法與勞退條例下的資遣費金額。',
    keywords: ['資遣費計算機', '資遣費怎麼算', '非自願離職資遣費', '新制資遣費', '舊制資遣費'],
    schemaType: 'WebPage',
  },
  {
    path: '/labor-pension',
    title: '勞退退休金試算｜勞退 6% 與自提金額試算',
    description: '依最新勞退提繳級距，試算雇主提撥、自提比例與長期退休金累積結果。',
    keywords: ['勞退試算', '勞退退休金試算', '勞退 6%', '勞退自提', '退休金試算'],
    schemaType: 'WebPage',
  },
  {
    path: '/salary-slip',
    title: '薪資明細計算機｜薪資單、實領薪資與扣項試算',
    description: '拆出 2026 年勞保、健保、勞退自提與實領月薪，協助你快速核對薪資單。',
    keywords: ['薪資明細計算機', '薪資單怎麼看', '實領薪資計算', '薪資扣項', '勞健保扣多少'],
    schemaType: 'WebPage',
  },
  {
    path: '/insurance-premium',
    title: '勞健保保費計算｜勞保、健保與勞退每月負擔',
    description: '用 2026 年勞保、健保與勞退級距，試算勞工、雇主與政府的每月負擔。',
    keywords: ['勞健保保費計算', '勞保保費', '健保保費', '勞退負擔', '勞工雇主保費'],
    schemaType: 'WebPage',
  },
  {
    path: '/insurance-brackets',
    title: '投保級距查詢｜勞保、健保與勞退級距對照',
    description: '輸入薪資後，同步對照 2026 年勞保、健保與勞退的申報級距。',
    keywords: ['投保級距查詢', '勞保級距', '健保級距', '勞退級距', '投保薪資級距'],
    schemaType: 'WebPage',
  },
  {
    path: '/wage-converter',
    title: '時薪月薪換算｜月薪、時薪、日薪與年薪怎麼換',
    description: '把月薪、時薪、日薪與年薪互相換算，分清楚法定換算與工作日估算。',
    keywords: ['時薪月薪換算', '月薪換時薪', '時薪換月薪', '日薪換月薪', '年薪換算'],
    schemaType: 'WebPage',
  },
  {
    path: '/year-end-bonus',
    title: '年終獎金計算｜在職月數與年終比例試算',
    description: '依月薪、在職月數與目標發放月數，估算年終獎金比例與落點。',
    keywords: ['年終獎金計算', '年終怎麼算', '年終獎金比例', '在職未滿一年年終'],
    schemaType: 'WebPage',
  },
  {
    path: '/notice-period',
    title: '離職預告期計算｜離職要提前幾天說',
    description: '依到職日與通知日估算預告天數、最後工作日與離職時程。',
    keywords: ['離職預告期計算', '離職要提前多久', '預告期幾天', '離職最後工作日'],
    schemaType: 'WebPage',
  },
  {
    path: '/parental-leave',
    title: '產假育嬰假計算｜產假天數、生育給付與育嬰津貼',
    description: '整理產假、陪產檢及陪產假、勞保生育給付與育嬰留停津貼，協助快速抓出天數與金額。',
    keywords: ['產假天數', '育嬰留停津貼', '生育給付', '陪產檢假', '陪產假'],
    schemaType: 'WebPage',
  },
  {
    path: '/occupational-accident',
    title: '職災給付計算｜職災補償、傷病給付與工資補償',
    description: '整理職災醫療休養期間的工資補償、災保傷病給付與死亡補償的初步估算。',
    keywords: ['職災給付計算', '職災補償', '職災傷病給付', '職災薪水怎麼算'],
    schemaType: 'WebPage',
  },
  {
    path: '/typhoon-workday',
    title: '颱風假薪資計算機｜颱風天上班有沒有薪水',
    description: '先分清楚有無出勤與工作日類型，再判斷颱風天的法定最低給付與公司額外加碼。',
    keywords: ['颱風假薪資', '颱風假有薪嗎', '颱風天上班薪水', '颱風假加班費'],
    schemaType: 'WebPage',
  },
  {
    path: '/rights-check',
    title: '勞工權益健檢｜快速檢查工時、工資、保險與離職風險',
    description: '用問答方式快速掃描最低工資、工時、保險、請假與離職常見風險。',
    keywords: ['勞工權益健檢', '勞基法檢查', '勞工權益快篩', '工時工資風險'],
    schemaType: 'WebPage',
  },
  {
    path: '/salary-compare',
    title: '薪資比較器｜兩份 Offer 年薪、工時與通勤比較',
    description: '把兩份工作的年現金、假期價值、通勤與有效時薪放在同一個版面比較。',
    keywords: ['薪資比較器', 'offer 比較', '年薪比較', '有效時薪比較', '工作機會比較'],
    schemaType: 'WebPage',
  },
  {
    path: '/dispute-checker',
    title: '勞資爭議檢查器｜扣薪、逼離職與未投保問題快查',
    description: '把事件描述轉成可能的爭議類型、相關法條、證據清單與後續工具入口。',
    keywords: ['勞資爭議檢查', '扣薪怎麼辦', '逼離職怎麼辦', '未保勞健保'],
    schemaType: 'WebPage',
  },
  {
    path: '/retirement-planner',
    title: '退休年齡規劃｜勞保年金與勞退月收入試算',
    description: '結合勞保老年年金與勞退帳戶累積，試算不同退休年齡下的月收入輪廓。',
    keywords: ['退休年齡規劃', '勞保老年年金試算', '退休月收入', '退休金規劃'],
    schemaType: 'WebPage',
  },
]

export const routeSeoByPath = Object.fromEntries(routeSeoEntries.map((entry) => [entry.path, entry]))
const toolCatalogByPath = Object.fromEntries(toolCatalog.map((tool) => [tool.to, tool]))
const homepageToolEntries = toolCatalog.filter((tool) => tool.featured)
const homepageGuideEntries = contentCatalog.slice(0, 12)

export function resolveOpenGraphType(routePath) {
  const routeSeo = routeSeoByPath[routePath]

  if (routeSeo?.schemaType === 'Guide') {
    return 'article'
  }

  return 'website'
}

export const notFoundSeo = {
  title: '找不到頁面',
  description: '你造訪的頁面不存在，可以回到首頁重新選擇工具，或先閱讀新手指南。',
}

function buildBreadcrumbStructuredData(routePath, pageUrl, routeTitle) {
  if (routePath === '/' || routePath === '/404') {
    return null
  }

  const siteUrl = new URL('/', pageUrl).toString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: routeTitle.split('｜')[0],
        item: pageUrl,
      },
    ],
  }
}

function buildListItemStructuredData(position, { name, description, url, itemType = 'WebPage' }) {
  return {
    '@type': 'ListItem',
    position,
    name,
    url,
    item: {
      '@type': itemType,
      name,
      url,
      ...(description ? { description } : {}),
    },
  }
}

function buildItemListStructuredData(name, entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => buildListItemStructuredData(index + 1, entry)),
  }
}

export function buildStructuredData(routePath, pageUrl, socialImageUrl) {
  const publisher = {
    '@type': 'Person',
    name: 'wonbadon',
  }
  const siteUrl = new URL('/', pageUrl).toString()

  const baseWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['勞工權益試算工具', '勞工權益計算工具', 'wonbadon.github.io'],
    url: siteUrl,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'zh-TW',
    image: socialImageUrl,
    publisher,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  if (routePath === '/') {
    const homeRoute = routeSeoByPath['/']
    const featuredToolsList = buildItemListStructuredData(
      '首頁熱門試算工具',
      homepageToolEntries.map((tool) => ({
        name: tool.title,
        description: tool.desc,
        url: new URL(tool.to.replace(/^\//, '').replace(/\/?$/, '/'), siteUrl).toString(),
        itemType: 'WebApplication',
      })),
    )
    const featuredGuidesList = buildItemListStructuredData(
      '首頁重點內容導覽',
      homepageGuideEntries.map((entry) => ({
        name: entry.title,
        description: entry.desc,
        url: new URL(entry.to.replace(/^\//, '').replace(/\/?$/, '/'), siteUrl).toString(),
      })),
    )

    return [
      baseWebsite,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: composeDocumentTitle(homeRoute.title),
        description: homeRoute.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: 'zh-TW',
        image: socialImageUrl,
        about: homeRoute.keywords,
        keywords: homeRoute.keywords.join(', '),
        author: publisher,
        publisher,
        isAccessibleForFree: true,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: siteUrl,
        },
      },
      featuredToolsList,
      featuredGuidesList,
    ]
  }

  if (routePath === '/faq') {
    const faqRoute = routeSeoByPath['/faq']
    const breadcrumb = buildBreadcrumbStructuredData(routePath, pageUrl, faqRoute.title)

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        name: composeDocumentTitle(faqRoute.title),
        description: faqRoute.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: 'zh-TW',
        author: publisher,
        publisher,
        isAccessibleForFree: true,
        mainEntity: faqEntries.map(({ question, answers }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answers.join(' '),
          },
        })),
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: siteUrl,
        },
      },
      breadcrumb,
    ].filter(Boolean)
  }

  const routeSeo = routeSeoByPath[routePath]
  const breadcrumb = routeSeo ? buildBreadcrumbStructuredData(routePath, pageUrl, routeSeo.title) : null
  const toolEntry = toolCatalogByPath[routePath]

  if (!routeSeo) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: composeDocumentTitle(notFoundSeo.title),
      description: notFoundSeo.description,
      url: pageUrl,
      inLanguage: 'zh-TW',
      image: socialImageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteUrl,
      },
    }
  }

  if (toolEntry) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: composeDocumentTitle(routeSeo.title),
        description: routeSeo.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: 'zh-TW',
        image: socialImageUrl,
        keywords: routeSeo.keywords.join(', '),
        about: routeSeo.keywords,
        applicationCategory: `${toolEntry.category} 試算工具`,
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript. Works in modern browsers.',
        featureList: [
          toolEntry.suitable,
          `輸入：${toolEntry.inputs.join('、')}`,
          `結果：${toolEntry.output}`,
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TWD',
        },
        author: publisher,
        publisher,
        isAccessibleForFree: true,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: siteUrl,
        },
      },
      breadcrumb,
    ].filter(Boolean)
  }

  if (routeSeo.schemaType === 'Guide') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: routeSeo.title,
        name: composeDocumentTitle(routeSeo.title),
        description: routeSeo.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        inLanguage: 'zh-TW',
        image: socialImageUrl,
        keywords: routeSeo.keywords.join(', '),
        about: routeSeo.keywords,
        articleSection: routeSeo.title.split('｜')[0],
        author: publisher,
        publisher,
        isAccessibleForFree: true,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: siteUrl,
        },
      },
      breadcrumb,
    ].filter(Boolean)
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': routeSeo.schemaType || 'WebPage',
      name: composeDocumentTitle(routeSeo.title),
      description: routeSeo.description,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      inLanguage: 'zh-TW',
      image: socialImageUrl,
      keywords: routeSeo.keywords.join(', '),
      about: routeSeo.keywords,
      author: publisher,
      publisher,
      isAccessibleForFree: true,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: siteUrl,
      },
    },
    breadcrumb,
  ].filter(Boolean)
}