import { parseDate } from '../utils/parseDate.js'
import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../updater/UpdateObserver.js'

const addUserBtn = document.querySelector('.add-btn')
const overlay = document.querySelector('.overlay')
const newUserForm = document.querySelector('.new-user-form')
const popupCloseBtn = document.querySelector('.popup-close-btn')
const newUserBtn = document.querySelector('.new-user-btn')

overlay.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    overlay.classList.add('visually-hidden')
  }
})
popupCloseBtn.addEventListener('click', () => {
  overlay.classList.add('visually-hidden')
})

addUserBtn.addEventListener('click', () => {
  overlay.classList.remove('visually-hidden')
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
  newUserForm.querySelectorAll('input').forEach((input) => {
    input.value = ''
  })
  setTimeout(() => {
    overlay.classList.add('visually-hidden')
    newUserBtn.textContent = btnOriginalCaption
  }, 1500)
})
