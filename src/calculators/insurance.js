import {
  DEFAULT_OCCUPATIONAL_ACCIDENT_RATE,
  HEALTH_INSURANCE_BRACKETS,
  HEALTH_INSURANCE_EMPLOYER_DEPENDENT_FACTOR,
  HEALTH_INSURANCE_MAX_DEPENDENTS,
  HEALTH_INSURANCE_RATE,
  HEALTH_INSURANCE_RATIO,
  LABOR_INSURANCE_BRACKETS,
  LABOR_INSURANCE_RATE,
  LABOR_INSURANCE_RATIO,
} from '../data/insurance'
import { getMonthlyContributionBase } from './laborPension'

const toNumber = (value) => Number(value) || 0
const round = (value) => Math.round(value)

function findBracket(salary, brackets) {
  const amount = toNumber(salary)
  return brackets.find((item) => item >= amount) || brackets[brackets.length - 1]
}

export function getLaborInsuranceBase(salary) {
  return findBracket(salary, LABOR_INSURANCE_BRACKETS)
}

export function getHealthInsuranceBase(salary) {
  return findBracket(salary, HEALTH_INSURANCE_BRACKETS)
}

export function getLaborPensionBase(salary) {
  return getMonthlyContributionBase(salary)
}

export function getInsuranceBracketSummary(salary) {
  const monthlySalary = toNumber(salary)

  return {
    salary: monthlySalary,
    laborInsuranceBase: getLaborInsuranceBase(monthlySalary),
    healthInsuranceBase: getHealthInsuranceBase(monthlySalary),
    pensionBase: getLaborPensionBase(monthlySalary),
  }
}

export function calcInsurancePremiums({
  salary,
  dependents = 0,
  voluntaryPensionRate = 0,
  occupationalRate = DEFAULT_OCCUPATIONAL_ACCIDENT_RATE,
  employerHealthDependentFactor = HEALTH_INSURANCE_EMPLOYER_DEPENDENT_FACTOR,
}) {
  const monthlySalary = toNumber(salary)
  const laborInsuranceBase = getLaborInsuranceBase(monthlySalary)
  const healthInsuranceBase = getHealthInsuranceBase(monthlySalary)
  const pensionBase = getLaborPensionBase(monthlySalary)
  const dependentsCount = Math.max(0, Math.min(HEALTH_INSURANCE_MAX_DEPENDENTS, toNumber(dependents)))
  const voluntaryRate = Math.max(0, Math.min(6, toNumber(voluntaryPensionRate))) / 100
  const occupationalRatePercent = Math.max(0, Math.min(10, toNumber(occupationalRate)))
  const occupationalRateDecimal = occupationalRatePercent / 100
  const employerFactor = Math.max(0, toNumber(employerHealthDependentFactor))

  const workerLaborInsurance = round(laborInsuranceBase * LABOR_INSURANCE_RATE * LABOR_INSURANCE_RATIO.worker)
  const employerLaborInsurance = round(laborInsuranceBase * LABOR_INSURANCE_RATE * LABOR_INSURANCE_RATIO.employer)
  const governmentLaborInsurance = round(laborInsuranceBase * LABOR_INSURANCE_RATE * LABOR_INSURANCE_RATIO.government)

  const workerHealthInsurance = round(
    healthInsuranceBase * HEALTH_INSURANCE_RATE * HEALTH_INSURANCE_RATIO.worker * (1 + dependentsCount),
  )
  const employerHealthInsurance = round(
    healthInsuranceBase * HEALTH_INSURANCE_RATE * HEALTH_INSURANCE_RATIO.employer * (1 + employerFactor),
  )
  const governmentHealthInsurance = round(
    healthInsuranceBase * HEALTH_INSURANCE_RATE * HEALTH_INSURANCE_RATIO.government * (1 + employerFactor),
  )

  const employerOccupationalInsurance = round(laborInsuranceBase * occupationalRateDecimal)
  const mandatoryPension = round(pensionBase * 0.06)
  const voluntaryPension = round(pensionBase * voluntaryRate)

  const employeeTotalDeduction = workerLaborInsurance + workerHealthInsurance + voluntaryPension
  const employerTotalBurden = employerLaborInsurance + employerHealthInsurance + employerOccupationalInsurance + mandatoryPension
  const governmentTotalBurden = governmentLaborInsurance + governmentHealthInsurance

  return {
    salary: monthlySalary,
    laborInsuranceBase,
    healthInsuranceBase,
    pensionBase,
    dependentsCount,
    voluntaryRate: voluntaryRate * 100,
    occupationalRatePercent,
    employerHealthDependentFactor: employerFactor,
    workerLaborInsurance,
    employerLaborInsurance,
    governmentLaborInsurance,
    workerHealthInsurance,
    employerHealthInsurance,
    governmentHealthInsurance,
    employerOccupationalInsurance,
    mandatoryPension,
    voluntaryPension,
    employeeTotalDeduction,
    employerTotalBurden,
    governmentTotalBurden,
    takeHomePay: monthlySalary - employeeTotalDeduction,
  }
}