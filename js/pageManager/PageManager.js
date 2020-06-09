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
}

export const pageManager = new PageManager({
  paginator: pagePaginator,
  dataManager: usersManager,
  container: document.querySelector('users-table'),
})

updater.subscribe('delete-user', usersManager.remove)
updater.subscribe('delete-user', pageManager.updatePageWithNext)
updater.subscribe('change-page', pageManager.updatePage)
