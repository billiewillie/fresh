const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);
const loader = select('.loader');
const loaderInner = select('.loader .inner');
const loaderMask = select('.loader__mask');
const progressBar = select('.loader .progress');

let tick = 0;

gsap.set(loader, {autoAlpha: 1})
gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: 'bottom'})

const progressTween = gsap.to(progressBar, {
  paused: true,
  scaleX: 0,
  ease: 'none',
  transformOrigin: 'right'
});

let loadedImageCount = 0, imageCount;
const container = select('.wrapper');

const imgLoad = imagesLoaded(container);
imageCount = imgLoad.images.length;

updateProgress(0);

imgLoad.on('progress', function () {
  loadedImageCount++;
  updateProgress(loadedImageCount);
});

function updateProgress(value) {
  gsap.to(progressTween, {progress: value / imageCount, duration: 0.3, ease: 'power1.out'})
}

imgLoad.on('done', function (instance) {
  gsap.set(progressBar, {autoAlpha: 0, onComplete: initPageTransitions});
});

function initLoader() {

  const loaderInner = select('.loader .inner');
  const image = select('.loader__image img');
  const mask = select('.loader__image--mask');
  const loaderContent = select('.loader__content');

  const tlLoaderIn = gsap.timeline({
    defaults: {
      duration: 1.1,
      ease: "power2.out"
    },
    onComplete: () => {
      select('body').classList.remove('is-loading')
      let desktop = window.matchMedia('(min-width: 992px)');
      if(desktop.matches && first) window.gsapSliderInit();
      window.initSliders();
    }
  })

  tlLoaderIn
    .set(loaderContent, {autoAlpha: 1})
    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: 'bottom',
      ease: 'power1.inOut'
    }, .3)
    .addLabel('revealImage')
    .from(mask, {
      yPercent: 100
    }, 'revealImage-=0.6')
    .from(image, {
      yPercent: -50
    }, 'revealImage-=0.6')

  const tlLoaderOut = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power2.out"
    },
    delay: 1
  })

  tlLoaderOut
    .to([loader, loaderContent], {yPercent: -100}, 0)
    .from('.wrapper', {y: 150}, 0)

  const tlLoader = gsap.timeline()
  tlLoader
    .add(tlLoaderIn)
    .add(tlLoaderOut)
}

function pageTransitionIn({container}) {
  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power1.inOut"
    }
  })
  tl
    .set(loaderInner, {autoAlpha: 0})
    .fromTo(loader, {yPercent: -100}, {yPercent: 0})
    .fromTo(loaderMask, {yPercent: 80}, {yPercent: 0}, 0)
    .to(container, {y: 150}, 0)
  return tl
}

function pageTransitionOut({container}) {
  const tl = gsap.timeline({
    defaults: {
      duration: 1.2,
      ease: "power1.inOut"
    }
  })
  tl
    .to(loader, {yPercent: 100})
    .to(loaderMask, {yPercent: -80}, 0)
    .from(container, {y: -150}, 0)
  return tl
}

function initPageTransitions() {
  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning')
  })
  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning')
  })
  barba.hooks.enter(() => {
    window.scrollTo(0, 0)
  })
  barba.init({
    transitions: [{
      once() {
        initLoader();
      },
      async leave({current}) {
        await pageTransitionIn(current);
      },
      enter({next}) {
        pageTransitionOut(next);
      }
    }],
    views: [
      {
        namespace: 'home',
        beforeEnter(data) {
          let desktop = window.matchMedia('(min-width: 992px)');
          if(desktop.matches && first) window.gsapSliderInit();
          window.initSliders();
        },
      }
    ]
  });
}