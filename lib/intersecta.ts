import { IntersectaEvents, IntersectaInnerOptions, IntersectaOptions } from '.';
import { frames, onceOnlyFrames } from './frames';

const setObserverOptions = ({
  root = null,
  rootMargin = '0px',
  threshold = 1,
} = {}) => ({
  root,
  rootMargin,
  threshold,
});
const setAllOptions = ({
  selector = null,
  threshold = 1,
  animation = 'fadeIn',
  duration = 1000,
  delay = 0,
  easing = 'linear',
  once = true,
  waterfall = false,
  custom = null,
}: IntersectaOptions) => <IntersectaInnerOptions>({
  selector,
  threshold,
  animation,
  duration,
  delay,
  easing,
  fill: 'forwards',
  once,
  waterfall,
  custom,
});
const handleInputErrors = ((options: IntersectaOptions) => {
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
const setEvents = (details = null) => <IntersectaEvents>({
  in: new CustomEvent('intersecta:in', { detail: details }),
  out: new CustomEvent('intersecta:out', { detail: details }),
});
const handleEntry = (entry: IntersectionObserverEntry, observer: IntersectionObserver, entryIndex: number, options: IntersectaInnerOptions, events: IntersectaEvents) => {
  const animationOptions = (({
    duration, fill, delay, easing,
  }) => ({
    duration, fill, delay, easing,
  }))(options);

  // if custom animation, use custom
  const animation = options.custom ? options.custom : frames[options.animation];

  if (entry.isIntersecting
    && entry.intersectionRatio.toFixed(1)
    >= options.threshold.toFixed(1)) {
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
      animation,
      // timing options
      animationOptions,
    );

    // when enabled, remove observer after effect played once
    if (options.once || onceOnlyFrames.has(animation)) observer.unobserve(entry.target);
  } else {
    // trigger out event
    entry.target.dispatchEvent(events.out);

    // reverse animation if it depends on opacity property
    entry.target.animate(
      // keyframes
      animation,
      // timing options
      { direction: 'reverse', fill: 'forwards', duration: 1 },
    );
  }
};
const createIntersectaObserver = (userOptions?: IntersectaOptions) => {
  // handle wrong user inputs
  handleInputErrors(userOptions);

  // set events, options, items and callback
  const events = setEvents();
  const options = setAllOptions(userOptions);
  const selectItems = document.querySelectorAll(options.selector);
  const intersectionEffect: IntersectionObserverCallback = (entries, observer) => {
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