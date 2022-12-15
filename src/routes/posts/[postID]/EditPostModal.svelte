<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast_error, toast_success } from 'components/toasts/toasts';
	import { createEventDispatcher } from 'svelte';

	export let showeditPostModal: boolean;
	export let title: string;
	export let question: string;
	const dispatch = createEventDispatcher();
	let newTitle: string = title;
	let newQuestion: string = question;

	$: contentChanged = newTitle != title || newQuestion != question;
</script>

{#if showeditPostModal}
	<div class="modal modal-lg active" id="modal-id">
		<!-- svelte-ignore a11y-missing-content -->
		<button class="modal-overlay" aria-label="Close" on:click={() => (showeditPostModal = false)} />
		<div class="modal-container">
			<div class="modal-header">
				<!-- svelte-ignore a11y-missing-content -->
				<button
					class="btn btn-clear float-right"
					aria-label="Close"
					on:click={() => (showeditPostModal = false)}
				/>
				<div class="modal-title h5">Modify Post</div>
			</div>
			<div class="modal-body">
				<div class="content">
					<form
						method="POST"
						action="?/updatePost"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type == 'success') {
									showeditPostModal = false;
									toast_success('Post updated successfully');
									dispatch('update', { updatedTitle: newTitle, updatedQuestion: newQuestion });
								} else {
									toast_error(
										'Something went wrong. Please try again later. If the problem persists please reach out to me.',
									);
									showeditPostModal = false;
								}
							};
						}}
					>
						<div class="form-group">
							<label for="title">Post Title</label>
							<input class="form-input" type="text" name="title" id="title" bind:value={newTitle} />
						</div>
						<br />
						<div class="form-group">
							<label for="question">Content</label>
							<textarea
								required
								class="form-input"
								spellcheck="false"
								name="question"
								id="question"
								autocomplete="off"
								bind:value={newQuestion}
								rows="16"
							/>
						</div>
						<br />
						<div class="form-group">
							<button class="btn" disabled={!contentChanged}>Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}
