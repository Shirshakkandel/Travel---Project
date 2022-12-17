//COMMENT::option first
// const hikeExp = document.querySelector('.hike-exp');

// window.addEventListener('scroll', scrollReveal);

// function scrollReveal() {
//   //   console.log(hikeExp);
//   const hikePosition = hikeExp.getBoundingClientRect().top;
//   const windowPos = window.innerHeight / 1.5;
//   console.log(hikePosition);
//   if (hikePosition < windowPos) {
//     hikeExp.style.color = 'red';
//   }
// }
//COMMENT::option second
// //selection of element
// const slide = document.querySelector('.slide');

// const observer = new IntersectionObserver(
//   //callback function which get entries and observer as parameter in callback function
//   function (entries) {
//     entries.forEach(entry => {
//       console.log(entry);
//       if (entry.isIntersecting) {
//         slide.style.background = 'red';
//       }
//     });
//   },
//   //options object which can take  root?: Element | Document | null; rootMargin?: string;
//   //threshold ?: number | number[];
//   { threshold: 0.9 }
// );

// //observe
// observer.observe(slide);

//COMMENT::Method three
const controller = new ScrollMagic.Controller();

//we create different scene.
const exploreScene = new ScrollMagic.Scene({
  triggerElement: '.hike-exp',
  triggerHook: 0.5,
})
  .addIndicators({ colorStart: 'white', colorTrigger: 'white' })
  .setClassToggle('.hike-exp', 'active')
  .addTo(controller);
