import { faqEntries } from '../data/faqEntries.js'

export const SITE_NAME = '台灣勞工權益計算器'
export const DEFAULT_DESCRIPTION = '2026 最新勞工權益計算工具，免費試算薪資、加班費、特休、資遣費、勞退與勞健保，輸入資料後立即看結果與法條重點。'
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
    keywords: ['勞工權益計算工具', '加班費計算機', '離職權益', '離職預告期', '特休天數計算', '資遣費計算機', '勞退試算', '勞健保保費計算'],
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
    path: '/leaving-job',
    title: '離職權益懶人包｜離職預告期、資遣費、特休結清與非自願離職怎麼看',
    description: '整理離職預告期、資遣費、特休結清、非自願離職與勞資爭議的常見問題，幫你先找到正確入口。',
    keywords: ['離職', '離職權益', '離職預告期', '資遣費怎麼算', '非自願離職', '離職特休結清'],
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
    title: '勞工權益常見問題｜加班費、特休、資遣費與勞退 FAQ',
    description: '整理加班費、特休、資遣費與勞退試算中最常見的法條口徑、輸入誤區與結果差異。',
    keywords: ['勞工權益 FAQ', '加班費常見問題', '特休常見問題', '資遣費常見問題', '勞退常見問題'],
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

export const notFoundSeo = {
  title: '找不到頁面',
  description: '你造訪的頁面不存在，可以回到首頁重新選擇工具，或先閱讀新手指南。',
}

export function buildStructuredData(routePath, pageUrl, socialImageUrl) {
  const baseWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['勞工權益試算工具', '勞工權益計算工具', 'wonbadon.github.io'],
    url: new URL('/', pageUrl).toString(),
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'zh-TW',
    image: socialImageUrl,
    publisher: {
      '@type': 'Person',
      name: 'wonbadon',
    },
  }

  if (routePath === '/') {
    const homeRoute = routeSeoByPath['/']

    return [
      baseWebsite,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: composeDocumentTitle(homeRoute.title),
        description: homeRoute.description,
        url: pageUrl,
        inLanguage: 'zh-TW',
        image: socialImageUrl,
        about: homeRoute.keywords,
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: new URL('/', pageUrl).toString(),
        },
      },
    ]
  }

  if (routePath === '/faq') {
    const faqRoute = routeSeoByPath['/faq']

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: composeDocumentTitle(faqRoute.title),
      description: faqRoute.description,
      url: pageUrl,
      inLanguage: 'zh-TW',
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
        url: new URL('/', pageUrl).toString(),
      },
    }
  }

  const routeSeo = routeSeoByPath[routePath]

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
        url: new URL('/', pageUrl).toString(),
      },
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': routeSeo.schemaType || 'WebPage',
    name: composeDocumentTitle(routeSeo.title),
    description: routeSeo.description,
    url: pageUrl,
    inLanguage: 'zh-TW',
    image: socialImageUrl,
    keywords: routeSeo.keywords.join(', '),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: new URL('/', pageUrl).toString(),
    },
  }
}