export const map = (arr, fn) => {
  const res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    res.push(fn(arr[i], i, arr))
  }
  return res
}
