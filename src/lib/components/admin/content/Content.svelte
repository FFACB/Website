<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	import Lead from '$lib/components/admin/appbar/lead/Lead.svelte';
	import Trail from '$lib/components/admin/appbar/trail/Trail.svelte';

	import { page } from '$app/state';
	interface Props {
		buttons?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
	}

	let { buttons, children }: Props = $props();
	const { backlink } = page.data;
</script>

<AppBar gap="gap-0" class="appbar">
	{#snippet lead()}
		<Lead {backlink} />
	{/snippet}
	{@render buttons?.()}
	{#snippet trail()}
		<Trail />
	{/snippet}
</AppBar>

<div class="appcontent">
	{@render children?.()}
</div>
