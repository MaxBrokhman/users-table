import { convertHeaderToProp } from './utils/string.js'
import { usersManager } from './usersManager/usersManager.js'
import { updater } from './updater/UpdateObserver.js'

const tableHeaders = document.querySelectorAll('.main-table-header')

const createTd = (header, user) => {
  const prop = convertHeaderToProp(header.querySelector('.table-header-caption').textContent)
  const td = document.createElement('td')
  const contentSpan = document.createElement('span')
  contentSpan.classList.add('table-cell-data')
  contentSpan.textContent = user[prop]
  td.classList.add('table-cell', 'table-cell__with-data')
  td.appendChild(contentSpan)
  td.dataset.type = prop
  return td
}

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
  tableHeaders.forEach((header) => tr.appendChild(createTd(header, user)))
  tr.appendChild(deleteButton)
  return tr
}