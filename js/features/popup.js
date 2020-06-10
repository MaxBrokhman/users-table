const addUserBtn = document.querySelector('.add-btn')
addUserBtn.addEventListener('click', (evt) => {
  const target = evt.target
  if (target && target.tagName.toLowerCase() === 'button') {
    const popup = document.createElement('new-user-popup')
    document.body.appendChild(popup)
  }
})
