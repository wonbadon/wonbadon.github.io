// 依勞工退休金條例與勞保局開放資料，使用 115/01/01 生效月提繳分級表。
// 雇主強制提繳與勞工自願提繳，皆應依月提繳工資級距申報。
const SALARY_BRACKETS = [
  1500, 3000, 4500, 6000, 7500, 8700, 9900, 11100,
  12540, 13500, 15840, 16500, 17280, 17880, 19047, 20008,
  21009, 22000, 23100, 24000, 25250, 26400, 27600, 28590,
  29500, 30300, 31800, 33300, 34800, 36300, 38200, 40100,
  42000, 43900, 45800, 48200, 50600, 53000, 55400, 57800,
  60800, 63800, 66800, 69800, 72800, 76500, 80200, 83900,
  87600, 92100, 96600, 101100, 105600, 110100, 115500, 120900,
  126300, 131700, 137100, 142500, 147900, 150000,
]

export function getMonthlyContributionBase(salary) {
  const s = Number(salary)
  return SALARY_BRACKETS.find(b => b >= s) || 150000
}

export function calcLaborPension({ salary, voluntaryRate = 0, years = 30, annualReturnRate = 3 }) {
  const s = Number(salary)
  const base = getMonthlyContributionBase(s)
  const employerRate = 0.06
  const vRate = Number(voluntaryRate) / 100
  const yrs = Number(years)
  const monthlyRate = Number(annualReturnRate) / 100 / 12
  const months = yrs * 12

  const employerMonthly = Math.round(base * employerRate)
  const voluntaryMonthly = Math.round(base * vRate)
  const totalMonthly = employerMonthly + voluntaryMonthly

  // 複利終值公式：PMT × ((1+r)^n - 1) / r
  function futureValue(monthly, r, n) {
    if (r === 0) return monthly * n
    return monthly * ((Math.pow(1 + r, n) - 1) / r)
  }

  const totalAccumulated = futureValue(totalMonthly, monthlyRate, months)
  const totalContributed = totalMonthly * months

  return {
    base,
    employerMonthly,
    voluntaryMonthly,
    totalMonthly,
    totalAccumulated: Math.round(totalAccumulated),
    totalContributed: Math.round(totalContributed),
    earnings: Math.round(totalAccumulated - totalContributed),
  }
}
