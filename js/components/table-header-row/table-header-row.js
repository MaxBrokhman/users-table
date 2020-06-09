import { headers } from '../../config.js'

class TableHeaderRow extends HTMLElement {
  static get headerKeys() {
    return headers
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }

  render() {
    return `
      ${TableHeaderRow.headerKeys.map((key) => `<table-header>${key}</table-header>`).join('')}
    `
  }
}

customElements.define('table-header-row', TableHeaderRow)
