<script lang="ts">
	import { tween } from '$lib/index.js'

	let circle = tween({ x: 0, y: 100, r: 100, fill: '#00ffff' })

	function animate() {
		// circle.sfx('sfx/transition.mp3').to({ x: 600, fill: '#ffff00' })
		circle.to({ x: 600, fill: '#ffff00' })
	}

	function reset() {
		circle.reset()
	}
</script>

<svg width="800" height="200" viewBox="-100 0 800 200">
	<circle
		data-testid="circle"
		cx={circle.x}
		cy={circle.y}
		r={circle.r}
		fill={circle.fill}
	/>
</svg>

<div data-testid="output">{JSON.stringify(circle.current)}</div>

<button data-testid="animate" onclick={animate}>Animate</button>
<button data-testid="reset" onclick={reset}>Reset</button>
