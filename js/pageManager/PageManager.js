import { createUserRow } from '../createUserRow.js'
import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../updater/UpdateObserver.js'
import { pagePaginator } from '../features/pagePagination.js'

class PageManager {
  constructor({
    paginator, 
    dataManager, 
    container, 
    dataProcessor,
  }){
    this.paginator = paginator
    this.dataManager = dataManager
    this.container = container
    this.dataProcessor = dataProcessor
    this.updatePage = this.updatePage.bind(this)
    this.updatePage()
  }

  updatePage() {
    this.container.innerHTML = ''
    const fragment = document.createDocumentFragment()
    this.paginator.setMaxPages(this.dataManager.getData().length)
    const start = (this.paginator.currentPage - 1) * this.paginator.itemsNumberOnPage
    const end = this.paginator.currentPage * this.paginator.itemsNumberOnPage
    const dataToDisplay = this.dataManager.pick(start, end)
    dataToDisplay.forEach(data => {
      fragment.appendChild(
        this.dataProcessor(data)
      )
    })
    this.container.appendChild(fragment)
  }
}

export const pageManager = new PageManager({
  paginator: pagePaginator,
  dataManager: usersManager,
  container: document.querySelector('.main-table-body'),
  dataProcessor: createUserRow,
})

updater.subscribe(pageManager.updatePage)
