# Intersecta: WIP
Add an animation effect on a DOM element triggered by scrolling using only JavaScript.

No external libs only WebAPI. It is supported on most browsers.
However, for more detailed browser compatibility check:

[Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Browser_compatibility)

[Element Animation](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#Browser_compatibility)
## Getting started
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
Add whatever other options you want to customize it
```
intersecta({
  selector: '.item',
  once: false,
  animation: 'fadeOut',
});
```

## Options
| Name        | Type        | Default     | Description  |
| :---        |    :----:   |    :----:   | :---         |
| selector    | string      | null        | *Required*. CSS selector for the observed element. |
| threshold   | number      | 1           | A number between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area to trigger the event.
| animation   | string      | "fadeIn"    | Name of the animation, choose one among the options.
| duration    | number      | 1000        | Number of milliseconds the animation takes to complete.
| delay       | number      | 0           | Number of milliseconds to delay the start of the animation.
| easing      | string      | "linear"      | Rate of the animation's change over time.
| once        | boolean     | true          | Allows animation to be reapeated everytime the element enters.

## Animations
* fadeIn
* fadeOut
* zoomIn