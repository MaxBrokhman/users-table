class PopupInput extends HTMLElement {
  constructor() {
    super()
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

  get labelCaption() {
    return this.getAttribute('label-caption') || ''
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.appendChild(this.template.content.cloneNode(true))
    this.input = this.querySelector(`#${this.inputName}`)
  }

  render() {
    return `
      <label for="${this.inputName}" class="new-user-form__label">
        ${this.labelCaption}
      </label>
      <input 
        id=${this.inputName}
        required
        placeholder="${this.inputPlaceHolder}"
        type="${this.inputName.toLowerCase().includes('date') ? 'date' : ''}"
        class="new-user-form__input"
      >
    `
  }
}

customElements.define('popup-input', PopupInput)
