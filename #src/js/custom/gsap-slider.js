const first = document.querySelector('.first')

function gsapSliderInit() {

  gsap.set('.projects', {autoAlpha: 1})
  gsap.set('.project', {x: '-100%'})

  let currentStep = 0
  const totalSlides = document.querySelectorAll('.project').length
  const firstHeight = first.offsetHeight
  const projectsHeight = document.querySelector('.projects').style.height = `${firstHeight-60}px`
  const wrapper = gsap.utils.wrap(0, totalSlides)
  createTimeLineIn('next', currentStep)

  function createTimeLineIn(direction, index) {
    const goPrev = direction === 'prev';
    const element = document.querySelector('div.project0' + index),
      projectClasses = element.className.split(' '),
      projectClass = projectClasses[1],
      title = element.querySelector('.project-title'),
      subtitle = element.querySelector('.project-subtitle'),
      listTitle = element.querySelector('.project-list-title'),
      projectIngredientsIntro = element.querySelector('.project__ingredients--intro'),
      projectIngredientsOutro = element.querySelector('.project__ingredients--outro'),
      list = element.querySelector('.project-list')

    const tlIn = gsap.timeline()
    tlIn
      .fromTo(
        element,
        {autoAlpha: 0, x: '-100%'},
        {
          x: 0,
          duration: .7,
          autoAlpha: 1,
          ease: Power4.out,
          onStart: updateClass,
          onStartParams: [projectClass],
          modifiers: {
            x: gsap.utils.unitize(function (x) {
              return goPrev ? Math.abs(x) : x
            })
          }
        })
      .from(
        [projectIngredientsOutro, title, subtitle, listTitle, list, projectIngredientsIntro],
        {
          duration: .2,
          x: -20,
          autoAlpha: 0,
          stagger: .08
        })

    return tlIn
  }

  function createTimeLineOut(direction, index) {
    const goPrev = direction === 'prev';
    const element = document.querySelector('div.project0' + index)
    const tlOut = gsap.timeline()
    tlOut.to(
      element,
      {
        x: 250,
        duration: .7,
        autoAlpha: 0,
        modifiers: {
          x: gsap.utils.unitize(function (x) {
            return goPrev ? -x : x
          })
        },
        ease: "back.in(2)"
      })

    return tlOut
  }

  function updateCurrentStep(goToIndex) {
    currentStep = goToIndex

    document.querySelectorAll('.dot').forEach((el, index) => {
      el.setAttribute('class', 'dot')
      if (index === currentStep) el.classList.add('active')
    })
    positionDot()
  }

  function transition(direction, toIndex) {
    const tlTransition = gsap.timeline({
      onStart: () => {
        updateCurrentStep(toIndex)
      }
    })

    const tlOut = createTimeLineOut(direction, currentStep)
    const tlIn = createTimeLineIn(direction, toIndex)

    tlTransition
      .add(tlOut)
      .add(tlIn)

    return tlTransition
  }

  function isTweening() {
    return gsap.isTweening('.project')
  }

  // document.querySelector('button.next').addEventListener('click', e => {
  //   e.preventDefault()
  //   const isLast = currentStep === totalSlides
  //   const nextStep = wrapper(currentStep + 1)
  //   !isTweening() && transition('next', nextStep)
  // })
  //
  // document.querySelector('button.prev').addEventListener('click', e => {
  //   e.preventDefault()
  //   const isFirst = currentStep === 0
  //   const prevStep = wrapper(currentStep - 1)
  //   !isTweening() && transition('prev', prevStep)
  // })

  function updateClass(projectClass) {
    if(document.querySelector('body').className.includes('webp')){
      document.querySelector('body').className = `${projectClass} webp`;
    } else {
      document.querySelector('body').className = `${projectClass}`;
    }
  }

  function createNavigation() {
    const newDiv = document.createElement('div')
    newDiv.setAttribute('class', 'dots')

    const spot = document.createElement('div')
    spot.setAttribute('class', 'spot')

    for (let index = 0; index < totalSlides; index++) {

      const element = document.createElement('button')
      const text = document.createTextNode(index)
      element.appendChild(text)
      element.setAttribute('class', 'dot')
      if (currentStep === index) element.classList.add('active')

      element.addEventListener('click', () => {
        if (!isTweening() && currentStep !== index) {
          const direction = index > currentStep ? 'next' : 'prev'
          transition(direction, index)
        }
      })

      newDiv.appendChild(element)
    }
    newDiv.appendChild(spot)
    document.querySelector('.projects').appendChild(newDiv)
    positionDot()
  }

  function positionDot() {
    const activeDotX = document.querySelector('.dot.active').offsetLeft
    const spot = document.querySelector('.spot')
    const spotX = spot.offsetLeft
    const destinationX = Math.round(activeDotX - spotX + 5)

    const dotTl = gsap.timeline()
    dotTl
      .to(
        spot,
        {
          duration: .4,
          x: destinationX,
          scale: 2.5,
          ease: 'power1.Out'
        }
      )
      .to(
        spot,
        {
          duration: .2,
          scale: 1,
          ease: 'power1.in'
        }
      )
  }

  createNavigation()
}

let desktop = window.matchMedia('(min-width: 992px)');
if(desktop.matches && first) window.gsapSliderInit();

