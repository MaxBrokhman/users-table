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
    this.updatePage()
  }

  updatePage() {
    this.paginator.setMaxPages(this.dataManager.getData().length)
    const start = (this.paginator.currentPage - 1) * this.paginator.itemsNumberOnPage
    const end = this.paginator.currentPage * this.paginator.itemsNumberOnPage
    const dataToDisplay = this.dataManager.pick(start, end)
    this.container.data = dataToDisplay
  }
}

export const pageManager = new PageManager({
  paginator: pagePaginator,
  dataManager: usersManager,
  container: document.querySelector('users-table'),
})

updater.subscribe(pageManager.updatePage)
