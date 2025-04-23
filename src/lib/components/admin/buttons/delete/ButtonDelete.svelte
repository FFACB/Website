<script lang="ts">
	import Icon from '@iconify/svelte';
	let { click = () => {}, ...rest } = $props();
</script>

<button
	onclick={() => {
		click();
	}}
	data-button="delete"
	{...rest}
>
	<div>Supprimer</div>

	<Icon data-button-icon="delete" icon="solar:minus-circle-broken" width="32" height="32" />
</button>
