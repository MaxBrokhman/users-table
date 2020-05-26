import { users } from '../users/users.js'
import { updater } from '../updater/UpdateObserver.js'
import { PagePaginator } from '../pagePaginator/PagePaginator.js'

const firstBtn = document.querySelector('.pagination-btn__first')
const previousBtn = document.querySelector('.pagination-btn__previous')
const nextBtn = document.querySelector('.pagination-btn__next')
const lastBtn = document.querySelector('.pagination-btn__last')
export const pageNumber = document.querySelector('.pagination-number')

export const pagePaginator = new PagePaginator(users.length)

const updatePage = () => {
  pageNumber.textContent = pagePaginator.currentPage
  updater.dispatch()
}

firstBtn.addEventListener('click', () => {
  pagePaginator.currentPage = 1
  updatePage()
})

previousBtn.addEventListener('click', () => {
  pagePaginator.getPreviousPage()
  updatePage()
})

nextBtn.addEventListener('click', () => {
  pagePaginator.getNextPage()
  updatePage()
})

lastBtn.addEventListener('click', () => {
  pagePaginator.currentPage = pagePaginator.maxPages
  updatePage()
})
