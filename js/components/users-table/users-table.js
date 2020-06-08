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
        tr {
          height: 45px;
        }
        tr:nth-of-type(odd) {
          background-color: antiquewhite;
        }
        tr:nth-of-type(even) {
          background-color: gainsboro;
        }
        table-cell {
          display: table-cell;
          text-align: left;
          min-height: 20px;
          border: 1px solid rgba(0,0,0,.125);
          box-sizing: border-box;
          padding: 0;
          width: calc(1200px/7);
          padding-left: 10px;
          font-size: .9rem;
          contain: content;
          vertical-align: middle;
          transition: background-color 0.5s ease;
          cursor: pointer;
        }
        tr table-cell:hover {
          background-color: darkgrey;
        }
      </style>
    `

    this.editHandler = this.editHandler.bind(this)
  }

  editHandler(evt) {
    const target = evt.composedPath().find(element => element.iseditable !== undefined)
    if (target.iseditable) return
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
