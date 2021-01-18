let select = document.getElementById("selectId");
let elem = document.querySelector('.grid');
if(select){
  const categoriesPhoneWidth = document.querySelectorAll('.products__block--wrapper .products__block')
  function change() {
    let value = select.options[select.selectedIndex].value;
    categoriesPhoneWidth.forEach(e => e.style.display = "none")
    document.getElementById(value).style.display = "block"
    if(value === "all_goods") categoriesPhoneWidth.forEach(e => e.style.display = "block")
  }
  select.addEventListener('change', () => change())
}
if(elem){
  let grid = new Isotope( elem, {
    // options
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    percentPosition: true,
    masonry: {
      columnWidth: '.element-item'
    }
  });
  let filterBtn = document.querySelectorAll('.filters-button .filter-btn');
  for (let i = 0; i < filterBtn.length; i++) {
    // Если кликнули по ссылке
    filterBtn[i].onclick = function (click) {
      click.preventDefault();
      filterBtn.forEach(e => e.classList.remove('active'))
      filterBtn[i].classList.add('active')
      let filterData = event.target.getAttribute('data-filter');
      grid.arrange({
        filter: filterData
      });
    };
  }
}

