import { headers } from '../../config.js'
import { convertHeaderToProp } from '../../utils/string.js'

const formattedHeaders = headers.map(convertHeaderToProp)

class TableRow extends HTMLElement {
  static get dataKeys() {
    return formattedHeaders
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.data = {}
    this.userId = null
    this.deleteBtn = null

    this.deleteBtnHandler = this.deleteBtnHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.classList.add('user-row')
    this.userId = this.data.id
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.deleteBtn = this.shadowRoot.querySelector('table-button')
    this.deleteBtn.addEventListener('click', this.deleteBtnHandler)
  }

  disconnectedCallback() {
    this.deleteBtn.removeEventListener('click', this.deleteBtnHandler)
    this.data = null
  }

  
  deleteBtnHandler() {
    if (confirm('Are you sure you what to delete user? \n It cannot be undone!')) 
      this.remove()
  }

  render() {
    return `
      ${TableRow.dataKeys.map(key => `
        <table-cell 
          cellContent="${this.data[key]}"
          type="${key}"
        ></table-cell>`).join('')}
      <table-button btntype="delete" title="delete user">&mdash;</table-button>
    `
  }
}

customElements.define('table-row', TableRow)
