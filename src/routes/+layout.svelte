<script lang="ts">
	import type { PageData } from './$types';
	import Navigation from 'components/navigation/Navigation.svelte';
	import Toasts from 'components/toasts/Toasts.svelte';

	export let data: PageData;
</script>

<Toasts />
<Navigation {data} />

<main data-sveltekit-prefetch>
	<slot />
</main>
