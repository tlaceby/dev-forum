<script lang="ts">
	import type { ActionData } from './$types';
	import { toast, toast_error } from 'components/toasts/toasts';
	export let form: ActionData;

	if (form?.invalidRequestData) {
		toast_error('Invalid Username or Password');
	}

	if (form?.usernameDoesNotExist) {
		toast('A user with that username does not already exist');
	}

	if (form?.invalidPassword) {
		toast_error('Password Is Incorrect');
	}
</script>

<svelte:head>
	<title>Account Login</title>
</svelte:head>

<form class="mt-10 center-w col-7" method="POST">
	<h2>Login</h2>
	<a class="text-dark" href="/register"
		>Dont have an account? <span class="text-primary">Register now.</span></a
	>
	<div class="form-group">
		<label class="form-label" for="username">Username</label>
		<input
			class="form-input"
			spellcheck="false"
			name="username"
			id="username"
			autocomplete="off"
			type="text"
			placeholder="Username"
			required
			pattern={'^[A-Za-z0-9_.-]{5,25}$'}
		/>
	</div>

	<div class="form-group">
		<label class="form-label" for="password">Password</label>
		<input
			class="form-input"
			id="password"
			name="password"
			required
			type="password"
			autocomplete="off"
			placeholder="Password"
			pattern={'^[A-Za-z0-9_.-]{5,25}$'}
		/>
	</div>

	<!-- pattern validation example for password (8 or more characters that are of at least one number, 
    and one uppercase and lowercase letter) -->
	<!-- form validation example for checkbox, radio and switch -->
	<div class="form-group">
		<label class="form-checkbox">
			<input type="checkbox" name="remember-me" />
			<i class="form-icon" /> Remember me
		</label>
	</div>

	<div class="form-group">
		<button class="btn btn-secondary">Login</button>
	</div>
</form>
