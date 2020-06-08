/**
 * Available animations.
 * Move to a different file
 */
const animationKeyFrames = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 },
  ],
  fadeOut: [
    { opacity: 1 },
    { opacity: 0 },
  ],
  zoomIn: [
    { transform: 'scale(1, 1)' },
    { transform: 'scale(1.2, 1.2)' },
    { transform: 'scale(1, 1)' },
  ],
};

/**
 * Options for the intersection observer API
 *
 * @param {Element} root object whose bounding box is used as the bounds of the viewport
 * @param {string} rootMargin offsets for one or more sides of the root's bounding box.
 * @param {number} threshold list or value of intersection thresholds for the observer
 * @returns {object} with the defined or default options
 */
const setObserverOptions = ({
  root = null,
  rootMargin = '0px',
  threshold = 1,
} = {}) => ({
  root,
  rootMargin,
  threshold,
});

/**
 * Creates all options needed out of user options object
 *
 * @param {string} selector css selector for desired element
 * @param {number} threshold value of intersection threshold for the observer
 * @param {string} animation chosen effect of available options
 * @param {number} duration number of milliseconds the animation takes to complete
 * @param {number} delay number of milliseconds to delay the start of the animation
 * @param {string} easing rate of animation's change over time
 * @param {string} fill whether animation's effects should be retained after its done
 * @param {boolean} once whether animation should play each time element enters/exits
 * @returns {object} with user defined and/or default options
 */
const setAllOptions = ({
  selector = null,
  threshold = 1,
  animation = 'fadeIn',
  duration = 1000,
  delay = 0,
  easing = 'linear',
  fill = 'forwards',
  once = true,
} = {}) => ({
  selector,
  threshold,
  animation,
  duration,
  delay,
  easing,
  fill,
  once,
});

/**
 * This function initializes a scrolling direction tracker
 * Working code currently not in use

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


/**
 * Callback for Intersection Observer
 * Starts animations for entry according to options
 * @param {object} entry
 * @param {object} observer
 * @param {object} options
 */
const handleEntry = (entry, observer, options) => {
  const animationOptions = (({
    duration, fill, delay, easing,
  }) => ({
    duration, fill, delay, easing,
  }))(options);

  if (entry.isIntersecting) {
    console.log(typeof entry, typeof observer, typeof options);
    entry.target.animate(
      // keyframes
      animationKeyFrames[options.animation],
      // timing options
      animationOptions,
    );

    // when enabled, remove observer after effect played once
    if (options.once) observer.unobserve(entry.target);
  } else {
    entry.target.animate(
      // keyframes
      animationKeyFrames[options.animation],
      // timing options
      { direction: 'reverse', ...animationOptions },
    );
  }
};

/**
 * Core function
 * Starts observer for desired elements according to user options
 * @param {object} userOptions
 */
const createIntersectaObserver = (userOptions) => {
  // Handle wrong inputs
  if (!userOptions.selector) throw new Error('No selector was given, expected a string');
  if (userOptions.threshold && typeof userOptions.threshold !== 'number') throw new Error('Threshold for animations should be a number');

  // set options, items and callback
  const options = setAllOptions(userOptions);
  const selectItems = document.querySelectorAll(options.selector);
  const intersectionEffect = (entries, observer) => {
    entries.forEach((entry) => handleEntry(entry, observer, options));
  };

  // start observer
  const observer = new IntersectionObserver(intersectionEffect, setObserverOptions(options));
  selectItems.forEach((t) => observer.observe(t));
};

export { createIntersectaObserver as default };
