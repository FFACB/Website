<script lang="ts">
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LayoutConfig, LayoutSidebarItem } from '$lib/client/utils/ambiant.js';
	import './sidebar.pcss';

	export let config: LayoutConfig;

	const { admin, sidebar } = config;
	let { active = '' } = $page.data;
	let sidebarHtml = initSidebar(sidebar);

	afterNavigate((url) => {
		active = $page.data.active;
		sidebarHtml = initSidebar(sidebar);
	});

	function initSidebar(sidebarItem: LayoutSidebarItem[]) {
		let sidebarItems = sidebarItem
			.map((item) => {
				let local = `<li class='li'><a class="${
					active == item.linkactive ? 'active' : ''
				}  " href="${admin.slug}${item.slug}">${item.bartitle}</a></li>`;

				if (item.items.length > 0) {
					local += `<ul>`;
					local += initSidebar(item.items);
					local += `</ul>`;
				}

				return local;
			}, [])
			.join('');
		return sidebarItems;
	}
</script>

<nav class="list-nav">
	<ul class="ul-parent">
		{@html sidebarHtml}
	</ul>
</nav>
