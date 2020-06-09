class TableHeader extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.styles = `
      <style>
        :host {
          display: table-cell;
          contain: content;
          padding-top: 3px;
          padding-bottom: 3px;
          padding-right: 55px;
          padding-left: 15px;
          position: relative;
          color: #fff;
          background-color: #355794;
          text-align: left;
          min-height: 20px;
          border: 1px solid rgba(0,0,0,.125);
          box-sizing: border-box;
          width: calc(1200px/7);
          font-size: .9rem;
          font-weight: bold;
          vertical-align: middle;
        }
      </style>
    `
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }

  render() {
    return `
      ${this.styles}
      <span><slot></slot></span>
      <slot name="buttons"></slot>
    `
  }
}

customElements.define('table-header', TableHeader)
