<script lang="ts">
	import { toast_error } from 'components/toasts/toasts';

	function NOT_READY_YET() {
		toast_error('This functionality is not ready yet');
	}
</script>

<form action="/posts/" method="GET" class="input-group input-inline">
	<input class="form-input" name="q" type="text" placeholder="Search Site" />
	<button class="btn btn-primary input-group-btn">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i class="icon icon-search" on:click|preventDefault={NOT_READY_YET} /></button
	>
</form>

<style>
	input {
		transition: padding-right 300ms ease;
		text-transform: capitalize;
	}

	input:focus-within,
	input:focus-visible {
		padding-right: 4em;
	}

	input ~ button {
		transition: padding-right 250ms ease, padding-left 250ms ease;
	}

	input:focus-visible ~ button,
	input:focus-within ~ button {
		padding-left: 1.4em;
		padding-right: 1.4em;
	}
</style>
