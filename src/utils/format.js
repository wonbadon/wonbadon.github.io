export function formatCurrency(value) {
  return Math.round(Number(value) || 0).toLocaleString('zh-TW')
}

export function formatNumber(value, digits = 0) {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function formatPercent(value, digits = 1) {
  return `${formatNumber(value, digits)}%`
}

export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}