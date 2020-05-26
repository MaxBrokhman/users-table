import { compose } from './utils/compose.js'
import { normalizeString } from './utils/normalizeString.js'
import { replaceSpacesWithUnderlines } from './utils/replaceSpacesWithUnderlines.js'

const convertHeaderToProp = compose(
  replaceSpacesWithUnderlines,
  normalizeString,
)

const tableHeaders = document.querySelectorAll('.main-table-header')

export const createUserRow = (user) => {
  const tr = document.createElement('tr')
  tr.dataset.userId = user.id
  tableHeaders.forEach((header) => {
    const prop = convertHeaderToProp(header.textContent)
    const td = document.createElement('td')
    const contentSpan = document.createElement('span')
    contentSpan.textContent = user[prop]
    td.classList.add('table-cell', 'table-cell__with-data')
    td.appendChild(contentSpan)
    if (prop.includes('date')) {
      td.dataset.type = 'date'
    }
    tr.appendChild(td)
  })
  return tr
}
