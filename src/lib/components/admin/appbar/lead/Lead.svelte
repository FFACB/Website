<script lang="ts">
	import Icon from '@iconify/svelte';
    import "./lead.pcss"
	
    export let backlink : string | null;

</script>

{#if backlink != null && backlink.length > 0}
	<a data-sveltekit-reload href={backlink}	class="back-a">
		<Icon
			class="back-icon"
			icon="solar:alt-arrow-left-bold-duotone"
			width="32"
			height="32"
		/>
    </a>
{/if}

