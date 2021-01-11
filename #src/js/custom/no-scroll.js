function scroll() {
  const wrapper = document.querySelector('.wrapper');
  const menuSwitch =  document.querySelector("#menu-switch");
  menuSwitch.addEventListener('click', function () {
    if(menuSwitch.checked === true) {
      wrapper.classList.add('no-scroll');
    } else {
      wrapper.classList.remove('no-scroll');
    }
  })
}

scroll();