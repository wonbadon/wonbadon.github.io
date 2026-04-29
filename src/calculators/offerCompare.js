const WORK_DAYS_PER_YEAR = 240

const toNumber = (value) => Number(value) || 0

export function calcOfferMetrics(offer) {
  const monthlySalary = toNumber(offer.monthlySalary)
  const bonusMonths = toNumber(offer.bonusMonths)
  const monthlyAllowance = toNumber(offer.monthlyAllowance)
  const overtimeHours = toNumber(offer.overtimeHours)
  const annualLeaveDays = toNumber(offer.annualLeaveDays)
  const commuteMinutes = toNumber(offer.commuteMinutes)

  const annualCash = monthlySalary * 12 + monthlySalary * bonusMonths + monthlyAllowance * 12
  const leaveValue = monthlySalary / 30 * annualLeaveDays
  const commuteHoursPerYear = commuteMinutes * 2 * WORK_DAYS_PER_YEAR / 60
  const overtimeHoursPerYear = overtimeHours * 12
  const effectiveHoursPerYear = WORK_DAYS_PER_YEAR * 8 + overtimeHoursPerYear + commuteHoursPerYear
  const totalPackageValue = annualCash + leaveValue
  const effectiveHourlyValue = effectiveHoursPerYear > 0 ? totalPackageValue / effectiveHoursPerYear : 0

  return {
    name: offer.name,
    annualCash,
    leaveValue,
    totalPackageValue,
    commuteHoursPerYear,
    overtimeHoursPerYear,
    effectiveHoursPerYear,
    effectiveHourlyValue,
  }
}

export function compareOffers(offerA, offerB) {
  const metricsA = calcOfferMetrics(offerA)
  const metricsB = calcOfferMetrics(offerB)

  return {
    offerA: metricsA,
    offerB: metricsB,
    annualWinner: metricsA.totalPackageValue >= metricsB.totalPackageValue ? metricsA.name : metricsB.name,
    hourlyWinner: metricsA.effectiveHourlyValue >= metricsB.effectiveHourlyValue ? metricsA.name : metricsB.name,
    commuteWinner: metricsA.commuteHoursPerYear <= metricsB.commuteHoursPerYear ? metricsA.name : metricsB.name,
  }
}