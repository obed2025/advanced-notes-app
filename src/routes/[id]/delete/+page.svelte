<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import DataBase from '../../../utils/db';

	const DB = new DataBase();
	const id = page.params.id;

	let deleteIt = $state(false);
</script>

<h2>Delete Note</h2>
<hr />

{#await DB.getNote(id)}
	<progress transition:fade|global></progress>
{:then note}
	{#if note}
		{#if !deleteIt}
			<form transition:fade|global>
				<h2>Are you sure you want to delete this note?</h2>
				<p>This action can't be undone!</p>

				<button onclick={() => (deleteIt = true)}>Yes</button>
				<a href="/" class="outline" role="button">No</a>
			</form>
		{:else}
			{@render Delete(note.id)}
		{/if}
	{:else}
		<h2 transition:fade|global>Note not found !!</h2>
	{/if}
{/await}

{#snippet Delete(id: string)}
	{#await DB.deleteNote(id)}
		<progress transition:fade|global></progress>
	{:then _}
		<div transition:fade|global>
			<h1>Note deleted successfully!!</h1>
			<a href="/">Go home</a>
		</div>
	{/await}
{/snippet}

<style>
	button {
		margin-right: 0.5rem;
	}
</style>
