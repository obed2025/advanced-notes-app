<script lang="ts">
	import '../styles/global.scss';
	import Links from '$lib/links.svelte';
	import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
	import { searchParams } from './global-state.svelte';

	let { children } = $props();
	let search = $state('');

	const onsubmit = () => (searchParams.search = search);
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<header>
	<nav>
		<ul>
			<li>
				<a href="/" class="contrast">
					<strong>{SITE_TITLE}</strong>
				</a>
			</li>
		</ul>
		<ul class="responsive">
			<Links />
			<li class="small-only">
				<details class="dropdown">
					<summary>Menu</summary>
					<ul dir="rtl">
						<Links />
					</ul>
				</details>
			</li>
		</ul>
	</nav>

	{@render SearchBar()}
</header>

{#snippet SearchBar()}
	<!-- svelte-ignore a11y_no_redundant_roles -->
	<form action="/results" {onsubmit}>
		<fieldset role="group" class="search-bar">
			<input
				name="search"
				type="text"
				id="search"
				bind:value={search}
				placeholder="Search your notes....."
			/>
			<button type="submit">Submit</button>
		</fieldset>
	</form>
{/snippet}

<main>
	{@render children()}
</main>

<style>
	main {
		padding: 0.5rem;
	}

	header {
		position: sticky;
		top: 0;
		background-color: var(--pico-background-color);
		width: 100%;
	}
</style>
