<script lang="ts">
	import { enhance } from '$app/forms';
	import { marked } from 'marked';

	export let id: string;
	export let author: string;
	export let created: Date;
	export let body: string;

	export let currentUser: string;
	$: usersOwnComment = currentUser === author;
</script>

<div class="tiled container">
	<medium class="tile-subtitle text-gray">
		{created.toDateString()}
		·
		<strong> <a href={`/user/${author}`}>{author}</a></strong></medium
	>
	<div class="content">
		{@html marked(body)}
	</div>
	<div class="action">
		{#if usersOwnComment}
			<form
				action="?/deleteComment"
				method="post"
				use:enhance={({ cancel }) => {
					const continueTrue = confirm('Are you sure you want to delete this comment?');
					if (!continueTrue) cancel();

					return async () => {
						window.location.reload();
					};
				}}
			>
				<input type="hidden" name="id" value={id} />
				<button class="btn btn-sm btn-danger"
					><iconify-icon inline icon="ion:trash-bin" /> delete</button
				>
			</form>
		{/if}
	</div>
</div>

<style>
	medium {
		font-size: 0.7rem;
	}

	.action {
		margin-top: 15px;
	}

	.tiled {
		position: relative;
		margin-top: 10px;
		padding: 0.5rem;
		border-radius: 0.25rem;
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
		margin-bottom: 0.5rem;
	}

	.btn-danger {
		background-color: transparent;
		color: #ff5f56;
		border-color: #ff5f56;
	}
</style>
