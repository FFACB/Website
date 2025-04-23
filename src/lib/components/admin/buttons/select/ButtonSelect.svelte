<script lang="ts">
	import Icon from '@iconify/svelte';
	let { click = () => {}, ...rest } = $props();
</script>

<button
	data-button="select"
	onclick={() => {
		click();
	}}
	{...rest}
>
	<Icon data-button-icon="select" icon="solar:check-square-broken" width="32" height="32" />
</button>
