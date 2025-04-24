<script lang="ts">
	import Icon from '@iconify/svelte';

	let { titre, link, ...rest } = $props();
</script>

<a data-button="create" {...rest} href={link}>
	<div class="hidden sm:block">
		{titre}
	</div>

	<Icon data-button-icon="create" icon="solar:add-circle-broken" width="32" height="32" />
</a>
