<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import './app.pcss';

	let { data, children } = $props();
	const { parametres , actualites } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;
</script>

<svelte:head>
	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>

{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
	{@html PUBLIC_BODY_TAG_MANAGER.value}
{/if}

<Header />

{@render children?.()}

<Footer actu1link={actualites[0].id.toString()} actu2link={actualites[1].id.toString()} actu3link={actualites[2].id.toString()} />