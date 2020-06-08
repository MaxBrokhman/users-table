class UsersTable extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.headerRow = null
    this.body = null
    this._headers = []
    this.styles = `
      <style>
        #table {
          display: table;
          margin: 0 auto;
          border-collapse: collapse;
          border-radius: 5px;
          width: 100%;
        }
        tr, table-row {
          height: 45px;
          display: table-row;
        }
        table-row:nth-of-type(odd) {
          background-color: antiquewhite;
        }
        table-row:nth-of-type(even) {
          background-color: gainsboro;
        }
      </style>
    `

    this.editHandler = this.editHandler.bind(this)
  }

  editHandler(evt) {
    const target = evt.composedPath().find(element => element.iseditable !== undefined)
    if (!target || target.iseditable) return
    if (target) {
      console.log('editing ', target)
      target.iseditable = true
    }
  }

  appendTableRow(row) {
    this.body.appendChild(row)
  }

  get headers() {
    return this._headers
  }

  set headers(value) {
    this._headers = value.length 
      ? value
      : []
    this.headerRow.innerHTML = this._createHeadersRow()
  }

  _createHeadersRow() {
    return this.headers.map(header => `<table-header>${header}</table-header>`).join('')
  }

  render() {
    return `
      ${this.styles}
      <table id="table">
        <thead>
          <tr id="header-row">
          </tr>
        </thead>
        <tbody id="body">
        </tbody>
      </table>
    `
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.headerRow = this.shadowRoot.querySelector('#header-row')
    this.body = this.shadowRoot.querySelector('#body')
    this.addEventListener('click', this.editHandler)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.editHandler)
  }
}

customElements.define('users-table', UsersTable)
