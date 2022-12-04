<script lang="ts">
	let tags: string[] = [];
	let tagText = 'help';

	function removeTag(tag: string) {
		tags = tags.filter((t) => tag != t);
	}

	function addTag() {
		if (tags.includes(tagText) || tagText.length == 0) return;
		tags = [...tags, tagText];
		tagText = '';
	}

	$: canSubmitTag = tagText.length != 0 && !tags.includes(tagText);
</script>

<form class="mt-10 center-w col-7" method="POST">
	<h2>Create a Post</h2>
	<p>
		When making a post please make sure the title is short and to the point. The question body can
		contain whatever code or text you would like.
	</p>
	<div class="form-group col-4">
		<label class="form-label" for="title">Post Title</label>
		<input
			class="form-input"
			spellcheck="false"
			name="title"
			id="title"
			autocomplete="off"
			type="text"
			placeholder="A short title / question"
			required
		/>
	</div>

	<div class="form-group">
		<label class="form-label" for="question-body">Tags</label>
		<input type="text" class="form-input col-8 float-left" name="tag-list" bind:value={tagText} />
		<button class="btn btn float-right" on:click|preventDefault={addTag} disabled={!canSubmitTag}
			>Add Tag</button
		>
		<br /><br />
		{#each tags as tag, index}
			<span class="chip clearfix">
				{tag}
				<input type="hidden" value={tag} name={`tag-${index}`} />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span class="btn btn-clear" on:click={() => removeTag(tag)} />
			</span>
		{/each}
	</div>
	<br />
	<div class="form-group">
		<label class="form-label" for="question-body">Question</label>
		<textarea
			required
			class="form-input"
			spellcheck="false"
			name="question"
			autocomplete="off"
			placeholder="Place your question and code here"
			rows="10"
		/>
	</div>
	<br />
	<div class="form-group">
		<button class="btn btn-primary">Submit</button>
	</div>
</form>
