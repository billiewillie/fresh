function initProductsSlider () {
  let swiper = Swiper;
  let init = false;
  let mobile = window.matchMedia('(max-width: 991px)');
  let desktop = window.matchMedia('(min-width: 992px)');
  if(desktop.matches) {
    if (!init) {
      init = true;
      swiperProduct = new Swiper('.products__slider .swiper-container', {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }
}

function initMarketSlider () {
  let swiper = Swiper;
  let init = false;
  let mobile = window.matchMedia('(max-width: 991px)');
  let desktop = window.matchMedia('(min-width: 992px)');
  if(desktop.matches) {
    if (!init) {
      init = true;
      swiperMarket = new Swiper('.slider-marketplace .swiper-container', {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 40,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }
}

window.initSliders = function () {
  const productsSlider = document.querySelector('.products__slider .swiper-container')
  const sliderMarketPlace = document.querySelector('.slider-marketplace .swiper-container')
  if (productsSlider) initProductsSlider();
  if (sliderMarketPlace) initMarketSlider();
}

window.initSliders()
