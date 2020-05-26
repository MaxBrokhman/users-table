import { users } from './users/users.js'
import { updater } from './UpdateObserver.js'

const firstBtn = document.querySelector('.pagination-btn__first')
const previousBtn = document.querySelector('.pagination-btn__previous')
const nextBtn = document.querySelector('.pagination-btn__next')
const lastBtn = document.querySelector('.pagination-btn__last')
const pageNumber = document.querySelector('.pagination-number')

class PagePaginator {
  constructor(dataLength){
    this._counter = 1
    this._max = 9
    this.maxPages = Math.ceil(dataLength / this._max)
  }

  get itemsNumberOnPage() {
    return this._max
  }

  get currentPage() {
    return this._counter
  }

  set currentPage(num) {
    this._counter = num
    return this
  }

  getNextPage() {
    return this._counter + 1 <= this.maxPages 
      ? this._counter += 1
      : this._counter
  }

  getPreviousPage() {
    return this._counter - 1 >= 1
      ? this._counter -= 1
      : this._counter
  }
}

export const pagePaginator = new PagePaginator(users.length)

const updateUsers = () => {
  updater.dispatch({
    start: (pagePaginator.currentPage - 1) * pagePaginator.itemsNumberOnPage,
    end: pagePaginator.currentPage * pagePaginator.itemsNumberOnPage,
  })
}

firstBtn.addEventListener('click', () => {
  pagePaginator.currentPage = 1
  pageNumber.textContent = pagePaginator.currentPage
  updateUsers()
})

previousBtn.addEventListener('click', () => {
  pagePaginator.getPreviousPage()
  pageNumber.textContent = pagePaginator.currentPage
  updateUsers()
})

nextBtn.addEventListener('click', () => {
  pagePaginator.getNextPage()
  pageNumber.textContent = pagePaginator.currentPage
  updateUsers()
})

lastBtn.addEventListener('click', () => {
  pagePaginator.currentPage = pagePaginator.maxPages
  pageNumber.textContent = pagePaginator.currentPage
  updateUsers()
})
