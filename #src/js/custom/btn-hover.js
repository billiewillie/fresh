const btnHover = document.querySelectorAll('.btn-hover');
btnHover.forEach(el => {
  let desktop = window.matchMedia('(min-width: 992px)');
  if(desktop.matches){
    el.append(document.createElement("span"))
    el.addEventListener('mouseenter', ev => {
      const parentOffset = el.getBoundingClientRect();
      const relX = ev.pageX - parentOffset.left;
      const relY = ev.pageY - parentOffset.top;
      el.querySelector('span').style.top = `${relY}px`;
      el.querySelector('span').style.left = `${relX}px`;
    })
    el.addEventListener('mouseout', ev => {
      const parentOffset = el.getBoundingClientRect();
      const relX = ev.pageX - parentOffset.left;
      const relY = ev.pageY - parentOffset.top;
      el.querySelector('span').style.top = `${relY}px`;
      el.querySelector('span').style.left = `${relX}px`;
    })
  }
})
