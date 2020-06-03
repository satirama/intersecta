# Options
| Name        | Type        | Default     | Description  |
| :---        |    :----:   |    :----:   | :---         |
| selector    | string      | null        | *Required*. CSS selector for the observed element. |
| threshold   | number      | 1           | A number between 0.0 and 1.0, specifying a ratio of intersection area to total bounding box area to trigger the event.
| animation   | string      | "fadeIn"    | Name of the animation.
| duration    | number      | 1000        | Number of milliseconds the animation takes to complete.
| delay       | number      | 0           | Number of milliseconds to delay the start of the animation.
| easing      | string      | "linear"      | Rate of the animation's change over time.
| once        | boolean     | true          | Allows animation to be reapeated everytime the element enters.