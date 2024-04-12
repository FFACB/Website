<script lang="ts">
	import Icon from '@iconify/svelte';
	import './button-refresh.pcss';
	export let click = () => {};
</script>

<button
	on:click={() => {
		click();
	}}
	data-button="refresh"
	{...$$restProps}
>
	<Icon data-button-icon="refresh" icon="solar:refresh-line-duotone" width="32" height="32" />
</button>
