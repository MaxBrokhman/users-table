import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../updater/UpdateObserver.js'
import { pagePaginator } from '../features/pagePagination.js'

class PageManager {
  constructor({
    paginator, 
    dataManager, 
    container,
  }){
    this.paginator = paginator
    this.dataManager = dataManager
    this.container = container
    this.updatePage = this.updatePage.bind(this)
    this.updatePageWithNext = this.updatePageWithNext.bind(this)
    this.updateOnSort = this.updateOnSort.bind(this)
    this.updateOnDelete = this.updateOnDelete.bind(this)
    this.updateOnSearch = this.updateOnSearch.bind(this)
    this.updatePage()
  }

  updatePage() {
    this.paginator.setMaxPages(this.dataManager.getData().length)
    const start = (this.paginator.currentPage - 1) * this.paginator.itemsNumberOnPage
    const end = this.paginator.currentPage * this.paginator.itemsNumberOnPage
    this.container.setData(this.dataManager.pick(start, end))
  }

  updatePageWithNext() {
    const end = this.paginator.currentPage * this.paginator.itemsNumberOnPage
    const dataToAdd = this.dataManager.pick(end - 1, end)
    dataToAdd.length && this.container.updateData(dataToAdd[0])
  }

  updateOnSort({ sort, order }) {
    if (
      this.dataManager.sortTerm !== sort || 
      this.dataManager.orderTerm !== order
    ) {
      this.dataManager
        .setSorting(sort)
        .setOrder(order)
      this.updatePage()
    } 
  }

  updateOnDelete(id) {
    this.dataManager.remove(id)
  }

  updateOnSearch(search) {
    this.paginator.currentPage = 1
    this.dataManager.searchTerm = search
    this.updatePage()
  }
}

export const pageManager = new PageManager({
  paginator: pagePaginator,
  dataManager: usersManager,
  container: document.querySelector('users-table'),
})

updater.subscribe('delete-user', pageManager.updateOnDelete)
updater.subscribe('delete-user', pageManager.updatePageWithNext)
updater.subscribe('change-page', pageManager.updatePage)
updater.subscribe('sort', pageManager.updateOnSort)
updater.subscribe('search', pageManager.updateOnSearch)
