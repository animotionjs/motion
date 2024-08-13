<script lang="ts">
	import { tween } from '$lib/index.js'
	import { formatNumber } from './utils.js'

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
		{formatNumber(text.count)}
	</text>
</svg>

<div>
	<button onclick={animate}>Animate</button>
</div>

{#snippet grid()}
	<g>
		<g>
			{#each { length: 20 } as _, i}
				<line
					x1={1 * i}
					y1={0}
					x2={1 * i}
					y2={20}
					stroke={i !== 0 ? '#5c6370' : 'none'}
					stroke-width="0.06"
				/>

				<line
					x1={0}
					y1={1 * i}
					x2={20}
					y2={1 * i}
					stroke={i !== 0 ? '#5c6370' : 'none'}
					stroke-width="0.06"
				/>
			{/each}
		</g>

		<g>
			{#each { length: 21 } as _, i}
				{#if i % 5 === 0}
					<line
						x1={1 * i}
						y1={0}
						x2={1 * i}
						y2={20}
						stroke={'#f9fafa'}
						stroke-width="0.06"
					/>

					<line
						x1={0}
						y1={1 * i}
						x2={20}
						y2={1 * i}
						stroke={'#f9fafa'}
						stroke-width="0.06"
					/>
				{/if}
			{/each}
		</g>

		<g>
			{#each [0, 5, 10, 15, 20] as number, i}
				<text
					x={5 * i}
					y={-1}
					font-size="0.8"
					text-anchor="middle"
					fill="#f9fafa"
				>
					{number}
				</text>

				<text
					x={-1}
					y={5 * i}
					font-size="0.8"
					text-anchor="middle"
					dominant-baseline="middle"
					fill="#f9fafa"
				>
					{number}
				</text>
			{/each}
		</g>
	</g>
{/snippet}

<style>
	svg {
		width: 600px;
		height: 600px;
	}

	div {
		margin-top: 2rem;
		text-align: center;
	}

	button {
		font: inherit;
		font-size: 1.25rem;
		padding: 0.5rem;
	}
</style>
