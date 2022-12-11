<script lang="ts">
	async function getData() {
		return new Promise((res) => setTimeout(res, 5000));
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
		<button class="btn btn-primary input-group-btn">Search</button>
	</div>
</div>

{#await getData()}
	<div class="loading" />
{:then _data}
	<h1>Data would go here <iconify-icon icon="ic:sharp-search" /></h1>
{/await}
