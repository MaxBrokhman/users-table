import { compose } from './utils/compose.js'
import { users } from './users/users.js'
import { normalizeString } from './utils/normalizeString.js'
import { replaceSpacesWithUnderlines } from './utils/replaceSpacesWithUnderlines.js'
import { appendChildren } from './dom-operations/appendChildren.js'
import { parseDate } from './utils/parseDate.js'

const fragmentContainer = document.createDocumentFragment()

const convertHeaderToProp = compose(
  replaceSpacesWithUnderlines,
  normalizeString,
)

const tableHeaders = document.querySelectorAll('.main-table-header')
const tableBody = document.querySelector('.main-table-body')
const addUserBtn = document.querySelector('.add-btn')

addUserBtn.addEventListener('click', () => {
  
})

const tableEditHandler = (evt) => {
  const currentCell = evt.target
  if (currentCell.tagName.toLowerCase() === 'span') {
    const initialValue = currentCell.textContent
    const form = document.createElement('form')
    const input = document.createElement('input')
    const confirmBtn = document.createElement('button')
    confirmBtn.textContent = 'ok'
    confirmBtn.className = 'btn confirm-btn'
    input.style.width = `${currentCell.parentElement.offsetWidth}px`
    input.style.height = `${currentCell.parentElement.offsetHeight}px`
    const td = currentCell.parentElement
    input.value = initialValue
    if (currentCell.parentElement.dataset.type && 
      currentCell.parentElement.dataset.type === 'date') {
      input.type = 'date'
    }
    form.appendChild(input)
    form.appendChild(confirmBtn)

    const replaceFormWithSpan = () => {
      const isDateInput = input.type === 'date'
      const enteredText = isDateInput
        ? new Date(input.value)
        : input.value
      td.innerHTML = ''
      const contentSpan = document.createElement('span')
      contentSpan.textContent = isDateInput 
      ? parseDate(enteredText)
      : enteredText
      td.appendChild(contentSpan)
    }

    const formSubmitHandler = (evt) => {
      evt.preventDefault()
      replaceFormWithSpan()
      form.removeEventListener('submit', formSubmitHandler)
    }
    const inputBlurHandler = () => {
      replaceFormWithSpan()
      input.removeEventListener('blur', inputBlurHandler)
    }
    form.addEventListener('submit', formSubmitHandler)
    input.addEventListener('blur', inputBlurHandler)
    td.innerHTML = ''
    td.appendChild(form)
    input.focus()
  }
}

tableBody.addEventListener('click', tableEditHandler)

const appendToTableBody = appendChildren(tableBody)

const createUserTr = (user) => {
  const tr = document.createElement('tr')
  tableHeaders.forEach((header) => {
    const prop = convertHeaderToProp(header.textContent)
    const td = document.createElement('td')
    const contentSpan = document.createElement('span')
    contentSpan.setAttribute('tabindex', 0)
    contentSpan.textContent = user[prop]
    td.classList.add('table-cell', 'table-cell__with-data')
    td.appendChild(contentSpan)
    if (prop.includes('date')) {
      td.dataset.type = 'date'
    }
    tr.appendChild(td)
  })
  return tr
}

const appendTrToFragment = (user) => fragmentContainer.appendChild(
  createUserTr(user)
)

users.slice(0, 9).forEach(appendTrToFragment)

appendToTableBody(fragmentContainer)
