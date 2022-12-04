<script lang="ts">
	import NavSearchForm from './NavSearchForm.svelte';
	export let username: string;
</script>

<header class="container navbar col-11 mt-2">
	<section class="navbar-section">
		<a href={`/user/${username}/`} class="btn btn-link mr-2"
			><i class="icon icon-people" /> {username}
		</a>
		<a href="/" class="navbar-brand ml-2 mr-2">Explore</a>
		<a href="/posts/new" class="navbar-brand ml-2">Post</a>
	</section>
	<section class="navbar-section">
		<NavSearchForm />
	</section>
</header>
