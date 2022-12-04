<script lang="ts">
	import { clearAllToasts } from 'components/toasts/toasts';
	import { onMount } from 'svelte';
	onMount(() => {
		clearAllToasts();
	});
</script>

<div class="centered">
	<h1 class="text-dark">
		<span class="text-primary">404</span> <span>Page Not Found</span>
	</h1>
	<hr class="text-secondary" />
	<p class="text-gray mt-2">
		The page requested could not be found. Please make sure the<br /> link in the url is correct.
	</p>

	<a href="/" class="btn btn-secondary">Go Home</a>
</div>

<style>
	.centered {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
