export const parseDate = (date) => {
  if (date && !Number.isNaN(+date)) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthFormatted = month < 10 
      ? `0${month}`
      : `${month}`
    const day = date.getDate()
    const dayFomratted = day < 10 
      ? `0${day}`
      : `${day}` 
  
    return `${dayFomratted}.${monthFormatted}.${year}`
  }
  return ''
}
