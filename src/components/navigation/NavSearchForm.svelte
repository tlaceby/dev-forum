<form action="/posts/" method="GET" class="input-group input-inline">
	<input class="form-input" name="q" type="text" placeholder="Search Site" />
	<button class="btn btn-primary input-group-btn"> <i class="icon icon-search" /></button>
</form>

<style>
	input {
		transition: padding-right 300ms ease;
		text-transform: capitalize;
	}

	input:focus-within,
	input:focus-visible {
		padding-right: 4em;
	}

	input ~ button {
		transition: padding-right 250ms ease, padding-left 250ms ease;
	}

	input:focus-visible ~ button,
	input:focus-within ~ button {
		padding-left: 1.4em;
		padding-right: 1.4em;
	}
</style>
