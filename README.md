# Motion

https://github.com/animotionjs/motion/assets/38083522/7cd87b1b-016f-46d3-b2c9-67e849d4559f

## What Is Motion?

Motion is a simple Svelte animation library. Instead of being limited to animating CSS properties using a JavaScript animation library, or the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), it uses values that change over time, to animate any property.

## Installation

```sh
npm i @animotion/motion
```

## Methods

- `tween` is the value over time which can be a single value, such as `tween(0)`, or an object `tween({ count: 0 })`
- `reset` is a helper function to reset the animation to its default values

## Usage

- `to` method is used to animate values
- `sfx` method is used to play sounds
- `tween` and `to` method accept an options object for `duration`, `delay`, and `easing`
- `await` keyword can be used to wait for animations to finish

## Example

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_wide.svg)](https://www.sveltelab.dev/wqfco73sn2l75gv)

You can [try the example in SvelteLab](https://www.sveltelab.dev/wqfco73sn2l75gv).

```svelte
<script>
	import { tween } from '$@animotion/motion'

	const sfx = {
		transition: 'sfx/transition.mp3',
		tally: 'sfx/tally.mp3',
	}

	const svg = tween({ x: -2, y: -2, w: 24, h: 24 })
	const circle = tween({ x: 2.5, y: 2.5, r: 1.5, fill: '#00ffff' })
	const text = tween({ count: 0, opacity: 0 })

	async function animate() {
		await svg.sfx(sfx.transition).to({ x: 0, y: 0, w: 10, h: 10 })
		circle.sfx(sfx.transition).to({ x: 10, y: 10, r: 3, fill: '#ffff00' })
		svg.to({ x: 5, y: 5 })
		await text.to({ opacity: 1 }, { duration: 300 })
		await text.sfx(sfx.tally).to({ count: 10_000 }, { duration: 600 })
	}
</script>

<svg viewBox="{svg.x} {svg.y} {svg.w} {svg.h}">
	<circle cx={circle.x} cy={circle.y} r={circle.r} fill={circle.fill} />

	<text
		x={circle.x}
		y={circle.y}
		font-size={circle.r * 0.4}
		opacity={text.opacity}
		text-anchor="middle"
		dominant-baseline="middle"
		fill="#000"
	>
		{text.count}
	</text>
</svg>

<button onclick={animate}>Animate</button>
```
