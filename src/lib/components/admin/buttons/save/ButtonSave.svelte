<script lang="ts">
	import Icon from '@iconify/svelte';

	let { titre, click = () => {}, ...rest } = $props();
</script>

<button
	data-button="save"
	onclick={() => {
		click();
	}}
	{...rest}
>
	<div>
		{titre}
	</div>

	<Icon data-button-icon="save" icon="solar:check-circle-broken" width="32" height="32" />
</button>
