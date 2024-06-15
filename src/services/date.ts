export function getLocalDate(date?: string) {
  if (!date) {
    return ''
  }
  const dateObject = new Date(date)
  const yearInfo = (dateObject.getFullYear() !== new Date().getFullYear()) ? {
    year: 'numeric'
  } : {}
  const monthInfo = (dateObject.getMonth() !== new Date().getMonth()) ? {
    month: 'short'
  } : {}
  const dayInfo = (dateObject.getDate() !== new Date().getDate()) ? {
    day: '2-digit'
  } : {}
  return String(dateObject.toLocaleString(undefined, {
    ...yearInfo,
    ...monthInfo,
    ...dayInfo,
    hour: '2-digit',
    minute: '2-digit'
  } as Intl.DateTimeFormatOptions))
}
