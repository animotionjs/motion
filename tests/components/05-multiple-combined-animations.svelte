<script lang="ts">
	import { tween, all } from '$lib/index.js'

	let circle = tween({ x: 0, y: 100, r: 100, fill: '#00ffff' })
	let text = tween({ count: 0 })

	async function animate() {
		await all(circle.to({ x: 600, fill: '#ffff00' }), text.to({ count: 600 }))
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
	<text
		data-testid="text"
		x={circle.x}
		y={circle.y}
		font-size={circle.r * 0.4}
		text-anchor="middle"
		dominant-baseline="middle"
	>
		{text.count.toFixed(0)}
	</text>
</svg>

<button onclick={animate}>Animate</button>
