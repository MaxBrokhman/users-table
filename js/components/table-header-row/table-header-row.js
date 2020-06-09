import { headers } from '../../config.js'
import { convertHeaderToProp } from '../../utils/string.js'
import { updater } from '../../updater/UpdateObserver.js'

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
    if (targetBtn) {
      const header = path.find(element => 
        element.tagName && element.tagName.toLowerCase() === 'table-header')
      const sort = convertHeaderToProp(header.textContent)
      const order = targetBtn.btntype
      updater.dispatch('sort', { sort, order })
    }
  }

  render() {
    return `
      ${TableHeaderRow.headerKeys.map((key) => `<table-header>${key}</table-header>`).join('')}
    `
  }
}

customElements.define('table-header-row', TableHeaderRow)
