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
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')

    this.sortHandler = this.sortHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.addEventListener('click', this.sortHandler)
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.sortHandler)
  }

  sortHandler(evt) {
    const path = evt.composedPath()
    const targetBtn = path.find(element => 
      element.tagName && element.tagName.toLowerCase() === 'table-button')
    if (targetBtn && !targetBtn.classList.contains('active')) {
      const header = path.find(element => 
        element.tagName && element.tagName.toLowerCase() === 'table-header')
      const sort = convertHeaderToProp(header.textContent)
      const order = targetBtn.btntype
      updater.dispatch('sort', { sort, order })
      this.shadowRoot.querySelector('table-button.active').classList.remove('active')
      targetBtn.classList.add('active')
    }
  }

  render() {
    return `
      ${TableHeaderRow.headerKeys.map((key, idx) => `
      <table-header>
        ${key}
        <table-button
          title="sort in ascending order" 
          btntype="asc"
          slot="buttons"
          class="${convertHeaderToProp(key) === usersManager.sortTerm ? 'active' : ''}"
        ></table-button>
        <table-button 
          title="sort in descending order" 
          btnType="desc"
          slot="buttons"
        ></table-button>
      </table-header>
    `).join('')}
    `
  }
}

customElements.define('table-header-row', TableHeaderRow)
