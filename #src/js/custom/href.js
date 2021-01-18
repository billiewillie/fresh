const selectHref = document.querySelector('#selectHref')
const productsHref = "http://localhost:3000/products.html"
if(selectHref){
  function changeHref() {
    let value = selectHref.options[selectHref.selectedIndex].value;
    if(value === "all_goods") {
      window.location.href = productsHref
    };
  }
  selectHref.addEventListener('change', () => changeHref())
}