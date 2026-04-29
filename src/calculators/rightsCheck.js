export const RIGHTS_CHECK_QUESTIONS = [
  {
    id: 'minimumWage',
    title: '月薪或時薪低於法定最低工資',
    desc: '2026 年最低月薪 29,500 元、時薪 196 元。',
    weight: 3,
    law: '勞基法第 21 條',
    category: '工資',
  },
  {
    id: 'noInsurance',
    title: '公司沒有替你加勞保、健保或勞退',
    desc: '常見於試用期、兼職或口頭約定情境。',
    weight: 3,
    law: '勞保 / 健保 / 勞退規定',
    category: '保險',
  },
  {
    id: 'unpaidOvertime',
    title: '常態加班，但沒有依法給加班費',
    desc: '包含補休強迫折抵、責任制濫用、下班後繼續工作。',
    weight: 3,
    law: '勞基法第 24 條',
    category: '工時',
  },
  {
    id: 'illegalDeductions',
    title: '公司用不明名目扣薪或扣全勤',
    desc: '包含遲到、請假、損壞設備等扣款未說明。',
    weight: 2,
    law: '勞基法第 22 條 / 第 23 條',
    category: '工資',
  },
  {
    id: 'noRest',
    title: '長期沒有正常休息日或工時過長',
    desc: '常見於排班工作、外勤與小型公司。',
    weight: 2,
    law: '勞基法第 30 條 / 第 36 條',
    category: '工時',
  },
  {
    id: 'leaveDenied',
    title: '特休、產假、陪產檢假或其他法定假別被拒絕',
    desc: '包含請假被當曠職、被扣全勤或不准請。',
    weight: 2,
    law: '勞基法第 38 條 / 性工法',
    category: '假勤',
  },
  {
    id: 'noRecords',
    title: '公司不給薪資明細、出勤紀錄或排班表',
    desc: '證據不足會直接影響後續申訴與協商。',
    weight: 1,
    law: '勞基法第 23 條',
    category: '證據',
  },
  {
    id: 'forcedResignation',
    title: '被要求自請離職、簽空白文件或放棄資遣費',
    desc: '常見於公司想規避非自願離職責任。',
    weight: 3,
    law: '勞基法第 16 條 / 第 17 條',
    category: '離職',
  },
  {
    id: 'occupationalRisk',
    title: '發生職災後，公司要求自行請病假或不通報',
    desc: '包括上班途中或工作中受傷卻被要求自己處理。',
    weight: 3,
    law: '勞基法第 59 條 / 勞工職業災害保險法',
    category: '職災',
  },
  {
    id: 'harassment',
    title: '遭受性騷擾、霸凌或報復性排班',
    desc: '屬於需要另整理保護義務與內部申訴流程的情境。',
    weight: 2,
    law: '性工法 / 職安法',
    category: '職場安全',
  },
]

const CATEGORY_SUGGESTIONS = {
  工資: '先保存薪資單、匯款紀錄與任何扣薪通知，再核對實領與法定應給口徑。',
  保險: '盡快調出投保明細、勞退提繳明細與到職文件，先確認公司是否確實申報。',
  工時: '優先整理打卡、班表、訊息紀錄與加班時數，後續才能精算工資差額。',
  假勤: '把請假申請、主管回覆與公司制度截圖留存，避免口頭說法失真。',
  證據: '證據不足時，先把薪資單、對話紀錄與排班表補齊，再決定是否申訴。',
  離職: '不要急著簽自請離職或放棄權利文件，先把通知內容與人資對話存下來。',
  職災: '先完成就醫、診斷與事故經過紀錄，再處理通報、補償與保險請領。',
  職場安全: '如果涉及騷擾或霸凌，優先保留時間軸、訊息與證人名單。',
}

export function evaluateRightsCheck(selectedIds) {
  const flaggedItems = RIGHTS_CHECK_QUESTIONS
    .filter((question) => selectedIds.includes(question.id))
    .sort((left, right) => right.weight - left.weight)

  const score = flaggedItems.reduce((sum, item) => sum + item.weight, 0)
  const categories = [...new Set(flaggedItems.map((item) => item.category))]
  const suggestions = categories.map((category) => CATEGORY_SUGGESTIONS[category]).filter(Boolean)

  let risk = 'low'
  if (score >= 8) {
    risk = 'high'
  } else if (score >= 4) {
    risk = 'medium'
  }

  return {
    flaggedItems,
    score,
    categories,
    suggestions,
    risk,
  }
}