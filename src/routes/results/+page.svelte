<script lang="ts">
	import { page } from '$app/state';
	import Notes from '$lib/notes.svelte';

	const tag = page.url.searchParams.get('tag');
	const search = page.url.searchParams.get('search');
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
