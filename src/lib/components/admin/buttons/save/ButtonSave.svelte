<script lang="ts">
	import Icon from '@iconify/svelte';
	interface Props {
		titre: string;
		click?: any;
		[key: string]: any;
	}

	let { titre, click = () => {}, ...rest }: Props = $props();
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
