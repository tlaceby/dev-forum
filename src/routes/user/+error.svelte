<script lang="ts">
	import { page } from '$app/stores';

	const errorMessage = $page.error?.message;
</script>

<div class="centered">
	<h1 class="text-dark">
		<span class="text-primary">{errorMessage}</span>
		<span class="text-dark">NotFound</span>
	</h1>
	<hr class="text-secondary" />
	<p class="text-gray mt-2">
		The username does not exist. Please make sure the username in the url is correct.
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
