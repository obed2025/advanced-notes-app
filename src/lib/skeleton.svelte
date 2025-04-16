<script lang="ts">
	import { getArray } from '../utils';
	import { fade } from 'svelte/transition';
</script>

<div class="skeleton" out:fade>
	{#each getArray(6) as _}
		<div class="skeleton__note note">
			<div class="note__title"></div>
			<div class="note__time"></div>
			<div class="note__tags">
				{#each getArray(3) as _}
					<div class="note__tag"></div>
				{/each}
			</div>
			<div class="note__description"></div>
			<div class="note__buttons">
				{#each getArray(2) as _}
					<div class="note__button"></div>
				{/each}
			</div>
		</div>
	{/each}
</div>
