import { usersManager } from '../usersManager/usersManager.js'
import { updater } from '../UpdateObserver.js'
import { convertHeaderToProp } from '../utils/string.js'

const tableHeaders = document.querySelectorAll('.main-table-header')
const sortButtons = document.querySelectorAll('.sort-btn')

const btnClickHandler = (order, prop) => (evt) => {
  if (usersManager.sortTerm !== prop) usersManager.setSorting(prop)
  if (usersManager.orderTerm !== order) usersManager.setOrder(order)
  if (!evt.currentTarget.classList.contains('sort-btn__active')) {
    sortButtons.forEach(btn => btn.classList.remove('sort-btn__active'))
    evt.currentTarget.classList.add('sort-btn__active')
  }
  updater.dispatch()
}

const setSort = (header) => {
  const prop = convertHeaderToProp(header.querySelector('.table-header-caption').textContent)
  const upBtn = header.querySelector('.sort-btn__up')
  const downBtn = header.querySelector('.sort-btn__down')
  upBtn.addEventListener('click', btnClickHandler('asc', prop))
  downBtn.addEventListener('click', btnClickHandler('desc', prop))
}

tableHeaders.forEach(setSort)
