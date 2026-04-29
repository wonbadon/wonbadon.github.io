const SEVERITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
}

const RULES = [
  {
    id: 'unpaidOvertime',
    title: '疑似未給加班費',
    severity: 'high',
    law: '勞基法第 24 條',
    keywords: ['加班', '補休', '責任制', '下班後', '沒給加班費', '假日出勤'],
    evidence: ['打卡紀錄', '班表', '訊息紀錄', '薪資單'],
    tools: ['/overtime'],
  },
  {
    id: 'illegalDeduction',
    title: '疑似不當扣薪或扣全勤',
    severity: 'high',
    law: '勞基法第 22 條 / 第 23 條',
    keywords: ['扣薪', '全勤', '罰款', '賠償', '遲到扣錢'],
    evidence: ['薪資單', '公司公告', '對話紀錄'],
    tools: ['/salary-slip'],
  },
  {
    id: 'noInsurance',
    title: '疑似未依法投保或提繳',
    severity: 'high',
    law: '勞保 / 健保 / 勞退規定',
    keywords: ['沒保勞保', '沒保健保', '沒提勞退', '試用期不保', '沒投保'],
    evidence: ['投保明細', '薪資單', '到職通知'],
    tools: ['/insurance-premium', '/insurance-brackets'],
  },
  {
    id: 'forcedResignation',
    title: '疑似規避資遣責任或逼自請離職',
    severity: 'high',
    law: '勞基法第 16 條 / 第 17 條',
    keywords: ['自請離職', '逼離職', '資遣', '不給非自願', '簽離職單'],
    evidence: ['通知書', '對話紀錄', '公司文件'],
    tools: ['/severance', '/notice-period'],
  },
  {
    id: 'leaveDispute',
    title: '疑似法定假別爭議',
    severity: 'medium',
    law: '勞基法第 38 條 / 性工法',
    keywords: ['特休', '產假', '育嬰', '陪產', '不准請假', '曠職'],
    evidence: ['請假紀錄', '主管回覆', '公司請假規則'],
    tools: ['/annual-leave', '/parental-leave'],
  },
  {
    id: 'occupationalAccident',
    title: '疑似職災補償或通報爭議',
    severity: 'high',
    law: '勞基法第 59 條 / 勞工職業災害保險法',
    keywords: ['職災', '工傷', '上班受傷', '通報', '病假處理'],
    evidence: ['診斷證明', '事故經過', '公司通報紀錄'],
    tools: ['/occupational-accident'],
  },
  {
    id: 'harassment',
    title: '疑似霸凌或騷擾爭議',
    severity: 'medium',
    law: '性工法 / 職安法',
    keywords: ['霸凌', '騷擾', '羞辱', '言語暴力', '報復排班'],
    evidence: ['訊息紀錄', '錄音', '目擊證人'],
    tools: ['/rights-check'],
  },
]

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, '')
}

export function analyzeDispute(text) {
  const normalized = normalize(text)

  const issues = RULES
    .map((rule) => {
      const hits = rule.keywords.filter((keyword) => normalized.includes(keyword))
      return { ...rule, hits }
    })
    .filter((rule) => rule.hits.length > 0)
    .sort((left, right) => {
      const severityGap = SEVERITY_ORDER[right.severity] - SEVERITY_ORDER[left.severity]
      if (severityGap !== 0) return severityGap
      return right.hits.length - left.hits.length
    })

  const evidence = [...new Set(issues.flatMap((issue) => issue.evidence))]
  const relatedTools = [...new Set(issues.flatMap((issue) => issue.tools))]
  const highSeverityCount = issues.filter((issue) => issue.severity === 'high').length

  return {
    issues,
    evidence,
    relatedTools,
    highSeverityCount,
  }
}