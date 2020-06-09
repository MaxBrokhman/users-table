import { updater } from "../../updater/UpdateObserver.js"

class PaginationPanel extends HTMLElement {
  static get observedAttributes() {
    return ['current-page']
  }
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.contentSpan = null

    this.clickHandler = this.clickHandler.bind(this)
  }

  get currentPage() {
    return this.getAttribute('current-page')
  }

  set currentPage(value) {
    this.setAttribute('current-page', value)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.addEventListener('click', this.clickHandler)
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.contentSpan = this.shadowRoot.querySelector('#content')
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.clickHandler)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'current-page':
          this.contentSpan.textContent = this.currentPage
          break
      }
    }
  }

  clickHandler(evt) {
    const path = evt.composedPath()
    const targetBtn = path.find((element) => 
      element.tagName && element.tagName.toLowerCase() === 'button')
    if (targetBtn) {
      updater.dispatch('page-change', targetBtn.id)
    }
  }

  render() {
    return `
      <style>
        :host {
          align-self: center;
          margin-top: 15px;
          display: flex;
          width: 160px;
          justify-content: space-between;
          contain: content;
        }
        button {
          background-color: white;
          border-radius: 0.25rem;
          cursor: pointer;
          border: 1px solid;
          transition: background-color 0.5s ease;
          font: inherit;
          border-color: #343a40;
        }
        button:hover {
          color: white;
          background-color: #343a40;
        }
        #content {
          display: block;
          width: 20px;
          background-color: white;
          border-radius: 0.25rem;
          font: inherit;
          border: 1px solid #343a40;
          text-align: center;
          margin: 0 5px;
          padding: 5px;
        }
      </style>
      <button id="first" title="first page">&lt;&lt;</button>
      <button id="previous" title="previous page">&lt;</button>
      <span id="content">1</span>
      <button id="next" title="next page">></button>
      <button id="last" title="last page">>></button>
    `
  }
}

customElements.define('pagination-panel', PaginationPanel)
