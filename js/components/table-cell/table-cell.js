import { parseDate } from "../../utils/parseDate.js"

class TableCell extends HTMLElement {
  static get observedAttributes() {
    return ['iseditable']
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
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
    console.log('is date getter', this.dataset)
    return this.hasAttribute('type') && this.getAttribute('type').includes('date')
  }

  appendContent(value) {
    console.log('appending ', value);
    this.contentSpan.textContent = value
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'iseditable':
          if (this.iseditable) {
            this.shadowRoot.innerHTML = this.render()
            this.form = this.shadowRoot.querySelector('#form')
            this.input = this.shadowRoot.querySelector('#input')
            this.style.padding = '0'
            this.input.style.height = `${this.offsetHeight}px`
            this._initListeners()
            this.input.focus()
            if (this.input.type === 'text')
              this.input.setSelectionRange(this.cellContent.length, this.cellContent.length)
            console.log('input type ', this.input.type, this.dataset)
          } else {
            this._destroyListeners()
            this.style.padding = ''
            this.shadowRoot.innerHTML = this.render()
            this.contentSpan = this.shadowRoot.querySelector('#content')
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
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.contentSpan = this.shadowRoot.querySelector('#content')
  }

  disconnectedCallback() {
    console.log('table-cell disconnected')
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
  }

  submitHandler (evt) {
    evt.preventDefault()
    console.log('submited')
    this._parseNewValue(this.input.value)
  }

  blurHandler() {
    console.log('blured')
    this._parseNewValue(this.input.value)
  }

  render() {
    console.log('render', this.isDateInput)
    return `
    <style>
      :host {
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
      :host(:hover) {
        background-color: darkgrey;
      }
      #content {
        padding: 5px;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        word-break: normal;
      }
      #input, #form {
        width: 100%;
        box-sizing: border-box;
      }
      #input {
        padding-left: 10px;
      }
    </style>
    ${this.iseditable 
      ? `
      <form id="form">
        <input 
          id="input" 
          value="${this.isDateInput ? '' : this.cellContent}" 
          type="${this.isDateInput ? 'date' : 'text'}"
        >
        <table-button id="btn" btntype="confirm">✔</table-button>
      </form>`
      : `<span id="content">${this.cellContent}</span>`}
    `
  }
}

customElements.define('table-cell', TableCell)
