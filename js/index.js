import { compose } from './utils/compose.js'
import { users } from './users/users.js'
import { normalizeString } from './utils/normalizeString.js'
import { replaceSpacesWithUnderlines } from './utils/replaceSpacesWithUnderlines.js'
import { appendChildren } from './dom-operations/appendChildren.js'
import { parseDate } from './utils/parseDate.js'
import { pagePaginator } from './pagePagination.js'

const fragmentContainer = document.createDocumentFragment()

const convertHeaderToProp = compose(
  replaceSpacesWithUnderlines,
  normalizeString,
)

const tableHeaders = document.querySelectorAll('.main-table-header')
const tableBody = document.querySelector('.main-table-body')
const addUserBtn = document.querySelector('.add-btn')
const outline = document.querySelector('.outline')
const newUserForm = document.querySelector('.new-user-form')
const popupCloseBtn = document.querySelector('.popup-close-btn')
const newUserBtn = document.querySelector('.new-user-btn')

outline.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    outline.classList.add('visually-hidden')
  }
})
popupCloseBtn.addEventListener('click', () => {
  outline.classList.add('visually-hidden')
})

addUserBtn.addEventListener('click', () => {
  outline.classList.remove('visually-hidden')
})

newUserForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const newUser = {}
  newUserForm.querySelectorAll('input').forEach((input) => {
    newUser[input.name] = input.type === 'date'
      ? parseDate(new Date(input.value))
      : input.value
  })
  newUser.id = users.length 
    ? users[users.length - 1].id + 1
    : 0 
  users.push(newUser)
  const btnOriginalCaption = newUserBtn.textContent
  newUserBtn.textContent = 'Done!'
  setTimeout(() => {
    outline.classList.add('visually-hidden')
    newUserBtn.textContent = btnOriginalCaption
  }, 1000)
  console.log(users)
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

    const updateCell = () => {
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
      updateCell()
      form.removeEventListener('submit', formSubmitHandler)
    }
    const inputBlurHandler = () => {
      updateCell()
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
  tr.dataset.userId = user.id
  tableHeaders.forEach((header) => {
    const prop = convertHeaderToProp(header.textContent)
    const td = document.createElement('td')
    const contentSpan = document.createElement('span')
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
