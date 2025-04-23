<script lang="ts">
	import Icon from '@iconify/svelte';
	let { click = () => {}, ...rest } = $props();
</script>

<button
	onclick={() => {
		click();
	}}
	data-button="quit"
	{...rest}
>
	<Icon data-button-icon="quit" icon="solar:traffic-economy-broken" width="32" height="32" />
</button>
