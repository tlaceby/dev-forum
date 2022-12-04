<script lang="ts">
	import { fly } from 'svelte/transition';
	import { clearToast, TOAST_STORE } from './toasts';
</script>

<div id="toasts-content">
	{#each $TOAST_STORE as toast}
		<div class={`toast toast-${toast.kind}`} in:fly>
			<button class="btn btn-clear float-right" on:click={() => clearToast(toast.id)} />
			{toast.message}
		</div>
	{/each}
</div>

<style>
	#toasts-content {
		position: absolute;
		bottom: 1.8em;
		right: 1em;
		z-index: 100;
	}

	.toast {
		margin: 0.5em;
		outline: none;
		width: 350px;
		padding: 0.8em;
		text-transform: capitalize;
	}

	.toast button:focus {
		background: transparent;
	}
</style>
