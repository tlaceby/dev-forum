<script lang="ts">
	import type { PostSchema } from 'db/posts/schema';
	import { toast_error } from 'components/toasts/toasts';
	import type { WithId } from 'mongodb';

	async function getData() {
		const datas = await fetch('/posts');

		if (datas.ok == false) {
			toast_error('Something went wrong. Internal Server Error');
			return [];
		}

		const data = (await datas.json()) as WithId<PostSchema>[];
		return data;
	}

	function NOT_READY_YET() {
		toast_error('This functionality is not ready yet');
	}
</script>

<div class="empty mt-2">
	<p class="empty-title h4">Explore Discussions</p>
	<p class="empty-subtitle">
		The place where all developers can have discussions, collaberate & get help.
	</p>
	<br />

	<!-- Form to explore posts -->
	<div class="empty-subtitle input-group col-6">
		<input type="text" class="form-input" placeholder="Have a question or issue?" />
		<button class="btn btn-primary input-group-btn" on:click={NOT_READY_YET}>Search</button>
	</div>
</div>

{#await getData()}
	<br />

	<div class="loading loading-lg mt-10" />
{:then posts}
	<div class="posts-section container col-11">
		{#each posts as post}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => (window.location.href = `/posts/${post._id}`)} class="clickable split">
				<div class="lhs">
					<div class="card-title h5">
						{post.title}
					</div>
					<span class="card-subtitle text-dark">
						{#each post.tags as tag}
							<span class="chip chim-sm">{tag} </span>
						{/each}
					</span>
				</div>
				<div class="rhs">
					<span class="card-subtitle text-gray">⭐ {post.user_stars.length} </span>
					<a href={`/posts/${post._id}`}
						><iconify-icon inline icon="ic:baseline-arrow-circle-right" /></a
					>
				</div>
			</div>
		{/each}
	</div>
{/await}

<style>
	.clickable {
		border: 1px solid rgb(232, 232, 232);
		padding: 0.8em;
		border-radius: 6px;
		transition: all 0.2s;
	}
	.clickable:hover {
		border-color: #3634d2;
	}

	.posts-section {
		margin-top: 30px;
		display: grid;
		grid-gap: 1em;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.clickable {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media screen and (max-width: 1650px) {
		.posts-section {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media screen and (max-width: 850px) {
		.posts-section {
			grid-template-columns: 1fr;
		}
	}
</style>
