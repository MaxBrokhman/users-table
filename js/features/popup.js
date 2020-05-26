import { parseDate } from '../utils/parseDate.js'
import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../updater/UpdateObserver.js'

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
    newUser[input.id] = input.type === 'date'
      ? parseDate(new Date(input.value))
      : input.value
  })
  newUser.id = new Date().getTime()
  usersManager.add(newUser)
  const btnOriginalCaption = newUserBtn.textContent
  updater.dispatch()
  newUserBtn.textContent = 'Done!'
  setTimeout(() => {
    outline.classList.add('visually-hidden')
    newUserBtn.textContent = btnOriginalCaption
  }, 1500)
})
