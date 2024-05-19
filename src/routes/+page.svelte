<script lang="ts">
	import { animate, signal, all } from '$lib/index.js'
	import { formatNumber } from './utils.js'

	const sfx = {
		transition: 'sfx/transition',
		tally: 'sfx/tally',
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
			.to({ opacity: 1 }, { duration: 0.3 })
			.sfx(sfx.tally)
			.to({ count: 10_000 }, { duration: 0.6 })
	})
</script>

<svg viewBox="{$svg.x} {$svg.y} {$svg.w} {$svg.h}">
	<g>
		<g>
			<!-- Grid lines -->
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
			<!-- Main lines -->
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
			<!-- Grid numbers -->
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

	<circle cx={$circle.x} cy={$circle.y} r={$circle.r} fill={$circle.fill} />

	<text
		x={$circle.x}
		y={$circle.y}
		font-size={$circle.r * 0.4}
		opacity={$text.opacity}
		text-anchor="middle"
		dominant-baseline="middle"
		fill="#000"
	>
		{formatNumber($text.count)}
	</text>
</svg>

<style>
	svg {
		width: 600px;
		height: 600px;
	}
</style>
