import { faqEntries } from '../data/faqEntries'
import { contentCatalog, toolCatalog } from '../data/toolCatalog'

const routeAliasMap = {
  '/guide': ['自救', '第一次使用', '不知道看哪頁', '新手'],
  '/dispute-checker': ['自救', '勞資爭議', '求助', '我該怎麼辦'],
  '/rights-check': ['自救', '快篩', '健檢', '我有問題嗎'],
  '/complaint-guide': ['自救', '申訴', '調解', '檢舉', '蒐證', '勞工局'],
  '/dismissal-guide': ['被開除', '逼離職', '非自願離職', '被辭退', '簽離職單', '不簽不給薪'],
  '/unemployment-benefits-guide': ['失業', '失業補助', '非自願離職證明', '失業給付'],
  '/insurance-reporting-guide': ['高薪低報', '低報', '兼職投保', '多份工作'],
  '/insurance-benefits-guide': ['職災', '傷病給付', '職災補償', '公司補償'],
  '/attendance-dispute-guide': ['排班', '調班', '補休', '班表'],
  '/flexible-schedule-guide': ['責任制', '變形工時', '輪班', '排班加班'],
  '/labor-pension': ['勞退', '勞退自提', '勞退6%', '離職勞退', '換工作勞退'],
  '/labor-pension-guide': ['勞退', '勞退和勞保差別', '雇主提撥6%', '月提繳工資', '勞退級距'],
  '/retirement-planning-guide': ['退休金', '勞保年金', '退休年齡', '退休月領', '幾歲退休'],
  '/wage-rights': ['欠薪', '亂扣薪', '扣薪', '全勤獎金', '薪水被扣'],
  '/salary-slip-guide': ['薪資單', '看不懂薪資單', '勞健保扣很多', '實領薪資'],
  '/offer-negotiation-guide': ['談薪', '薪資談判', 'offer比較', '保證年薪'],
  '/year-end-bonus-guide': ['年終', '未滿一年年終', '年終比例'],
  '/part-time-rights-guide': ['打工', '兼職', '工讀', '計時人員'],
  '/probation-rights-guide': ['試用期', '試用沒過', '試用期開除', '試用期勞健保'],
  '/typhoon-workday-guide': ['颱風假', '颱風價', '天災', '停班停課', '颱風天'],
  '/typhoon-workday': ['颱風假', '颱風價', '天災', '停班停課', '颱風天'],
  '/leaving-job': ['離職', '自請離職', '最後工作日'],
}

export const siteSearchSuggestions = ['颱風假', '自救', '被開除', '低報投保', '資遣費', '離職']

function normalizeSearchText(value = '') {
  return String(value)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/臺/g, '台')
    .replace(/\s+/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[，。、「」『』（）()【】〔〕［］!！?？:：;；,./\\'"`~@#$%^&*_+=|<>-]/g, '')
}

function levenshteinDistance(source, target) {
  if (source === target) return 0
  if (!source) return target.length
  if (!target) return source.length

  const rows = source.length + 1
  const cols = target.length + 1
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0))

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row
  }

  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = source[row - 1] === target[col - 1] ? 0 : 1

      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      )
    }
  }

  return matrix[source.length][target.length]
}

function isLooseKeywordMatch(query, keyword) {
  if (!query || !keyword) {
    return false
  }

  if (keyword.includes(query) || query.includes(keyword)) {
    return true
  }

  if (Math.min(query.length, keyword.length) < 3) {
    return false
  }

  if (Math.abs(query.length - keyword.length) > 1 || query.length > 8 || keyword.length > 8) {
    return false
  }

  return levenshteinDistance(query, keyword) <= 1
}

function createEntry(to) {
  return {
    to,
    title: '',
    shortLabel: '',
    desc: '',
    types: new Set(),
    categories: new Set(),
    badges: new Set(),
    keywords: new Set(routeAliasMap[to] ?? []),
  }
}

function getOrCreateEntry(entryMap, to) {
  if (!entryMap.has(to)) {
    entryMap.set(to, createEntry(to))
  }

  return entryMap.get(to)
}

function choosePrimaryText(currentValue, nextValue) {
  return currentValue || nextValue || ''
}

function finalizeEntry(entry) {
  const keywords = [...entry.keywords].filter(Boolean)
  const normalizedKeywords = keywords.map((keyword) => normalizeSearchText(keyword)).filter(Boolean)
  const kindLabel = entry.types.has('tool')
    ? '工具'
    : entry.types.has('content')
      ? '內容'
      : '常見問題'

  return {
    to: entry.to,
    title: entry.title,
    shortLabel: entry.shortLabel,
    desc: entry.desc,
    kindLabel,
    categoryLabel: [...entry.categories][0] ?? '站內內容',
    badges: [...entry.badges],
    keywords,
    normalizedTitle: normalizeSearchText(entry.title),
    normalizedShortLabel: normalizeSearchText(entry.shortLabel),
    normalizedDesc: normalizeSearchText(entry.desc),
    normalizedKeywords,
  }
}

function buildSiteSearchEntries() {
  const entryMap = new Map()

  toolCatalog.forEach((tool) => {
    const entry = getOrCreateEntry(entryMap, tool.to)

    entry.title = choosePrimaryText(entry.title, tool.title)
    entry.shortLabel = choosePrimaryText(entry.shortLabel, tool.shortLabel)
    entry.desc = choosePrimaryText(entry.desc, tool.desc)
    entry.types.add('tool')
    entry.categories.add(tool.category)
    entry.badges.add(tool.badge)

    ;[
      tool.title,
      tool.shortLabel,
      tool.desc,
      tool.footerDesc,
      tool.guideDesc,
      tool.suitable,
      tool.law,
      tool.category,
      tool.badge,
      ...tool.inputs,
      tool.output,
    ].forEach((value) => {
      if (value) {
        entry.keywords.add(value)
      }
    })
  })

  contentCatalog.forEach((content) => {
    const entry = getOrCreateEntry(entryMap, content.to)

    entry.title = choosePrimaryText(entry.title, content.title)
    entry.shortLabel = choosePrimaryText(entry.shortLabel, content.label)
    entry.desc = choosePrimaryText(entry.desc, content.desc)
    entry.types.add('content')
    entry.categories.add(content.eyebrow)

    ;[
      content.label,
      content.eyebrow,
      content.title,
      content.desc,
      ...content.points,
    ].forEach((value) => {
      if (value) {
        entry.keywords.add(value)
      }
    })
  })

  faqEntries.forEach((faq) => {
    const entry = getOrCreateEntry(entryMap, faq.to)

    entry.title = choosePrimaryText(entry.title, faq.question)
    entry.shortLabel = choosePrimaryText(entry.shortLabel, faq.cta)
    entry.desc = choosePrimaryText(entry.desc, faq.answers[0])
    entry.types.add('faq')

    ;[
      faq.question,
      faq.cta,
      ...faq.answers,
    ].forEach((value) => {
      if (value) {
        entry.keywords.add(value)
      }
    })
  })

  return [...entryMap.values()].map(finalizeEntry)
}

const siteSearchEntries = buildSiteSearchEntries()

function scoreEntry(entry, query, queryTokens) {
  let score = 0

  if (entry.normalizedTitle.includes(query)) score += 140
  if (entry.normalizedShortLabel.includes(query)) score += 120
  if (entry.normalizedDesc.includes(query)) score += 60
  if (entry.normalizedKeywords.some((keyword) => keyword.includes(query))) score += 90
  if (entry.normalizedKeywords.some((keyword) => isLooseKeywordMatch(query, keyword))) score += 70

  queryTokens.forEach((token) => {
    if (!token) {
      return
    }

    if (entry.normalizedTitle.includes(token)) score += 40
    if (entry.normalizedShortLabel.includes(token)) score += 35
    if (entry.normalizedDesc.includes(token)) score += 15
    if (entry.normalizedKeywords.some((keyword) => keyword.includes(token))) score += 20
  })

  if (score > 0 && entry.badges.length > 0) {
    score += 2
  }

  return score
}

export function searchSiteContent(query, limit = 8) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return []
  }

  const queryTokens = String(query)
    .normalize('NFKC')
    .split(/\s+/)
    .map((token) => normalizeSearchText(token))
    .filter(Boolean)

  return siteSearchEntries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, normalizedQuery, queryTokens),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title, 'zh-Hant'))
    .slice(0, limit)
    .map(({ entry }) => entry)
}