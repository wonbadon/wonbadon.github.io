// 勞退新制（2005/7/1後）：勞基法第17條
// 每工作滿1年，給1/2個月平均工資；未滿1年者，以比例計算
// 最高發給6個月平均工資

// 勞退舊制（2005/7/1前）：
// 每工作滿1年，給1個月平均工資；未滿1年按比例；最高6個月

export function calcSeverance({ avgSalary, yearsNew, yearsOld }) {
  const yN = Number(yearsNew) || 0
  const yO = Number(yearsOld) || 0
  const salary = Number(avgSalary)

  // 新制：年資 × 1/2 個月，上限 6 個月
  const newSystemRaw = yN * 0.5 * salary
  const newSystemPay = Math.min(newSystemRaw, salary * 6)

  // 舊制：年資 × 1 個月，上限 6 個月
  const oldSystemRaw = yO * salary
  const oldSystemPay = Math.min(oldSystemRaw, salary * 6)

  const total = newSystemPay + oldSystemPay

  return {
    newSystemPay,
    oldSystemPay,
    total,
    newMonths: Math.min(yN * 0.5, 6),
    oldMonths: Math.min(yO, 6),
  }
}
