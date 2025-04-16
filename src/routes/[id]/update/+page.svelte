<script lang="ts">
	import { fade } from 'svelte/transition';
	import DataBase from '../../../utils/db';
	import { page } from '$app/state';

	const DB = new DataBase();
	const id = page.params.id;

	let title = $state('');
	let desc = $state('');
	let tags = $state('');
	let body = $state('');

	(async () => {
		const note = await DB.getNote(id);

		if (note) {
			({ title, body } = note);
			desc = note.description;
			tags = note.tags.join(' ');
		}
	})();

	let trackInput = $state(false);

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		trackInput = true;

		[title, desc, tags, body] = [title, desc, tags, body].map((txt) => txt.trim());

		if (title && body) {
			DB.updateNote({
				id,
				lastUpdate: new Date(),
				title,
				description: desc,
				tags: tags.split(' '),
				body
			});
			[title, desc, tags, body] = [title, desc, tags, body].map((_) => '');
			trackInput = false;

			const formEls = (e.target as HTMLFormElement).querySelectorAll('*');
			formEls.forEach((el) => removeAriaInvalid(el));
		} else {
			['title', 'body'].forEach((id) => {
				const el = document.getElementById(id) as HTMLInputElement;

				if (el) validate(el);
			});
		}
	}

	function validate(el: HTMLInputElement | HTMLTextAreaElement) {
		el.ariaInvalid = String(!Boolean(el.value.trim()));
	}

	function removeAriaInvalid(el: Element) {
		el.removeAttribute('aria-invalid');
	}

	function oninput(e: Event): void {
		const el = e.target as HTMLInputElement;

		if (trackInput) validate(el);
	}
</script>

<h2>Update Note</h2>
<hr />

{#await DB.getNote(id)}
	<progress></progress>
{:then note}
	{#if note}
		{@render Form()}
	{:else}
		<h3>Note not found!!</h3>
	{/if}
{/await}

{#snippet Form()}
	<form {onsubmit} class="new-note-form" transition:fade>
		<div class="form-grid">
			<div>
				<label for="title"> Title </label>
				<input
					type="text"
					name="title"
					id="title"
					bind:value={title}
					{oninput}
					placeholder="My Contacts"
				/>
			</div>
			<div>
				<label for="tags"> Tags (optional) </label>
				<input
					type="text"
					name="tags"
					id="tags"
					data-optional="true"
					placeholder="me people family info"
					bind:value={tags}
				/>
			</div>
			<div>
				<label for="description"> Description (optional) </label>
				<input
					type="text"
					name="description"
					id="description"
					data-optional="true"
					placeholder="My Contacts Backup"
					bind:value={desc}
				/>
			</div>
		</div>
		<div>
			<label for="body"> Body </label>
			<textarea
				name="body"
				id="body"
				bind:value={body}
				{oninput}
				placeholder="
			## contacts backup
	
			- Mom: +250 777777777
			- Dad: +250 777777777
		"
			></textarea>
		</div>
		<section class="buttons">
			<button type="submit">Submit</button>
			<a href="/{id}" role="button" class="secondary">View updates</a>
			<a href="/" role="button" class="outline">Go home</a>
		</section>
	</form>
{/snippet}
