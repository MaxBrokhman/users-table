import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../UpdateObserver.js'
import { pageNumber, pagePaginator } from './pagePagination.js'

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')

const search = () => {
  usersManager.searchTerm = searchInput.value
  pagePaginator.currentPage = 1
  pageNumber.textContent = pagePaginator.currentPage
  updater.dispatch()
}

searchForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  search()
})

searchInput.addEventListener('input', () => {
  usersManager.searchTerm = searchInput.value
  search()
})
