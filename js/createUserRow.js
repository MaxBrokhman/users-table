import { compose } from './utils/compose.js'
import { normalizeString } from './utils/normalizeString.js'
import { replaceSpacesWithUnderlines } from './utils/replaceSpacesWithUnderlines.js'
import { usersManager } from './DataManager.js'
import { updater } from './UpdateObserver.js'

export const convertHeaderToProp = compose(
  replaceSpacesWithUnderlines,
  normalizeString,
)

const tableHeaders = document.querySelectorAll('.main-table-header')

export const createUserRow = (user) => {
  const tr = document.createElement('tr')
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn', 'delete-row-btn', 'danger-btn')
  deleteButton.textContent = '-'
  deleteButton.addEventListener('click', () => {
    if (confirm('Are you sure you what to delete user? \n It cannot be undone!')) {
      usersManager.remove(user.id)
      updater.dispatch()
    }
  })
  tr.classList.add('user-row')
  tr.dataset.userId = user.id
  tableHeaders.forEach((header) => {
    const prop = convertHeaderToProp(header.querySelector('.table-header-caption').textContent)
    const td = document.createElement('td')
    const contentSpan = document.createElement('span')
    contentSpan.classList.add('table-cell-data')
    contentSpan.textContent = user[prop]
    td.classList.add('table-cell', 'table-cell__with-data')
    td.appendChild(contentSpan)
    td.dataset.type = prop
    tr.appendChild(td)
  })
  tr.appendChild(deleteButton)
  return tr
}
