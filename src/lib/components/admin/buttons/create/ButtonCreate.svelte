<script lang="ts">
	import Icon from '@iconify/svelte';
	interface Props {
		titre: string;
		link: string;
		[key: string]: any;
	}

	let { titre, link, ...rest }: Props = $props();
</script>

<a data-button="create" {...rest} href={link}>
	<div class="hidden sm:block">
		{titre}
	</div>

	<Icon data-button-icon="create" icon="solar:add-circle-broken" width="32" height="32" />
</a>
