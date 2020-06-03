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

setanimationOptions = ({
  selector = null,
  threshold = 1,
  animation = "fadeIn",
  duration = 1000,
  delay = 0,
  easing = "linear",
  fill = "forwards",
  once = true
} = {}) => ({
  selector,
  threshold,
  animation,
  duration,
  delay,
  easing,
  fill,
  once
});

/**
 * This function initializes a scrolling direction tracker
 * Working code but currently not in use

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
*/

handleEntry = (entry, observer, options) => {
  let { duration, fill, delay, easing } = options;
  let animationOptions = { duration, fill, delay, easing };
  console.log(options.animation, animationKeyFrames[options.animation]);
  if (entry.isIntersecting) {
    entry.target.animate(
      // keyframes
      animationKeyFrames[options.animation],
      // timing options
      animationOptions
    )
    // when enabled, remove observer after effect played once
    if (options.once) observer.unobserve(entry.target);
  } else {    
    entry.target.animate(
      // keyframes
      animationKeyFrames[options.animation],
      // timing options
      { direction: "reverse", ...animationOptions}
    )
  }
}

let createObserver = (options) => {
  if (!options.selector) throw new Error ("No selector was given, expected a string");
  
  let selectItems = document.querySelectorAll(options.selector);
  let intersectionEffect = (entries, observer) => entries.forEach(entry => handleEntry(entry, observer, options));
  let observer = new IntersectionObserver(intersectionEffect, setObserverOptions(options));
  selectItems.forEach(t => observer.observe(t));
} 
let obs = createObserver(setanimationOptions({
  selector: ".item",
  once: false,
  animation: "fadeOut",
}));

let animationKeyFrames = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 }
  ],
  fadeOut: [
    { opacity: 1 },
    { opacity: 0 }
  ]
}