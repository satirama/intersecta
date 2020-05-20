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
var observation = function () {
  this.hello = function() {
    return 'hello!';
  }

  this.goodbye = function() {
    return 'goodbye!';
  }
  return {
    hello: this.hello,
    goodbye: this.goodbye,
  }
};
observation().hello;



let previousY = 0;
let currentY = window.scrollY;
let scrollingDown = currentY > previousY;
let options = {
  root: null,
  rootMargin: '0px',
  threshold: 1
}

let transitionEffect = (entries) => { 
  entries.forEach((entry, index) => {
    if (currentY != window.scrollY) {
      previousY = currentY;          
      currentY = window.scrollY;
      scrollingDown = currentY > previousY;
    }
    if (entry.isIntersecting) {
      //console.log(entry,'bhsjhbjsd', index);
      //console.log('scrollingDown', scrollingDown)
    }
    
  });
};

let targets = document.querySelectorAll('.item');
let observer = new IntersectionObserver(transitionEffect, options);
targets.forEach((t, i) => {
  //console.log(t,i,'hbdbhjdsbhj');
  observer.observe(t);
})