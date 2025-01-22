<script lang="ts">
	import { tween } from '$lib/tween.svelte.js'

	const color = tween('red', { duration: 1000 })
</script>

<button onclick={() => color.to('blue')} style:background={color.current}>
	Button
</button>
