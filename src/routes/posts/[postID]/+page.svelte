<script lang="ts">
	import { toast_primary } from 'components/toasts/toasts';
	import type { PageData } from './$types';

	function sharePost() {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		toast_primary(`Coppied URL To Clipboard`);
	}
	export let data: PageData;

	const { title, question, stars, created, tags, author_username } = data.post;
	$: usersOwnPost = data?.currentUser?.username == author_username;
	$: userLoggedIn = data?.currentUser;
</script>

<div class="container col-11 mt-10">
	<h1 class="float-left">{title} - <span class="author-username">{author_username}</span></h1>
	<span class="flex float-right">
		{#if !usersOwnPost && userLoggedIn}
			<button class="btn btn-sm">⭐ Like</button>
		{/if}
		<button class="btn btn-sm" on:click={sharePost}>🔗 Share</button>
	</span>
	<br /> <br />
	<h3 class="date-stars mt-2">{created.toDateString()} ⭐{stars}</h3>
	<div class="tags">
		{#each tags as tag}
			<span class="chip mt-2">
				{tag}
			</span>
		{/each}
	</div>
	<br />
	<div class="question">
		{question}
	</div>
</div>

<style>
	h1 {
		margin: 0;
	}

	.date-stars {
		font-size: 22px;
		font-weight: 400;
	}

	.tags {
		display: f;
		align-items: center;
	}

	.question {
		margin-top: 30px;
	}
</style>
