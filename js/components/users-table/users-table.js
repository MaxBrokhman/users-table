class UsersTable extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this._data = []
    this.body = null
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

  get data() {
    return this._data
  }

  set data(value) {
    this._data = value
    this._renderWithNewData()
  }

  editHandler(evt) {
    const target = evt.composedPath().find(element => element.iseditable !== undefined)
    if (!target || target.iseditable) return
    if (target) {
      console.log('editing ', target)
      target.iseditable = true
    }
  }

  render() {
    return `
      ${this.styles}
      <table id="table">
        <thead>
          <table-row header-row></table-row>
        </thead>
        <tbody id="body">
          <slot></slot>
        </tbody>
      </table>
    `
  }

  _renderWithNewData() {
    this.body.innerHTML = ''
    const fragment = document.createDocumentFragment()
    this.data.forEach((item) => {
      const tr = document.createElement('table-row')
      tr.data = item
      fragment.appendChild(tr)
    })
    this.body.appendChild(fragment)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.body = this.shadowRoot.querySelector('#body')
    this.addEventListener('click', this.editHandler)
    this._renderWithNewData()
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.editHandler)
  }
}

customElements.define('users-table', UsersTable)
