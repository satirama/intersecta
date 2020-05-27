/**
 * User data:
 * input selector
 * input threshold
 * input transition
 * input scroll (both ways - only scrolling down - only scrolling up)
 * input duration
 * input delay
 * input once
 */

 /**
  * Private functions
  * default options
  * replace with user options
  * assign transition
  * unobserve if it is called only once
  * method to get item being called
  * method to get if screen is scrolling direction
  */


const setOptions = ({
  root = null,
  rootMargin = '0px',
  threshold = 1
} = {}) => ({
  root,
  rootMargin,
  threshold
});

/**
 * This function initializes a scrolling direction tracker
 */
let scrollingDirection = () => {
  let currentY = window.scrollY;
  let previousY = 0;

  let isDownwards = () => {
    currentY = window.scrollY;
    return currentY > previousY;
  }
  let updatePrevious = () => previousY = currentY;

  let getDirection = () => {
    const down = isDownwards();
    updatePrevious();
    return down;
  }
  return {
    isScrollingDown: getDirection
  }
}

let track = scrollingDirection();

let transitionEffect = (entries) => { 
  //console.log('entries', entries);
  console.log(track.isScrollingDown());
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      //console.log(entry,'bhsjhbjsd', index);
      //console.log('scrollingDown', scrollingDown)
    }
    
  });
};

let selectItems = (selector) => document.querySelectorAll(selector);

//console.log(selectItems('.item'), 'hbsja');
let targets = document.querySelectorAll('.item');
let observer = new IntersectionObserver(transitionEffect, setOptions());
targets.forEach((t, i) => {
  //console.log(t,i,'hbdbhjdsbhj');
  observer.observe(t);
})