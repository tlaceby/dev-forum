<script lang="ts">
	import { toast_error, toast_success } from 'components/toasts/toasts';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let showAccountSettings = false;

	export let about: string;
	$: newAbout = about;
	$: aboutChanged = newAbout !== about;

	async function logout() {
		await fetch('/user/settings/logout', { method: 'post' });
		window.location.reload();
	}

	async function updateAbout() {
		const formData = new FormData();
		formData.append('about-me', newAbout);
		const res = await fetch('/user/settings/about', {
			method: 'post',
			body: formData
		});

		if (res.ok) {
			showAccountSettings = false;
			toast_success('About Settings Modified');
			dispatch('about_changed', { value: newAbout });
		} else {
			const status = await res.json();
			console.error(status);
			toast_error('Something went wrong');
		}
	}
</script>

<!-- Setting Area -->
<div class="modal active" id="modal-id">
	<!-- svelte-ignore a11y-missing-content -->
	<button class="modal-overlay" aria-label="Close" on:click={() => (showAccountSettings = false)} />
	<div class="modal-container">
		<div class="modal-header">
			<!-- svelte-ignore a11y-missing-content -->
			<button
				class="btn btn-clear float-right"
				aria-label="Close"
				on:click={() => (showAccountSettings = false)}
			/>
			<div class="modal-title h5">Settings</div>
		</div>
		<div class="modal-body">
			<div class="content">
				<div class="form-group">
					<label class="form-label" for="user-about">About Me</label>
					<textarea
						class="form-input mt-2 clear-fixed"
						id="user-about"
						bind:value={newAbout}
						rows="4"
					/>
					<button class="btn btn-sm mt-2" disabled={!aboutChanged} on:click|once={updateAbout}
						>Save</button
					>
				</div>

				<br />
				<div class="form-group">
					<button class="btn btn-sm mt-2" on:click|once={logout}>Logout</button>
				</div>
			</div>
		</div>
		<div class="modal-footer">...</div>
	</div>
</div>
