export const addElementClass = (...names) => (element) => {
  element.classList.add(...names)
  return element
}
