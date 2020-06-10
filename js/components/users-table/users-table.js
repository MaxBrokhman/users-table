class UsersTable extends HTMLElement {
  constructor() {
    super()
    this.template = document.createElement('template')
    this._data = []
    this.body = null
    this.table = null

    this.editHandler = this.editHandler.bind(this)
  }

  get data() {
    return this._data
  }

  setData(data) {
    this._data = data
    this._renderWithNewData()
  }

  updateData(data) {
    this._data.push(data)
    const tr = document.createElement('table-row')
    tr.data = data
    this.body.appendChild(tr)
  }

  editHandler(evt) {
    const target = evt.target
    if (target && target.tagName.toLowerCase() === 'span') {
      const cell = target.closest('table-cell')
      if (!cell || cell.iseditable) return
      cell.iseditable = true
    }
  }

  render() {
    return `
      <table id="table" class="main-table">
        <tbody id="body" class="main-table-body">
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
    this.table = this.template.content.querySelector('#table')
    this.table.insertAdjacentElement('afterbegin', document.createElement('table-header-row'))
    this.addEventListener('click', this.editHandler)
    this.appendChild(this.template.content.cloneNode(true))
    this.body = this.querySelector('#body')
    this._renderWithNewData()
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.editHandler)
  }
}

customElements.define('users-table', UsersTable)
