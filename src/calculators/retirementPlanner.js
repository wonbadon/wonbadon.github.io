import { getMonthlyContributionBase } from './laborPension'

const toNumber = (value) => Number(value) || 0

function futureValueOfSeries(monthlyContribution, monthlyRate, months) {
  if (months <= 0) return 0
  if (monthlyRate === 0) return monthlyContribution * months
  return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
}

export function calcLaborInsuranceAnnuity(averageInsuredSalary, insuredYears) {
  const salary = toNumber(averageInsuredSalary)
  const years = toNumber(insuredYears)

  const planA = salary * years * 0.00775 + 3000
  const planB = salary * years * 0.0155

  return {
    planA: Math.round(planA),
    planB: Math.round(planB),
    chosen: Math.round(Math.max(planA, planB)),
    method: planA >= planB ? 'A 式' : 'B 式',
  }
}

export function buildRetirementScenario({
  currentAge,
  targetAge,
  insuredYears,
  averageInsuredSalary,
  currentBalance,
  monthlySalary,
  voluntaryRate,
  annualReturnRate,
  lifeExpectancy,
}) {
  const current = toNumber(currentAge)
  const target = toNumber(targetAge)
  const remainingYears = Math.max(0, target - current)
  const projectedInsuredYears = toNumber(insuredYears) + remainingYears
  const annuity = calcLaborInsuranceAnnuity(averageInsuredSalary, projectedInsuredYears)

  const pensionBase = getMonthlyContributionBase(toNumber(monthlySalary))
  const voluntaryRateDecimal = Math.max(0, Math.min(6, toNumber(voluntaryRate))) / 100
  const employerMonthly = pensionBase * 0.06
  const voluntaryMonthly = pensionBase * voluntaryRateDecimal
  const monthlyContribution = employerMonthly + voluntaryMonthly

  const months = remainingYears * 12
  const monthlyRate = toNumber(annualReturnRate) / 100 / 12
  const futureExistingBalance = toNumber(currentBalance) * Math.pow(1 + monthlyRate, months)
  const futureContributionValue = futureValueOfSeries(monthlyContribution, monthlyRate, months)
  const projectedBalance = futureExistingBalance + futureContributionValue
  const drawMonths = Math.max(1, (toNumber(lifeExpectancy) - target) * 12)
  const estimatedMonthlyDraw = projectedBalance / drawMonths

  return {
    targetAge: target,
    remainingYears,
    projectedInsuredYears,
    pensionBase,
    employerMonthly: Math.round(employerMonthly),
    voluntaryMonthly: Math.round(voluntaryMonthly),
    monthlyContribution: Math.round(monthlyContribution),
    projectedBalance: Math.round(projectedBalance),
    estimatedMonthlyDraw: Math.round(estimatedMonthlyDraw),
    annuity,
    combinedMonthlyIncome: Math.round(annuity.chosen + estimatedMonthlyDraw),
  }
}

export function buildRetirementAgeOptions(params) {
  const startAge = Math.max(60, toNumber(params.currentAge))
  const ages = Array.from({ length: 6 }, (_, index) => startAge + index)
  return ages.map((age) => buildRetirementScenario({ ...params, targetAge: age }))
}