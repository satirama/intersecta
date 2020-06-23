# intersecta
Add an animation effect on a DOM element triggered by scrolling using only JavaScript.

[**Try demo**](https://satirama.github.io/intersecta/)

No external libs only WebAPI. It is supported on most modern browsers.
However, for more detailed browser compatibility check:

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Browser_compatibility)

[Element Animation](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#Browser_compatibility)

## Content
1. [Getting started](#getting-started)
1. [Options](#options)
1. [Animations](#animations)
1. [Easing](#easing)
1. [Custom animation](#custom-animation)
1. [Events](#events)

## Getting started <a name="getting-started"></a>
### Start
Import **intersecta** to your file
```
import intersecta from "../intersecta.js"
```
Just start **intersecta** initializing it with your options object. It only requires the CSS selector for the element you want to animate on scroll. 
```
intersecta({
  selector: '.item'
});
```
Add whichever options you want to customize it.
```
intersecta({
  selector: '.item',
  once: false,
  animation: 'fadeOut',
});
```
### Stop
Initializing **intersecta** returns a stop method to remove the observer on all the elements it tracks any time you want.
```
const trackItems = intersecta({
  selector: '.item',
  once: false,
  animation: 'fadeOut',
});

trackItems.stop();
```

## Options <a name="options"></a>
| Name        | Type        | Default     | Description  |
| :---        |    :----:   |    :----:   | :---         |
| selector    | string      | null        | *Required*. CSS selector for the observed element. |
| threshold   | number      | 1           | A number between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area to trigger the event.
| animation   | string      | "fadeIn"    | Name of the animation, choose one among the options.
| duration    | number      | 1000        | Number of milliseconds the animation takes to complete.
| delay       | number      | 0           | Number of milliseconds to delay the start of the animation.
| easing      | string      | "linear"      | Rate of the animation's change over time.
| once        | boolean     | true          | Allows animation to be reapeated everytime the element enters. Can't be use with animations that can cause a duplicate enter trigger, like: *slideDown*, *slideUp* or *zoomIn*.
| waterfall   | boolean     | false         | When selector applies to many elements, it allows a waterfall delay set by *delay* option. If no *delay* is set, it will default to 100ms increase.
| custom      | object      | null          | Use any animation you want using this option. It will override the animation option. Check [docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) for valid options.

## Animations <a name="animations"></a>
* fadeIn
* fadeOut
* zoomIn
* zoomOut
* slideDown
* slideUp
* slideLeft
* slideRight
* flipLeft
* flipRight

## Easing <a name="easing"></a>
Accepts the pre-defined values:
* "linear"
* "ease"
* "ease-in"
* "ease-out"
* "ease-in-out"

Or a custom "cubic-bezier" value like:
* "cubic-bezier(0.42, 0, 0.58, 1)"

## Custom animation <a name="custom-animation"></a>
Use the *custom* option to pass the frames of any animations you want. It will override the *animation* option, giving priority your customized animation. 

It can be as easy as an array of objects with CSS properties.
```
const customFrames = [ 
  { // from
    opacity: 0,
    color: "#fff"
  }, 
  { // to
    opacity: 1,
​   color: "#ff6347"
  }
];

intersecta({
  selector: '.item',
  once: false,
  custom: customFrames,
});
```
Check more valid keyframe formats [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats).

## Events <a name="events"></a>
Two events are added to the elements that **intersecta** observes:
* *intersecta:in* - When element enters.
* *intersecta:out* - When element exits.
You can add any callback you want.
```
const element = document.querySelector('.item');

// event for when element enters
element.addEventListener('intersecta:in', () => {
  // your code here
});
```
