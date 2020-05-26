import { users } from './users/users.js'

const firstBtn = document.querySelector('.pagination-btn__first')
const previousBtn = document.querySelector('.pagination-btn__previous')
const nextBtn = document.querySelector('.pagination-btn__next')
const lastBtn = document.querySelector('.pagination-btn__last')
const pageNumber = document.querySelector('.pagination-number')

const DEFAULT_ITEMS_ON_PAGE = 9

class PagePaginator {
  constructor(maxPages){
    this.maxPages = maxPages
    this._counter = 1
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

export const pagePaginator = new PagePaginator(
  Math.ceil(users.length / DEFAULT_ITEMS_ON_PAGE)
)

firstBtn.addEventListener('click', () => {
  pagePaginator.currentPage = 1
  pageNumber.textContent = pagePaginator.currentPage
})

previousBtn.addEventListener('click', () => {
  pagePaginator.getPreviousPage()
  pageNumber.textContent = pagePaginator.currentPage
})

nextBtn.addEventListener('click', () => {
  pagePaginator.getNextPage()
  pageNumber.textContent = pagePaginator.currentPage
})

lastBtn.addEventListener('click', () => {
  pagePaginator.currentPage = pagePaginator.maxPages
  pageNumber.textContent = pagePaginator.currentPage
})
