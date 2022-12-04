<script lang="ts">
	import type { PageData } from './$types';
	import AccountSettings from './AccountSettings.svelte';
	export let data: PageData;

	$: user = data.userData;
	$: currentUser = data?.currentUser;
	$: usersMatch = currentUser?.username === user.username;

	let showAccountSettings = false;
</script>

<div class="container col-11 mt-10">
	<h1>
		<span class="text-dark">{user.username}</span>
		{#if usersMatch}
			<button class="btn btn-sm btn-secondary ml-2" on:click={() => (showAccountSettings = true)}
				>settings</button
			>
		{/if}
	</h1>
	<p>Stars: <span class="text-primary">{user.stars}</span></p>
	<p>Created: {user.account_created.toDateString()}</p>
	<span>{user.about}</span>
</div>

{#if showAccountSettings}
	<AccountSettings
		bind:showAccountSettings
		about={user.about}
		on:about_changed={(e) => (user.about = e.detail.value)}
	/>
{/if}

<style>
	p {
		margin: 0;
	}
</style>
