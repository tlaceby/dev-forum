<script lang="ts">
	import { marked } from 'marked';
	import { toast_error, toast_primary } from 'components/toasts/toasts';
	import type { PageData } from './$types';
	import PostComment from './PostComment.svelte';
	import { enhance } from '$app/forms';

	function sharePost() {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		toast_primary(`Coppied URL To Clipboard`);
	}

	export let data: PageData;
	const comments = data.postComment;
	let showNewCommentModal = false;

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

<section id="comments" class="col-11 container">
	<br />
	{#if userLoggedIn}
		<button class="btn btn-sm" on:click={() => (showNewCommentModal = true)}>Join Discussion</button
		>

		{#if showNewCommentModal}
			<div class="modal active" id="modal-id">
				<!-- svelte-ignore a11y-missing-content -->
				<button
					class="modal-overlay"
					aria-label="Close"
					on:click={() => (showNewCommentModal = false)}
				/>
				<div class="modal-container">
					<div class="modal-header">
						<!-- svelte-ignore a11y-missing-content -->
						<button
							class="btn btn-clear float-right"
							aria-label="Close"
							on:click={() => (showNewCommentModal = false)}
						/>
						<div class="modal-title h5">Post a Comment</div>
					</div>
					<div class="modal-body">
						<div class="content">
							<form
								method="POST"
								action="?/comment"
								use:enhance={({ form }) => {
									return async ({ result }) => {
										if (result.type == 'error') {
											alert('Something went wrong');
										} else {
											// @ts-ignore
											const newComment = result.data.created;
											comments.comments = [...comments.comments, newComment];
											// Force an update of the comments array
										}

										showNewCommentModal = false;
										form.reset();
									};
								}}
							>
								<div class="form-group">
									<textarea
										required
										class="form-input"
										spellcheck="false"
										name="body"
										autocomplete="off"
										placeholder="Leave a response here"
										rows="4"
									/>
								</div>
								<br />
								<div class="form-group">
									<button class="btn">Respond</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}

	<br />
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
</style>
