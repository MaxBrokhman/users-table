import { stylesByType } from './stylesByType.js'

class TableButton extends HTMLElement {
  static get observedAttributes() {
    return ['btntype']
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.btn = null
  }

  get btntype () {
    return this.getAttribute('btntype') || ''
  }

  set btntype(value) {
    if (!value.length) return
    this.setAttribute('btntype', value)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.btn = this.shadowRoot.querySelector('#btn')
  }

  render() {
    return `
      <style>
        :host {
          display: block;
          contain: content;
        }
        #btn {
          background-color: white;
          border-radius: 0.25rem;
          cursor: pointer;
          border: 1px solid;
          transition: background-color 0.5s ease;
          font: inherit;
        }
        #btn:hover {
          color: white;
        }
        ${stylesByType[this.btntype] || ''}
      </style>
      <button id="btn">
        <slot></slot>
      </button>
    `
  }
}

customElements.define('table-button', TableButton)
