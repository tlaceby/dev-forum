<script lang="ts">
	import UserLoggedIn from './UserLoggedIn.svelte';
	import LoggedOut from './LoggedOut.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';

	export let data: PageData;
</script>

{#if data?.currentUser}
	<UserLoggedIn username={data.currentUser.username} />
{/if}

{#if !data?.currentUser}
	<LoggedOut />
{/if}
