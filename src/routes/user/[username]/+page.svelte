<script lang="ts">
	import type { PageData } from './$types';
	import AccountSettings from './AccountSettings.svelte';
	export let data: PageData;

	$: user = data.userData;
	$: currentUser = data?.currentUser;
	$: usersMatch = currentUser?.username === user.username;
	$: recentPosts = data.recentPosts;

	let showAccountSettings = false;
</script>

<div class="container col-11 mt-10">
	<h1>
		<span class="text-dark">{user.username}</span>
		{#if usersMatch}
			<button class="btn btn-sm btn-secondary ml-2" on:click={() => (showAccountSettings = true)}
				>Settings <iconify-icon inline icon="ic:baseline-settings" /></button
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

<div id="posts-section" class="col-11 container">
	<h2>Recent posts</h2>

	<div class="posts-cards flex">
		{#each recentPosts as post}
			<div class="card">
				<div class="card-header">
					<div class="card-title h5">{post.title}</div>
					<div class="card-subtitle text-gray">
						{post.partial_question}
					</div>
				</div>
				<div class="card-body">
					<p><iconify-icon icon="ic:baseline-star" /> {post.user_stars.length}</p>
					<p><iconify-icon icon="ic:outline-date-range" /> {post.created}</p>
				</div>
				<div class="card-footer">
					<a href={`/posts/${post.id}`} class="btn btn-sm btn-primary">View</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	p {
		margin: 0;
	}

	#posts-section {
		margin-top: 50px;
		padding-bottom: 100px;
	}

	.posts-cards {
		display: grid;
		grid-template-columns: 8fr 8fr;
		grid-gap: 1em;
		flex-wrap: wrap;
	}

	.card {
		border-radius: 6px;
	}
</style>
