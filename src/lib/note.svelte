<script lang="ts">
	import type { Note } from '../utils/types';
	import { getDate, dateOptions } from '../utils';
	import { searchParams } from '../routes/global-state.svelte';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
</script>

<article>
	<h3>
		<a href="/{note.id}">{note.title}</a>
	</h3>

	<time>{getDate(note.id)}</time>

	{#if note.lastUpdate}
		<time>
			Last Update: {note.lastUpdate.toLocaleString('en-uk', dateOptions)}
		</time>
	{/if}

	<h4 class="tags">
		{#each note.tags as tag}
			{#if tag}
				<a href="/results?tag={tag}" onclick={() => (searchParams.tag = tag)}>#{tag}</a>
			{/if}
		{/each}
	</h4>

	<p>{note.description}</p>
	<aside class="note-card">
		<a href="/{note.id}/update/" role="button">Update</a>
		<a href="/{note.id}/delete/" role="button">Delete</a>
	</aside>
</article>

<style lang="scss">
	@use '@picocss/pico/scss/colors' as *;

	.tags {
		display: flex;
		gap: 0.5rem;
		overflow: hidden;
	}

	a {
		text-decoration: none;
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
