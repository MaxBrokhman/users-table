import { convertHeaderToProp } from './utils/string.js'
import { usersManager } from './usersManager/usersManager.js'
import { headers } from './config.js'

// const createCell = (header, user) => {
//   const prop = convertHeaderToProp(header)
//   const cell = document.createElement('table-cell')
//   console.log(cell)
//   cell.cellContent = user[prop]
//   cell.dataset.type = prop
//   return cell
// }

export const createUserRow = (user) => {
  const tr = document.createElement('table-row')
  // const deleteRowHandler = () => {
  //   if (confirm('Are you sure you what to delete user? \n It cannot be undone!')) {
  //     usersManager.remove(user.id)
  //     deleteButton.removeEventListener('click', deleteRowHandler)
  //   }
  // }
  // deleteButton.addEventListener('click', deleteRowHandler)
  tr.data = user
  return tr
}
