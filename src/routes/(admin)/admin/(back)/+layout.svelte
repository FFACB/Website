<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import { initializeStores, Toast, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';

	initializeStores();

	export let data;
	const { config } = data;

</script>

<Toast position="t" padding="p-4" />

<AppShell
	regionPage="relative"
	slotPageHeader=" sticky top-0 z-10"
	slotSidebarLeft="lg:block hidden dark:bg-surface-800 bg-surface-50 w-56 p-4 m-4 rounded-container-token"
>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<Sidebar {config} />

		<!-- --- -->
	</svelte:fragment>

	<Drawer  width="w-56">
		<div class="dark:bg-surface-800 bg-surface-50 w-full p-4 rounded-container-token">
			<Sidebar {config} />
		</div>
	
	</Drawer>

	<div class="h-full w-full flex flex-col p-4 lg:pl-0">
		<slot/>
	</div>

</AppShell>
