<script lang="ts">
	import 'iconify-icon';
	import type { PageData } from './$types';
	import Navigation from 'components/navigation/Navigation.svelte';
	import Toasts from 'components/toasts/Toasts.svelte';

	export let data: PageData;
</script>

<Toasts />
<Navigation {data} />

<main>
	<slot />
</main>
