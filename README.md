# Motion

https://github.com/animotionjs/motion/assets/38083522/7cd87b1b-016f-46d3-b2c9-67e849d4559f

## What Is Motion?

Motion is a simple Svelte animation library. Instead of being limited to animating CSS properties using a JavaScript animation library, or the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API), it uses values that change over time, to animate any property.

## Installation

```sh
npm i @animotion/motion
```

## API

- `tween(value, options?)` — create a tween that animates a value over time
- `.to(value, options?)` — animate to a new value, returns a promise
- `.current` — the current animated value
- `.current.rounded` rounds to integers
- `.current.round(n)` rounds to decimals
- `.target = value` — set the target value directly
- `.sfx(sound, options?)` — play a sound effect, returns the tween for chaining
- `.reset()` — reset to the initial value instantly
- `all(...tweens)` — wait for multiple tweens to complete

## Example

```svelte
<script>
	import { tween } from '@animotion/motion';

	const sfx = {
		transition: 'sfx/transition.mp3',
		tally: 'sfx/tally.mp3',
	};

	const camera = tween({ x: -2, y: -2, w: 24, h: 24 });
	const circle = tween({ x: 2.5, y: 2.5, r: 1.5, fill: '#00ffff' });
	const text = tween({ count: 0, opacity: 0 });

	async function animate() {
		await camera.sfx(sfx.transition).to({ x: 0, y: 0, w: 10, h: 10 });
		circle.sfx(sfx.transition).to({ x: 10, y: 10, r: 3, fill: '#ffff00' });
		camera.to({ x: 5, y: 5 });
		await text.to({ opacity: 1 }, { duration: 300 });
		text.sfx(sfx.tally).to({ count: 10_000 }, { duration: 600 });
	}
</script>

<svg viewBox="{camera.x} {camera.y} {camera.w} {camera.h}">
	{@render grid()}

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
