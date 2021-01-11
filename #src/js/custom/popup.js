const menuSwitch = document.querySelector('#menu-switch');
const btnChange = document.querySelector('.btn-change');
menuSwitch.addEventListener('click', evt => {
  if (menuSwitch.checked) btnChange.classList.add('btn-up')
  else btnChange.classList.remove('btn-up')
})

window.popupInit = function () {
  const cdPopupTrigger = document.querySelectorAll('.cd-popup-trigger');
  const cdPopup = document.querySelector('.cd-popup');

  cdPopupTrigger.forEach(e => {
    e.addEventListener('click', ev => {
      cdPopup.classList.add('is-visible');
    })
  })

  cdPopup.addEventListener('click', e => {
    if (e.target.classList.contains('cd-popup-close') || e.target.classList.contains('cd-popup')) {
      e.preventDefault();
      cdPopup.classList.remove('is-visible');
    }
  })

  document.addEventListener('keyup', e => {
    if (e.which == '27') {
      cdPopup.classList.remove('is-visible');
    }
  })
}
window.popupInit()