<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import Note from './note.svelte';
	import type { Note as NoteType } from '../utils/types';
	import DataBase from '../utils/db';

	interface Props {
		tag?: string;
		search?: string;
	}

	const DB = new DataBase();
	const { tag, search }: Props = $props();

	function filterSearch(note: NoteType, search: string) {
		search = search.toLocaleLowerCase();

		let { body, title, description } = note;
		[body, title, description] = [body, title, description].map((txt) => txt.toLocaleLowerCase());

		return body.includes(search) || description.includes(search) || title.includes(search);
	}
</script>

{#await DB.getAllNotes()}
	<Skeleton></Skeleton>
{:then notes}
	{#if tag || search}
		{#if tag}
			<code>
				<h2>#{tag}</h2>
			</code>
			<hr />
			{@render Notes(
				notes.reverse().filter((note) => note.tags.includes(tag)),
				true
			)}
		{:else if search}
			<code>
				<h2>🔍 {search}</h2>
			</code>
			<hr />
			{@render Notes(
				notes.reverse().filter((note) => filterSearch(note, search)),
				true
			)}
		{/if}
	{:else}
		{@render Notes(notes.reverse())}
	{/if}
{/await}

{#snippet Notes(notes: NoteType[], results?: boolean)}
	{#if notes.length}
		<div class="notes-container">
			{#each notes as note}
				<Note {note}></Note>
			{/each}
		</div>
	{:else if results && !notes.length}
		<h1 class="not-found">404</h1>
		<h2>Nothing matches what you are looking for!!</h2>
	{:else}
		<p>Nothing found on this device</p>
		<p>
			<a href="/new">Create a new Note!</a>
			Or learn basic markdown syntax through
			<a href="https://www.markdownguide.org/basic-syntax/">this link</a>!
		</p>
	{/if}
{/snippet}

<style>
	code h2 {
		margin-bottom: 0;
	}
</style>
