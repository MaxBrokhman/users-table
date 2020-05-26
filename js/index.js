import { users } from './users/users.js'
import { parseDate } from './utils/parseDate.js'
import { pagePaginator } from './pagePagination.js'
import { DataManager } from './DataManager.js'
import { createUserRow } from './createUserRow.js'
import { updater } from './UpdateObserver.js'

const usersManager = new DataManager(users)

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
  newUser.id = usersManager.getData().length 
    ? usersManager.getData()[usersManager.getData().length - 1].id + 1
    : 0 
  usersManager.add(newUser)
  const btnOriginalCaption = newUserBtn.textContent
  newUserBtn.textContent = 'Done!'
  setTimeout(() => {
    outline.classList.add('visually-hidden')
    newUserBtn.textContent = btnOriginalCaption
  }, 1000)
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

const updateUsers = (pages) => {
  tableBody.innerHTML = ''
  const fragment = document.createDocumentFragment()
  const usersToDisplay = usersManager.pick(pages.start, pages.end)
  usersToDisplay.forEach(user => {
    fragment.appendChild(
      createUserRow(user)
    )
  })
  tableBody.appendChild(fragment)
}

updater.subscribe(updateUsers)

updateUsers({ 
  start: pagePaginator.currentPage - 1, 
  end: pagePaginator.itemsNumberOnPage, 
})

