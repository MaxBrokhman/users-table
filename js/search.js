import { usersManager } from './DataManager.js'
import { updater } from './UpdateObserver.js'

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  usersManager.searchTerm = searchInput.value
  updater.dispatch()
})

searchInput.addEventListener('input', () => {
  usersManager.searchTerm = searchInput.value
  updater.dispatch()
})
