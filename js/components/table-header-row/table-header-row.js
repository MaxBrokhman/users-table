import { headers } from '../../config.js'
import { convertHeaderToProp } from '../../utils/string.js'
import { updater } from '../../updater/UpdateObserver.js'
import { usersManager } from '../../usersManager/usersManager.js'

class TableHeaderRow extends HTMLElement {
  static get headerKeys() {
    return headers
  }
  constructor() {
    super()
    this.template = document.createElement('template')

    this.sortHandler = this.sortHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.addEventListener('click', this.sortHandler)
    this.appendChild(this.template.content.cloneNode(true))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.sortHandler)
  }

  sortHandler(evt) {
    const target = evt.target
    if (
      target && 
      target.tagName.toLowerCase() ==='button' && 
      !target.classList.contains('sort-btn__active')
    ) {
      const header = target.closest('th')
      const sort = convertHeaderToProp(header.textContent)
      const order = target.dataset.type
      
      updater.dispatch('sort', { sort, order })
      this.querySelector('.sort-btn__active').classList.remove('sort-btn__active')
      target.classList.add('sort-btn__active')
    }
  }

  render() {
    return `
      ${TableHeaderRow.headerKeys.map((key) => `
      <th class="table-cell main-table-header">
        <span class="table-header-caption">${key}</span>
        <button
          title="sort in ascending order" 
          data-type="asc"
          class="btn sort-btn sort-btn__up reqular-btn ${convertHeaderToProp(key) === usersManager.sortTerm ? 'sort-btn__active' : ''}"
        ></button>
        <button 
          class="btn sort-btn sort-btn__down reqular-btn"
          title="sort in descending order" 
          data-type="desc"
        ></button>
      </th>
    `).join('')}
    `
  }
}

customElements.define('table-header-row', TableHeaderRow)
