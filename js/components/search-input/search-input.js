import { updater } from "../../updater/UpdateObserver.js"

class SearchInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.input = null

    this.inputHandler = this.inputHandler.bind(this)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.input = this.shadowRoot.querySelector('#input')
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
      <style>
        :host {
          display: flex;
        }
        #input {
          align-self: center;
          padding: 5px;
          padding-left: 30px;
          font-size: 0.8rem;
          height: 21px;
          width: 250px;
          border-radius: 5px;
          border-width: 1px;
          background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.63491 3.26001C13.0549 3.26001 15.8349 6.08001 15.8349 9.52001C15.8349 10.98 15.3349 12.3 14.5149 13.38L20.3949 19.32C20.7349 19.68 20.7349 20.24 20.3949 20.58C20.2149 20.76 19.9949 20.84 19.7749 20.84C19.5349 20.84 19.3149 20.76 19.1349 20.58L13.2549 14.62C12.2349 15.36 10.9949 15.78 9.6549 15.78C6.2349 15.78 3.4549 12.96 3.4549 9.52001C3.4349 6.06001 6.21491 3.26001 9.63491 3.26001ZM9.63491 14.2C12.1749 14.2 14.2349 12.1 14.2349 9.52001C14.2349 6.94001 12.1749 4.84001 9.63491 4.84001C7.09491 4.84001 5.03491 6.94001 5.03491 9.52001C5.03491 12.1 7.09491 14.2 9.63491 14.2ZM6.53491 9.60001C6.57491 9.94001 6.8749 10.2 7.2149 10.2C7.2549 10.2 7.2749 10.2 7.3149 10.2C7.6949 10.14 7.9549 9.80001 7.9149 9.42001C7.7749 8.38001 8.9349 7.84001 8.9949 7.82001C9.3349 7.66001 9.49491 7.24001 9.33491 6.90001C9.17491 6.56001 8.7749 6.40001 8.4149 6.54001C8.3349 6.56001 6.25491 7.52001 6.53491 9.60001ZM7.9949 11.12C7.8549 11.26 7.7549 11.48 7.7549 11.68C7.7549 11.9 7.8349 12.1 7.9949 12.24C8.1349 12.38 8.3549 12.48 8.5549 12.48C8.7549 12.48 8.9749 12.4 9.1149 12.24C9.2549 12.1 9.3549 11.88 9.3549 11.68C9.3549 11.48 9.2749 11.26 9.1149 11.12C8.9749 10.98 8.7549 10.88 8.5549 10.88C8.3549 10.88 8.1549 10.96 7.9949 11.12Z" fill="darkgrey"/></svg>');
          background-repeat: no-repeat;
          background-position: 3% 50%;
        }
      </style>
      <input type="text" id="input" placeholder="Type to search">
    `
  }
}

customElements.define('search-input', SearchInput)
