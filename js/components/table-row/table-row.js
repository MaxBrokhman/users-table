import { headers } from '../../config.js'
import { convertHeaderToProp } from '../../utils/string.js'
import { updater } from '../../updater/UpdateObserver.js'

const formattedHeaders = headers.map(convertHeaderToProp)

class TableRow extends HTMLElement {
  static get dataKeys() {
    return formattedHeaders
  }
  constructor() {
    super()
    this.template = document.createElement('template')
    this.data = {}
    this.userId = null
    this.deleteBtn = null

    this.deleteBtnHandler = this.deleteBtnHandler.bind(this)
    this.cellUpdateHandler = this.cellUpdateHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.classList.add('user-row')
    this.userId = this.data.id
    this.addEventListener('update-user', this.cellUpdateHandler)
    this.appendChild(this.template.content.cloneNode(true))
    this.deleteBtn = this.querySelector('.delete-row-btn')
    this.deleteBtn.addEventListener('click', this.deleteBtnHandler)
  }

  disconnectedCallback() {
    this.deleteBtn.removeEventListener('click', this.deleteBtnHandler)
    this.removeEventListener('update-user', this.cellUpdateHandler)
    this.data = null
  }

  _renderTableCells() {
    return TableRow.dataKeys.map(key => `
    <table-cell 
      cellContent="${this.data[key]}"
      type="${key}"
    ></table-cell>`).join('')
  }

  deleteBtnHandler() {
    if (confirm('Are you sure you what to delete user? \n It cannot be undone!')) {
      updater.dispatch('delete-user', this.userId)
      this.remove()
    }
  }

  cellUpdateHandler({ detail }) {
    const updatedData = {
      ...this.data,
      ...detail,
    }
    updater.dispatch('update-user', {
      id: this.userId,
      data: updatedData,
    })
    this.data = updatedData
  }

  render() {
    return `
        ${this._renderTableCells()}
        <button 
          class="btn delete-row-btn danger-btn"
          title="delete user"
        >&mdash;
        </button>
      `
  }
}

customElements.define('table-row', TableRow)
