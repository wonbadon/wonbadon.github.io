// 勞基法第38條特休天數規定
const LEAVE_SCHEDULE = [
  { minMonths: 6, maxMonths: 12, days: 3 },
  { minMonths: 12, maxMonths: 24, days: 7 },
  { minMonths: 24, maxMonths: 36, days: 10 },
  { minMonths: 36, maxMonths: 60, days: 14 },
  { minMonths: 60, maxMonths: 120, days: 15 },
]

export function calcAnnualLeave(startDate) {
  const start = new Date(startDate)
  const today = new Date()

  const totalMonths =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth())

  if (totalMonths < 6) {
    return { days: 0, nextDays: 3, monthsToNext: 6 - totalMonths, yearsWorked: totalMonths / 12 }
  }

  // 10年以上：每年加1天，最多30天
  if (totalMonths >= 120) {
    const yearsOver10 = Math.floor(totalMonths / 12) - 10
    const days = Math.min(15 + yearsOver10, 30)
    const nextDays = days < 30 ? days + 1 : 30
    return { days, nextDays, monthsToNext: 12, yearsWorked: totalMonths / 12 }
  }

  const bracket = LEAVE_SCHEDULE.findLast(b => totalMonths >= b.minMonths)
  const nextBracket = LEAVE_SCHEDULE.find(b => b.minMonths > totalMonths) || { minMonths: 120, days: 15 }

  return {
    days: bracket.days,
    nextDays: nextBracket.days,
    monthsToNext: nextBracket.minMonths - totalMonths,
    yearsWorked: totalMonths / 12,
  }
}

export function getLeaveTable() {
  return [
    { period: '滿 6 個月', days: 3 },
    { period: '滿 1 年', days: 7 },
    { period: '滿 2 年', days: 10 },
    { period: '滿 3 年', days: 14 },
    { period: '滿 5 年', days: 15 },
    { period: '滿 10 年後每年', days: '15+年數（最多30）' },
  ]
}
