<script>
	import NavSearchForm from './NavSearchForm.svelte';
</script>

<header class="container navbar col-11 mt-2">
	<section class="navbar-section">
		<a href="/login" class="btn btn-link mr-2"><i class="icon icon-people" /> Login</a>
		<a href="/" class="navbar-brand ml-2 mr-2">Explore</a>
	</section>
	<section class="navbar-section">
		<NavSearchForm />
	</section>
</header>
