<script lang="ts">
	import { tween } from '$lib/tween.svelte.js'

	const count = tween({ x: 0, y: 0 }, { duration: 1000 })
</script>

<button data-testid="accessor" onclick={() => count.to({ x: 100, y: 100 })}>
	{count.current.x}
	{count.current.y}
</button>

<button
	data-testid="readonly-accessor"
	onclick={() => count.to({ x: 100, y: 100 })}
>
	{count.x}
	{count.y}
</button>
