export class PagePaginator {
  constructor(dataLength){
    this._counter = 1
    // number of users on page
    this._max = 9
    this.maxPages = Math.ceil(dataLength / this._max)
  }

  setMaxPages(dataLength) {
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
