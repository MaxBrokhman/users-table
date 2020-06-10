import { parseDate } from "../../utils/parseDate.js"
import { updater } from "../../updater/UpdateObserver.js"

class NewUserPopup extends HTMLElement {
  constructor() {
    super()
    this.template = document.createElement('template')
    this.closeBtn = null
    this.addBtn = null
    this.form = null
    this.closeBtnHandler = this.closeBtnHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  closeBtnHandler() {
    this.remove()
  }

  submitHandler(evt) {
    evt.preventDefault()
    const newUser = {}
    for (const popupInput of this.querySelectorAll('popup-input')) {
      newUser[popupInput.input.id] = popupInput.input.type === 'date'
        ? parseDate(new Date(popupInput.inputValue))
        : popupInput.inputValue
    }
    newUser.id = new Date().getTime()
    updater.dispatch('new-user', newUser)
    this.addBtn.textContent = 'Done!'
    setTimeout(() => {
      this.remove()
    }, 1500)
  }

  connectedCallback() {
    this.template.innerHTML = this.render()
    this.className = 'overlay'
    this.appendChild(this.template.content.cloneNode(true))
    this.closeBtn = this.querySelector('.popup-close-btn')
    this.addBtn = this.querySelector('.new-user-btn')
    this.form = this.querySelector('form')
    this.closeBtn.addEventListener('click', this.closeBtnHandler)
    this.form.addEventListener('submit', this.submitHandler)
  }

  disconnectedCallback() {
    this.closeBtn.removeEventListener('click', this.closeBtnHandler)
  }

  render() {
    return `
      <section class="new-user-popup">
        <h2 class="visually-hidden">Adding New User Popup</h2>
        <form class="new-user-form">
          <popup-input
            class="new-user-form-container"
            input-name="first_name"
            input-placeholder="Helena"
            label-caption="First Name"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="last_name"
            input-placeholder="Doe"
            label-caption="Last Name"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="gender"
            input-placeholder="Female"
            label-caption="Gender"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="city"
            input-placeholder="Boston"
            label-caption="City"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="company"
            input-placeholder="Microsoft"
            label-caption="Company"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="role"
            input-placeholder="Manager"
            label-caption="Role"
          ></popup-input>
          <popup-input
            class="new-user-form-container"
            input-name="date_of_birth"
            label-caption="Date"
          ></popup-input>
          <div class="new-user-form-container">
            <button 
              class="btn new-user-btn"
            >Add</button>
          </div>
        </form>
        <button
          class="btn popup-close-btn"
        >&#10006;</button>
      </section>
    `
  }
}

customElements.define('new-user-popup', NewUserPopup)
