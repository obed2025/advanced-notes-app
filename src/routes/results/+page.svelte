<script lang="ts">
	import { page } from '$app/state';
	import Notes from '$lib/notes.svelte';
	import { searchParams } from '../global-state.svelte';

	let tag = $derived(page.url.searchParams.get('tag') || searchParams.tag);
	let search = $derived(page.url.searchParams.get('search') || searchParams.search);
</script>

{#if !tag && !search}
	<p>Try to search for something!!!</p>
{:else}
	{#if tag}
		<Notes {tag}></Notes>
	{/if}
	{#if search}
		<Notes {search}></Notes>
	{/if}
{/if}
