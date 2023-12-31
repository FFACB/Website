<script lang="ts">
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonCreate from '$lib/components/admin/buttons/create/ButtonCreate.svelte';

	const toastStore = getToastStore();
	export let data;
	let { actualites } = data;

	const toast: ToastSettings = { message: '', background: '' };

	const submitDeleteNote = () => {
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: (data?: any) => Promise<void>;
		}) => {
			switch (result.type) {
				case 'success':
					toast.message = 'Actualité supprimé!';
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
					await update(result);
					break;
				case 'failure':
					toast.message = 'Erreur lors de la suppression';
					toast.background = 'variant-filled-danger';
					toastStore.trigger(toast);
					await update();
					break;
				default:
					break;
			}

			window.location.reload();
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons">
		<ButtonCreate titre="Créer" link="/admin/actualite" />
	</svelte:fragment>

	<div class="head w-full bg-surface-100 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4">
		<h1 class="h1 font-bold text-2xl">Liste des actualites</h1>
	</div>

	<dl class="list-dl">

		{#each actualites as actualite}

		
		<a href="/admin/actualite/{actualite.id}" class="w-full block p-2 bg-surface-100 dark:bg-surface-800  rounded-container-token">
			<div class="h-16">
			<span class="badge variant-outline-secondary"
				><Icon
					icon="solar:double-alt-arrow-right-bold-duotone"
					class="text-secondary-500"
					width="32"
					height="32"
				></Icon></span
			>
			<span class="flex-auto">
				<dt>{actualite.titre}</dt>
				<dd>{actualite.descriptionCourte ?? "Aucune description"}</dd>
			</span>

			{#if actualite.photo != null && actualite.photo.length > 0}
				<img src="{actualite.photo}" alt="{actualite.titre}" class="w-32 h-full object-cover rounded-container-token" />
			{/if}

			</div>
		</a>
			{/each}




	</dl>
</Content>
