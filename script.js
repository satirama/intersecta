/**
 * Options for the intersection observer API
 * 
 * More information at: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
 * 
 * @param {Element} root object whose bounding box is used as the bounds of the viewport 
 * @param {string} rootMargin offsets for one or more sides of the root's bounding box.
 * @param {number} threshold list or value of intersection thresholds for the observer
 * @returns {object} with the defined or default options
 */
setObserverOptions = ({
  root = null,
  rootMargin = '0px',
  threshold = 1
} = {}) => ({
  root,
  rootMargin,
  threshold
});

setTransitionOptions = ({
  selector = null,
  animation = "fadeIn",
  duration = 2000,
  delay = 0,
  timing = "ease",
  fill = "forwards",
  once = true
} = {}) => ({
  selector,
  animation,
  duration,
  delay,
  timing,
  fill,
  once
});

/**
 * This function initializes a scrolling direction tracker
 */
let withScrollingDirection = () => {
  let currentY = window.scrollY;
  let previousY = 0;

  let isDownwards = () => currentY > previousY;
  
  let updatePosition = () => {
    previousY = currentY;
    currentY = window.scrollY;
  };

  let isScrollingDown = () => {
    updatePosition();
    return isDownwards();
  }
  return {
    isScrollingDown: isScrollingDown,
    updatePosition: updatePosition
  }
}

handleEntry = (entry, observer, options) => {
  //console.log(entry);
  let { duration, fill, delay } = options;
  let transitionOptions = { duration, fill, delay };
  if (entry.isIntersecting) {
    entry.target.animate(
      // keyframes
      transitionsKeyFrames[options.animation],
      // timing options
      transitionOptions
    )
    // remove observer after effect played once
    if (options.once) observer.unobserve(entry.target);
  } else {    
    entry.target.animate(
      // keyframes
      transitionsKeyFrames[options.animation],
      // timing options
      { direction: "reverse", ...transitionOptions}
    )
  }
}

let createObserver = (options) => {
  let intersectionEffect = (entries, observer) => entries.forEach(entry => handleEntry(entry, observer, options));
  let selectItems = document.querySelectorAll(options.selector);
  let observer = new IntersectionObserver(intersectionEffect, setObserverOptions());
  selectItems.forEach(t => observer.observe(t));
} 
let obs = createObserver(setTransitionOptions({
  selector: ".item",
  once: false
}));

let transitionsKeyFrames = {
  fadeIn: [
    {opacity:0},
    {opacity:1}
  ]
}