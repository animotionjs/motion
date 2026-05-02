<script lang="ts">
	import { tween } from '$lib/tween.svelte.js';

	const circle = tween({ x: 1.234, y: 5.678, label: 'hello' }, { duration: 1000 });
</script>

<div data-testid="rounded">
	<output data-testid="obj-rounded">{JSON.stringify(circle.current.rounded)}</output>
	<output data-testid="obj-round-1">{JSON.stringify(circle.current.round(1))}</output>
	<output data-testid="obj-round-2">{JSON.stringify(circle.current.round(2))}</output>
	<output data-testid="obj-label">{circle.current.label}</output>
	<output data-testid="obj-x">{circle.current.x}</output>
	<output data-testid="obj-x-rounded">{circle.current.rounded.x}</output>
</div>

<button data-testid="animate" onclick={async () => await circle.to({ x: 9.876, y: 3.21 })}>
	Animate
</button>
