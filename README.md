# Motion

https://github.com/animotionjs/motion/assets/38083522/7cd87b1b-016f-46d3-b2c9-67e849d4559f

## What Is Motion?

Motion is a simple animation library for Svelte, that uses values over time to animate any property, instead of being limited to animating CSS properties, using a JavaScript animation library, or the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

## Installation

```sh
npm i @animotion/motion
```

## Usage

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/joysofcode/motion-svg)

To start an animation use the `await` keyword.

`motion` has three imports:

- `animate` is an `onMount` wrapper, useful if you're using SvelteKit, but you can use any `async` function to define the animation
- `signal` is the value over time which can be a single value, such as `signal(0)`, or an object `signal({ count: 0 })`
- `all` is a helper function used to play animations at the same time, you can use the `await` keyword to wait for the animation to end

```svelte
<script lang="ts">
  import { animate, signal, all } from '@animotion/motion'
  import { formatNumber } from '$lib/utils'

  const sfx = {
    transition: 'sfx/transition.mp3',
    tally: 'sfx/tally.mp3',
  }

  const svg = signal({ x: -2, y: -2, w: 24, h: 24 })
  const circle = signal({ x: 2.5, y: 2.5, r: 1.5, fill: '#00ffff' })
  const text = signal({ count: 0, opacity: 0 })

  animate(async () => {
    await svg.sfx(sfx.transition).to({ x: 0, y: 0, w: 10, h: 10 })

    all(
      circle.sfx(sfx.transition).to({ x: 10, y: 10, r: 3, fill: '#ffff00' }),
      svg.to({ x: 5, y: 5 })
    )

    await text
      .to({ opacity: 1 }, { duration: 300 })
      .sfx(sfx.tally)
      .to({ count: 10_000 }, { duration: 600 })
  })
</script>
```
