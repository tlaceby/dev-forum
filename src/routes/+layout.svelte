<script lang="ts">
	import * as iconify_icon from 'iconify-icon';
	iconify_icon.enableCache('all');
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
