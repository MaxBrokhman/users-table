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
  updater.dispatch('change-page')
}

firstBtn.addEventListener('click', () => {
  if (pagePaginator.currentPage !== 1) {
    pagePaginator.currentPage = 1
    updater.dispatch('change-page')
  }
})

previousBtn.addEventListener('click', () => {
  const currentPage = pagePaginator.currentPage
  const previousPage = pagePaginator.getPreviousPage()
  if (currentPage !== previousPage) updatePage()
})

nextBtn.addEventListener('click', () => {
  const currentPage = pagePaginator.currentPage
  const nextPage = pagePaginator.getNextPage()
  if (currentPage !== nextPage) updatePage()
})

lastBtn.addEventListener('click', () => {
  if (pagePaginator.currentPage !== pagePaginator.maxPages) {
    pagePaginator.currentPage = pagePaginator.maxPages
    updatePage()
  }
})
