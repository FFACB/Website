<script lang="ts">
	import Icon from '@iconify/svelte';
	let { click = () => {}, ...rest } = $props();
</script>

<button
	onclick={() => {
		click();
	}}
	data-button="refresh"
	{...rest}
>
	<Icon data-button-icon="refresh" icon="solar:refresh-line-duotone" width="32" height="32" />
</button>
