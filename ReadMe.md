# 10)Page Transition using Barba.js
1. at index.html and fashion.html
```html
  <body data-barba="wrapper"></body>
  <main data-barba="container" data-barba-namespace="home"></main>
```
2. second

```javascript
//Barba Page Transitions
const logo = document.querySelector('#logo');
barba.init({
  //object with views array and transition array.
  views: [
    //views is array of object each object contain nameSpace string,beforeEnter and beforeLeave function
    //list pages we want to animate.
    {
      namespace: 'home',
      beforeEnter() {
        animateSlides();
        //as our head section is not change so we have to dynamic provide logo href value.
        logo.href = './index.html';
      },
      beforeLeave() {
        //we destroy all scene created by gsap
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: 'fashion',
      beforeEnter() {
        logo.href = '../index.html';
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    //array of object which contain leave and enter

    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
        //when we leave first timeline to make current section fade out.
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        //one line goes  from -100% to 0%
        tl.fromTo('.swipe', 0.75, { x: '-100%' }, { x: '0%', onComplete: done }, '-=0.5');
      },

      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
        tl.fromTo(
          '.swipe',
          1,
          { x: '0%' },
          //we have 3 swipe and we stagger with 0.2 second on each
          { x: '100%', stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo('.nav-header', 1, { y: '-100%' }, { y: '0%', ease: 'power2.inOut' }, '-=1.5');
      },
    },
  ],
});
```

# **11)Scroll Effect on Other Pages**
```javascript
function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll('.detail-slide');
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    const nextImg = nextSlide.querySelector('img');
    
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, '-=1');
    slideTl.fromTo(nextImg, { x: '50%' }, { x: '0%' });
    
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}
```