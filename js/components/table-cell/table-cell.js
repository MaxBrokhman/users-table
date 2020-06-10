import { parseDate } from "../../utils/parseDate.js"

class TableCell extends HTMLElement {
  static get observedAttributes() {
    return ['iseditable']
  }
  constructor() {
    super()
    this.template = document.createElement('template')
    this.contentSpan = null
    this.form = null
    this.input = null

    this.submitHandler = this.submitHandler.bind(this)
    this.blurHandler = this.blurHandler.bind(this)
  }

  get iseditable() {
    return this.hasAttribute('iseditable')
  }

  set iseditable(status) {
    this.hasAttribute('iseditable')
      ? this.removeAttribute('iseditable')
      : this.setAttribute('iseditable', '')
  }

  get cellContent() {
    return this.getAttribute('cellContent') || ''
  }

  set cellContent(value) {
    this.setAttribute('cellContent', value)
  }

  get isDateInput() {
    return this.hasAttribute('type') && this.getAttribute('type').includes('date')
  }

  appendContent(value) {
    this.contentSpan.textContent = value
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'iseditable':
          if (this.iseditable) {
            this.innerHTML = this.render()
            this.form = this.querySelector('#form')
            this.input = this.querySelector('input')
            this.style.padding = '0'
            this.input.style.height = `${this.clientHeight}px`
            this.input.style.width = `${this.clientWidth}px`
            this._initListeners()
            this.input.focus()
            if (this.input.type === 'text')
              this.input.setSelectionRange(this.cellContent.length, this.cellContent.length)
          } else {
            this._destroyListeners()
            this.style.padding = ''
            this.innerHTML = this.render()
            this.contentSpan = this.querySelector('#content')
          }
      }
    }
  }

  _initListeners() {
    this.form.addEventListener('submit', this.submitHandler)
    this.input.addEventListener('blur', this.blurHandler)
  }

  _destroyListeners() {
    this.form.removeEventListener('submit', this.submitHandler)
    this.input.removeEventListener('blur', this.blurHandler)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.className = 'table-cell table-cell__with-data'
    this.appendChild(this.template.content.cloneNode(true))
    this.contentSpan = this.querySelector('#content')
  }

  disconnectedCallback() {
    if (this.iseditable)
      this._destroyListeners()
  }

  _parseNewValue(value) {
    const newValue = this.isDateInput
      ? new Date(value)
      : value
    const newContent = this.isDateInput 
      ? parseDate(newValue)
      : newValue 
    this.cellContent = newContent
    this.iseditable = false
    this.dispatchEvent(
      new CustomEvent('update-user', {
        composed: true, 
        bubbles: true, 
        detail: { [this.getAttribute('type')]: newContent },
      })
    )
  }

  submitHandler (evt) {
    evt.preventDefault()
    this._parseNewValue(this.input.value)
  }

  blurHandler() {
    this._parseNewValue(this.input.value)
  }

  render() {
    return `
      ${this.iseditable 
        ? `
        <form id="form">
          <input 
            value="${this.isDateInput ? '' : this.cellContent}" 
            type="${this.isDateInput ? 'date' : 'text'}"
          >
          <button 
            class="btn confirm-btn success-btn"
          >✔</button>
        </form>`
        : `<span id="content" class="table-cell-data">${this.cellContent}</span>`}
      `
  }
}

customElements.define('table-cell', TableCell)
