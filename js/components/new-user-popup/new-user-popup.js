import { parseDate } from "../../utils/parseDate.js"
import { updater } from "../../updater/UpdateObserver.js"

class NewUserPopup extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.template = document.createElement('template')
    this.closeBtn = null
    this.addBtn = null
    this.form = null

    this.closeBtnHandler = this.closeBtnHandler.bind(this)
    this.addBtnHandler = this.addBtnHandler.bind(this)
  }

  closeBtnHandler() {
    this.remove()
  }

  addBtnHandler() {
    const newUser = {}
    for (const popupInput of this.shadowRoot.querySelectorAll('popup-input')) {
      if (!popupInput.input.reportValidity()) return
      console.log(popupInput.input.type, new Date(popupInput.inputValue))
      newUser[popupInput.input.id] = popupInput.input.type === 'date'
        ? parseDate(new Date(popupInput.inputValue))
        : popupInput.inputValue
    }
    newUser.id = new Date().getTime()
    updater.dispatch('new-user', newUser)
    this.addBtn.btn.textContent = 'Done!'
    setTimeout(() => {
      this.remove()
    }, 1500)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.closeBtn = this.shadowRoot.querySelector('#close')
    this.addBtn = this.shadowRoot.querySelector('#add')
    this.closeBtn.addEventListener('click', this.closeBtnHandler)
    this.addBtn.addEventListener('click', this.addBtnHandler)
  }

  disconnectedCallback() {
    this.closeBtn.removeEventListener('click', this.closeBtnHandler)
    this.addBtn.removeEventListener('click', this.addBtnHandler)
  }

  render() {
    return `
      <style>
        :host {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          right: 0;
          z-index: 5;
          background-color: rgba(52, 58, 64, 0.5);
          overflow: hidden;
        }
        section {
          display: flex;
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 320px;
          background-color: #fff;
          padding: 5%;
          justify-content: center;
          border-radius: 30px;
        }
        #form {
          display: flex;
          flex-direction: column;
        }
        popup-input {
          display: flex;
          justify-content: center;
          margin-bottom: 5%;
          align-self: flex-start;
        }
        popup-input:last-child {
          align-self: center;
        }
        h2 {
          width: 1px;
          height: 1px;
          position: absolute;
          clip: rect(0, 0, 0, 0);
        }
      </style>
      <section>
        <h2>Adding New User Popup</h2>
        <form id="form">
          <popup-input
            input-name="first_name"
            input-placeholder="Helena"
          >
            First Name
          </popup-input>
          <popup-input
            input-name="last_name"
            input-placeholder="Doe"
          >
            Last Name
          </popup-input>
          <popup-input
            input-name="gender"
            input-placeholder="Female"
          >
            Gender
          </popup-input>
          <popup-input
            input-name="city"
            input-placeholder="Boston"
          >
            City
          </popup-input>
          <popup-input
            input-name="company"
            input-placeholder="Microsoft"
          >
            Company
          </popup-input>
          <popup-input
            input-name="role"
            input-placeholder="Manager"
          >
            Role
          </popup-input>
          <popup-input
            input-name="date_of_birth"
          >
            Date
          </popup-input>
          <div id="btn-container">
            <table-button id="add" btntype="newUser">Add</table-button>
          </div>
        </form>
        <table-button id="close" btntype="close">&#10006;</table-button>
      </section>
    `
  }
}

customElements.define('new-user-popup', NewUserPopup)
