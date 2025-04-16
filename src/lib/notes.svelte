<script lang="ts">
	import Skeleton from './skeleton.svelte';
	import Note from './note.svelte';
	import type { Note as NoteType } from '../utils/types';
	import DataBase from '../utils/db';

	const DB = new DataBase();
</script>

{#await DB.getAllNotes()}
	<Skeleton></Skeleton>
{:then notes}
	{@render Notes(notes.reverse())}
{/await}

{#snippet Notes(notes: NoteType[])}
	{#if notes.length}
		<div class="notes-container">
			{#each notes as note}
				<Note {note}></Note>
			{/each}
		</div>
	{:else}
		<p>Nothing found on this device</p>
		<p>
			<a href="/new">Create a new Note!</a>
			Or learn basic markdown syntax through
			<a href="https://www.markdownguide.org/basic-syntax/">this link</a>!
		</p>
	{/if}
{/snippet}
