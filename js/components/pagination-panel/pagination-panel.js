import { updater } from "../../updater/UpdateObserver.js"

class PaginationPanel extends HTMLElement {
  static get observedAttributes() {
    return ['current-page']
  }
  constructor() {
    super()
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
    this.className = "pagination-btn-container"
    this.addEventListener('click', this.clickHandler)
    this.appendChild(this.template.content.cloneNode(true))
    this.contentSpan = this.querySelector('#content')
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
    if (evt.target && evt.target.tagName.toLowerCase() === 'button') {
      updater.dispatch('page-change', evt.target.id)
    }
  }

  render() {
    return `
      <button id="first" title="first page" class="btn pagination-btn pagination-btn__first reqular-btn">&lt;&lt;</button>
      <button class="btn pagination-btn pagination-btn__previous reqular-btn" id="previous" title="previous page">&lt;</button>
      <span id="content" class="pagination-number">1</span>
      <button class="btn pagination-btn pagination-btn__next reqular-btn" id="next" title="next page">></button>
      <button class="btn pagination-btn pagination-btn__last reqular-btn" id="last" title="last page">>></button>
    `
  }
}

customElements.define('pagination-panel', PaginationPanel)
