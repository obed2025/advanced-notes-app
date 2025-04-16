<script lang="ts">
	import '../styles/global.scss';
	import Links from '$lib/links.svelte';
	import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

	let { children } = $props();
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
	<fieldset role="group" class="search-bar">
		<input type="text" id="search" placeholder="Search your notes....." />
		<button>Search</button>
	</fieldset>
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
