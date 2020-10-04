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
  selector,
  threshold,
  animation,
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
  if (options.threshold !== undefined
    && (typeof options.threshold !== 'number'
    || options.threshold <= 0
    || options.threshold > 1)) {
    throw new Error('Threshold should be a number between 0 exclusive and 1 inclusive');
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
  const animation = options.custom ? options.custom : frames[options.animation || 'fadeIn'];

  if (entry.isIntersecting
    && entry.intersectionRatio.toFixed(1)
    >= (options.threshold ? options.threshold.toFixed(1) : 1)) {
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
const intersecta = (userOptions: IntersectaOptions) => {
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
export default intersecta;