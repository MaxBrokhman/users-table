class PopupInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.input = null
  }

  get inputName() {
    return this.getAttribute('input-name')
  }

  get inputPlaceHolder() {
    return this.getAttribute('input-placeholder')
  }

  get inputValue() {
    return this.input.value
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.input = this.shadowRoot.querySelector(`#${this.inputName}`)
  }

  render() {
    return `
      <style>
        label {
          width: 100px;
          display: block;
          align-self: center;
        }
        input {
          padding: 5px;
        }
      </style>
      <label for="${this.inputName}">
        <slot></slot>
      </label>
      <input 
        id=${this.inputName}
        required
        placeholder="${this.inputPlaceHolder}"
        type="${this.inputName.toLowerCase().includes('date') ? 'date' : ''}"
      >
    `
  }
}

customElements.define('popup-input', PopupInput)
