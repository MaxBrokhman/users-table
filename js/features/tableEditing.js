import { parseDate } from '../utils/parseDate.js'
import { updater } from '../updater/UpdateObserver.js'
import { usersManager } from '../usersManager/usersManager.js'

const tableEditHandler = (evt) => {
  const currentCell = evt.target
  if (currentCell.tagName.toLowerCase() === 'span') {
    const userId = currentCell.closest('.user-row').dataset.userId
    const initialValue = currentCell.textContent
    const form = document.createElement('form')
    const input = document.createElement('input')
    const confirmBtn = document.createElement('button')
    confirmBtn.textContent = 'ok'
    confirmBtn.className = 'btn confirm-btn success-btn'
    input.style.width = `${currentCell.parentElement.offsetWidth}px`
    input.style.height = `${currentCell.parentElement.offsetHeight}px`
    const td = currentCell.parentElement
    const prop = td.dataset.type
    input.value = initialValue
    if (td.dataset.type.includes('date')) {
      input.type = 'date'
    }
    form.appendChild(input)
    form.appendChild(confirmBtn)

    const updateCell = () => {
      const isDateInput = input.type === 'date'
      const enteredText = isDateInput
        ? new Date(input.value)
        : input.value
      
      const newContent = isDateInput 
        ? parseDate(enteredText)
        : enteredText
      
      usersManager.update(userId, { [prop]: newContent })
      updater.dispatch()
    }

    const formSubmitHandler = (evt) => {
      evt.preventDefault()
      updateCell()
      form.removeEventListener('submit', formSubmitHandler)
    }

    const inputBlurHandler = () => {
      updateCell()
      input.removeEventListener('blur', inputBlurHandler)
    }
    
    form.addEventListener('submit', formSubmitHandler)
    input.addEventListener('blur', inputBlurHandler)
    td.innerHTML = ''
    td.appendChild(form)
    input.focus()
  }
}

document.querySelector('.main-table-body').addEventListener('click', tableEditHandler)
