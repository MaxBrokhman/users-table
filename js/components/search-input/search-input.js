import { updater } from "../../updater/UpdateObserver.js"

class SearchInput extends HTMLElement {
  constructor() {
    super()
    this.template = document.createElement('template')
    this.input = null

    this.inputHandler = this.inputHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.className = 'header-container search-form'
    this.appendChild(this.template.content.cloneNode(true))
    this.input = this.querySelector('#input')
    this.input.addEventListener('input', this.inputHandler)
  }

  disconnectedCallback() {
    this.input.removeEventListener('input', this.inputHandler)
  }

  inputHandler() {
    updater.dispatch('search', this.input.value)
  }

  render() {
    return `
      <input type="text" id="input" placeholder="Type to search" class="search-input">
    `
  }
}

customElements.define('search-input', SearchInput)
