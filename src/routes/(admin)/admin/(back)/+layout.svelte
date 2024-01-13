<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores, Toast, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/admin/sidebar/Sidebar.svelte';

	//Setup theme
	function setInitialClassState() {
		const elemHtmlClasses = document.documentElement.classList;
		// Conditions
		const condLocalStorageUserPrefs = localStorage.getItem('modeUserPrefers') === 'false';
		const condLocalStorageUserPrefsExists = !('modeUserPrefers' in localStorage);
		const condMatchMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;
		// Add/remove `.dark` class to HTML element
		if (condLocalStorageUserPrefs || (condLocalStorageUserPrefsExists && condMatchMedia)) {
			elemHtmlClasses.add('dark');
		} else {
			elemHtmlClasses.remove('dark');
		}
	}

	initializeStores();

	export let data;
	const { config } = data;
</script>

<svelte:head>
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

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

	<Drawer width="w-56">
		<div class="dark:bg-surface-800 bg-surface-50 w-full p-4 h-full rounded-container-token">
			<Sidebar {config} />
		</div>
	</Drawer>

	<div class="h-full w-full flex flex-col p-4 lg:pl-0">
		<slot />
	</div>
</AppShell>
