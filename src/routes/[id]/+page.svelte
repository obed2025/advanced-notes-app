<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { dateOptions, getDate } from '../../utils';
	import DataBase from '../../utils/db';
	import { marked } from 'marked';

	const DB = new DataBase();
	const id = page.params.id;
</script>

{#await DB.getNote(id)}
	<progress></progress>
{:then note}
	{#if note}
		<div transition:fade|global class="container">
			<h2>{note.title}</h2>
			<hr />
			<time>{getDate(note.id)}</time>

			{#if note.lastUpdate}
				<time>
					Last Update: {note.lastUpdate.toLocaleString('en-uk', dateOptions)}
				</time>
			{/if}

			<h4 class="tags">
				{#each note.tags as tag}
					{#if tag}
						<a href="/results?tag={tag}">#{tag}</a>
					{/if}
				{/each}
			</h4>

			<aside class="note-card">
				<a href="/{note.id}/update/" role="button">Update</a>
				<a href="/{note.id}/delete/" role="button">Delete</a>
			</aside>

			<section>
				{@html marked.parse(note.body)}
			</section>
		</div>
	{:else}
		<h1 class="not-found">404</h1>
		<h2>Note not found !</h2>
	{/if}
{/await}

<style lang="scss">
	@use '@picocss/pico/scss/colors' as *;

	.tags {
		display: flex;
		gap: 1rem;
	}

	.container section {
		margin-top: 1rem;
	}

	.container {
		display: flex;
		flex-direction: column;

		& :not(section, h2, hr) {
			align-self: center;
		}
	}

	.note-card {
		a[href*='update'] {
			background-color: rgb($blue-500, 75%);
		}

		a[href*='delete'] {
			background-color: rgb($red-500, 75%);
		}
	}
</style>
