<script lang="ts">
	import { marked } from 'marked';
	import { toast, toast_error, toast_primary } from 'components/toasts/toasts';
	import type { PageData } from './$types';
	import PostComment from './PostComment.svelte';
	import EditPostModal from './EditPostModal.svelte';
	import NewCommentModal from './NewCommentModal.svelte';
	import { enhance } from '$app/forms';

	function sharePost() {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		toast_primary(`Coppied URL To Clipboard`);
	}

	export let data: PageData;
	const comments = data.postComment;
	let showNewCommentModal = false;
	let showeditPostModal = false;

	let { title, question, user_stars, created, tags, author_username } = data.post;

	$: usersOwnPost = data?.currentUser?.username === author_username;
	$: userLoggedIn = data?.currentUser;
	$: alreadyLikedPost = usersOwnPost || user_stars.includes(data?.currentUser?.username);
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
			<div class="loading loading-lg" />
		{:then html}
			{@html html}
		{/await}
	</div>
</div>

<section id="comments" class="col-11 container">
	<br />
	<div class="split-section">
		{#if userLoggedIn}
			<button class="btn btn" on:click={() => (showNewCommentModal = true)}
				><iconify-icon inline icon="material-symbols:add-comment-outline" /></button
			>
			<!-- Create a modal that handles comments-->
			<NewCommentModal
				bind:showNewCommentModal
				on:comment={({ detail }) => (comments.comments = [...comments.comments, detail])}
			/>

			<!-- show update post button -->
			{#if usersOwnPost}
				<button class="btn btn-warning ml-1 mr-1" on:click={() => (showeditPostModal = true)}
					><iconify-icon inline icon="material-symbols:edit-outline-rounded" /></button
				>

				<!--A modal that handles editing posts for the specific user-->
				<EditPostModal
					bind:showeditPostModal
					bind:title
					bind:question
					on:update={({ detail }) => {
						title = detail.updatedTitle;
						question = detail.updatedQuestion;

						// Handle re-rendering the markdown
						questionMarkdown = marked(question);
					}}
				/>

				<!-- delete form for owner -->

				<form
					class="inline"
					action="?/deletePost"
					method="post"
					use:enhance={async ({ cancel }) => {
						const sure = confirm('Are you sure you want to delete this post?');
						if (!sure) {
							return cancel();
						}

						// validate user permissions
						if (!usersOwnPost || !userLoggedIn) {
							toast_error('You do not have permission to modify this post');
							return cancel();
						}
					}}
				>
					<button class="btn btn-danger" type="submit"
						><iconify-icon inline icon="material-symbols:delete-outline-rounded" /></button
					>
				</form>
			{/if}
		{/if}
	</div>
	<br /><br />
	{#each comments.comments as comment}
		<PostComment {...comment} currentUser={data?.currentUser?.username} />
	{/each}
</section>

<!-- Additional Bottom Padding-->
<br /><br />

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

	.split-section {
		display: flex;
		align-items: center;
	}
</style>
