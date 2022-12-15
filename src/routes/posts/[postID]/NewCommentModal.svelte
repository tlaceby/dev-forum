<script lang="ts">
	export let showNewCommentModal: boolean;
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

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
									dispatch('comment', newComment);
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
								rows="12"
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
