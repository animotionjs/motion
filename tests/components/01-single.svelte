<script lang="ts">
	import { tween } from '$lib/tween.svelte.js'

	const count = tween(0, { duration: 1000 })
</script>

<button onclick={() => count.to(100)}>
	{count.current}
</button>
