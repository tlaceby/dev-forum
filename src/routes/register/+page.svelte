<script lang="ts">
	import type { ActionData } from './$types';
	import { fly, slide } from 'svelte/transition';
	import { toast, toast_error } from 'components/toasts/toasts';

	export let form: ActionData;

	if (form?.alreadyTaken) {
		toast('username already in use');
	}

	if (form?.invalidData) {
		toast_error('FormData is invalid');
	}

	let username = '';
	let password2 = '';
	let password1 = '';

	let shownStage2 = false;
	let stageOneComplete = false;
	$: formComplete = !!(validFirstStage(false) && password1 && password1 == password2 && username);

	function validFirstStage(clicked = false) {
		const USERNAME_REGEX = /^[A-Za-z0-9_.-]{5,25}$/;
		const goodUsername = USERNAME_REGEX.test(username);

		if ((goodUsername && clicked) || shownStage2) {
			stageOneComplete = true;
			shownStage2 = true;
		}

		return goodUsername;
	}
</script>

<svelte:head>
	<title>Create an Account</title>
</svelte:head>

<form class="mt-10 center-w col-7" method="POST">
	<h2>Create a Account</h2>
	<a class="text-dark" href="/login"
		>Already have an account? <span class="text-primary">Login.</span></a
	>

	<br /><br />
	<div class="form-group col-5">
		<label class="form-label" for="username">Username</label>
		<input
			bind:value={username}
			class="form-input"
			spellcheck="false"
			id="username"
			type="text"
			name="username"
			placeholder="Username"
			autocomplete="off"
			required
			pattern={'^[A-Za-z0-9_.-]{5,25}$'}
		/>
	</div>

	{#if stageOneComplete}
		<div class="area" in:fly>
			<div class="transition-area" in:slide>
				<div class="form-group">
					<label class="form-label" for="password">Password</label>
					<input
						bind:value={password1}
						class="form-input"
						id="password"
						name="password"
						type="password"
						required
						autocomplete="off"
						placeholder="Password"
						pattern={'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'}
					/>
				</div>

				<div class="form-group">
					<label class="form-label" for="confirm-password">Confirm Password</label>
					<input
						class="form-input"
						bind:value={password2}
						id="confirm-password"
						autocomplete="off"
						name="confirm-password"
						type="password"
						placeholder="Confirm Password"
						pattern={'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'}
					/>
				</div>
			</div>

			<br />
			<div class="form-group">
				<button class="btn btn-primary" disabled={!formComplete}>Create Account</button>
			</div>
		</div>
	{/if}

	{#if stageOneComplete == false}
		<br />
		<div class="form-group">
			<button class="btn btn-secondary" on:click|preventDefault={() => validFirstStage(true)}
				>Continue</button
			>
		</div>
	{/if}
</form>

<div class="step-area col-10">
	<ul class="step">
		{#if !stageOneComplete}
			<li class="step-item active">
				<a href="#username" class="tooltip" data-tooltip="Enter your username & email">Step 1</a>
			</li>
			<li class="step-item">
				<a href="#password" class="tooltip" data-tooltip="Choose a secure password">Step 2</a>
			</li>
		{:else}
			<li class="step-item">
				<a href="#username" class="tooltip" data-tooltip="Enter your username & email">Step 1</a>
			</li>
			<li class="step-item active">
				<a href="#password" class="tooltip" data-tooltip="Choose a secure password">Step 2</a>
			</li>
		{/if}

		<li class="step-item">
			<a href="#password" class="tooltip" data-tooltip="Finish account setup">Done</a>
		</li>
	</ul>
</div>

<style>
	.step-area {
		position: absolute;
		bottom: 5em;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
