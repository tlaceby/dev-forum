<script lang="ts">
	import { marked } from 'marked';
	import { toast_error, toast_primary } from 'components/toasts/toasts';
	import type { PageData } from './$types';

	function sharePost() {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		toast_primary(`Coppied URL To Clipboard`);
	}

	export let data: PageData;

	const { title, question, user_stars, created, tags, author_username } = data.post;

	console.log(data);
	$: usersOwnPost = data?.currentUser?.username === author_username;
	$: userLoggedIn = data?.currentUser;

	$: alreadyLikedPost = usersOwnPost || user_stars.includes(data?.currentUser?.username);
	// Parse the markdown stored in the db to valid HTML.
	$: questionMarkdown = marked(question);

	async function likePost() {
		const response = await fetch(window.location.href, {
			method: 'PATCH',
		});

		const result = await response.json();
		if (result.error) {
			toast_error(result.message);
		}

		window.location.reload();
	}
</script>

<div class="container col-11 mt-10">
	<h1 class="float-left">
		{title} - <a href={`/user/${author_username}`} class="author-username">{author_username}</a>
	</h1>
	<span class="flex float-right">
		{#if !usersOwnPost && userLoggedIn}
			{#if alreadyLikedPost}
				<button class="btn btn-sm" on:click|once={likePost}>⭐ Dislike</button>
			{:else}
				<button class="btn btn-sm btn-primary" on:click|once={likePost}>⭐ Like</button>
			{/if}
		{/if}
		<button class="btn btn-sm" on:click={sharePost}>🔗 Share</button>
	</span>
	<br /> <br />
	<h3 class="date-stars mt-2">{created.toDateString()} ⭐{user_stars.length}</h3>
	<div class="tags">
		{#each tags as tag}
			<span class="chip mt-2">
				{tag}
			</span>
		{/each}
	</div>
	<br />
	<div class="question">
		{#await questionMarkdown}
			<br />
			<div class="loading" />
		{:then html}
			{@html html}
		{/await}
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
		border: 1px dashed #c8c8c8;
		padding: 2em;
		overflow: hidden;
		border-radius: 4px;
	}
</style>
