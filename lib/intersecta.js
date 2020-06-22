import { frames, onceOnlyFrames } from './frames';

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
 * @param {boolean} once whether animation should play each time element enters
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
  waterfall = false,
} = {}) => ({
  selector,
  threshold,
  animation,
  duration,
  delay,
  easing,
  fill,
  once,
  waterfall,
});

/**
 * This function initializes a scrolling direction tracker
 * Working code currently not in use


const withScrollingDirection = () => {
  let currentY = window.scrollY;
  let previousY = 0;

  const isDownwards = () => currentY > previousY;

  const updatePosition = () => {
    previousY = currentY;
    currentY = window.scrollY;
  };

  const getDirection = () => {
    updatePosition();
    return isDownwards();
  };

  return {
    isScrollingDown: getDirection,
  };
};
*/

const handleInputErrors = ((options) => {
  if (!options.selector || typeof options.selector !== 'string') {
    throw new Error('Either no selector was given or it is not a string');
  }
  if (options.threshold
    && typeof options.threshold !== 'number'
    && options.threshold >= 0
    && options.threshold <= 1) {
    throw new Error('Threshold should be a number between 0 and 1 inclusive');
  }
  if (options.animation && typeof options.animation !== 'string') {
    throw new Error(`animation is ${typeof options.animation} expected a string`);
  }
  if (options.duration && typeof options.duration !== 'number') {
    throw new Error(`duration is ${typeof options.duration} expected a number`);
  }
  if (options.delay && typeof options.delay !== 'number') {
    throw new Error(`delay is ${typeof options.delay} expected a number`);
  }
  if (options.easing && typeof options.easing !== 'string') {
    throw new Error(`easing is ${typeof options.easing} expected a string`);
  }
  if (options.once && typeof options.once !== 'boolean') {
    throw new Error(`once is ${typeof options.once} expected a boolean`);
  }
});

const setEvents = (details = null) => ({
  in: new CustomEvent('intersecta:in', { detail: details }),
  out: new CustomEvent('intersecta:out', { detail: details }),
});

/**
 * Callback for Intersection Observer
 * Starts animations for entry according to options
 * @param {object} entry
 * @param {object} observer
 * @param {object} options
 * @param {number} entryIndex
 * @param {object} events
 */
const handleEntry = (entry, observer, entryIndex, options, events) => {
  const animationOptions = (({
    duration, fill, delay, easing,
  }) => ({
    duration, fill, delay, easing,
  }))(options);

  if (entry.isIntersecting && entry.intersectionRatio === options.threshold) {
    // if waterfall is selected, add selected or default delay
    if (options.waterfall) {
      if (animationOptions.delay) {
        animationOptions.delay *= entryIndex;
      } else {
        animationOptions.delay = entryIndex * 100;
      }
    }

    // trigger in event
    entry.target.dispatchEvent(events.in);

    // start animation
    entry.target.animate(
      // keyframes
      frames[options.animation],
      // timing options
      animationOptions,
    );

    // when enabled, remove observer after effect played once
    if (options.once || onceOnlyFrames.has(options.animation)) observer.unobserve(entry.target);
  } else {
    // trigger out event
    entry.target.dispatchEvent(events.out);

    // reverse animation if it depends on opacity property
    entry.target.animate(
      // keyframes
      frames[options.animation],
      // timing options
      { direction: 'reverse', fill: 'forwards', duration: 1 },
    );
  }
};

/**
 * Core function
 * Starts observer for desired elements according to user options
 * @param {object} userOptions
 */
const createIntersectaObserver = (userOptions) => {
  // handle wrong user inputs
  handleInputErrors(userOptions);

  // set events, options, items and callback
  const events = setEvents();
  const options = setAllOptions(userOptions);
  const selectItems = document.querySelectorAll(options.selector);
  const intersectionEffect = (entries, observer) => {
    entries.forEach((entry, index) => handleEntry(entry, observer, index, options, events));
  };
  // start observer
  const observer = new IntersectionObserver(intersectionEffect, setObserverOptions(options));
  selectItems.forEach((t) => observer.observe(t));
  return {
    stop: () => { observer.disconnect(); },
  };
};

export { createIntersectaObserver as default };
