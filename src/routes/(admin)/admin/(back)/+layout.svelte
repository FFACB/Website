<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';

	initializeStores();

	export let data;
	const { config } = data;
	

</script>

<Toast position="t" padding="p-4" />

<AppShell
	regionPage="relative"
	slotPageHeader=" sticky top-0 z-10"
	slotSidebarLeft="dark:bg-surface-700 bg-surface-50 w-56 p-4 m-4 rounded-3xl"
>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<Sidebar {config} />
		
		<!-- --- -->
	</svelte:fragment>
	<div class="h-full w-full flex flex-col p-4 pl-0">
		<slot></slot>
	</div>
</AppShell>
