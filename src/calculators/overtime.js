// 勞基法第24條、第39條、第40條
// 月薪換算時薪：月薪 ÷ 30 ÷ 8
export function calcHourlyRate(monthlySalary) {
  return monthlySalary / 30 / 8
}

// 平日延長工時加班費
// 前2小時：時薪 × 4/3；第3小時起：時薪 × 5/3
export function calcWeekdayOvertime(hourlyRate, hours) {
  if (hours <= 0) return 0
  const first2 = Math.min(hours, 2)
  const rest = Math.max(hours - 2, 0)
  return first2 * hourlyRate * (4 / 3) + rest * hourlyRate * (5 / 3)
}

// 休息日加班費（勞基法第24條第2項）
// 前2小時：時薪 × 4/3；第3小時起：時薪 × 5/3
// 但雇主至少要給當日的日薪（8小時）才算完整一天
export function calcRestDayOvertime(hourlyRate, hours) {
  if (hours <= 0) return 0
  const first2 = Math.min(hours, 2)
  const rest = Math.max(hours - 2, 0)
  return first2 * hourlyRate * (4 / 3) + rest * hourlyRate * (5 / 3)
}

// 例假日加班費（勞基法第40條）：2倍時薪
export function calcHolidayOvertime(hourlyRate, hours) {
  if (hours <= 0) return 0
  return hours * hourlyRate * 2
}

export function calcOvertimeSummary({ salaryType, monthlySalary, hourlyRateInput, weekdayHours, restDayHours, holidayHours }) {
  const hourlyRate = salaryType === 'monthly'
    ? calcHourlyRate(Number(monthlySalary))
    : Number(hourlyRateInput)

  const weekdayPay = calcWeekdayOvertime(hourlyRate, Number(weekdayHours))
  const restDayPay = calcRestDayOvertime(hourlyRate, Number(restDayHours))
  const holidayPay = calcHolidayOvertime(hourlyRate, Number(holidayHours))
  const total = weekdayPay + restDayPay + holidayPay

  return { hourlyRate, weekdayPay, restDayPay, holidayPay, total }
}
