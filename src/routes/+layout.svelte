<script lang="ts">
	import '../app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Motion</title>
</svelte:head>

{@render children()}
