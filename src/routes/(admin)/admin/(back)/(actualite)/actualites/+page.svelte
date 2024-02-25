<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonCreate from '$lib/components/admin/buttons/create/ButtonCreate.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	const toastStore = getToastStore();
	export let data;
	let { actualites } = data;

	const toast: ToastSettings = { message: '', background: '' };

	const submitDeleteActualite = () => {
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

					break;
				case 'failure':
					toast.message = 'Erreur lors de la suppression';
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;

				case 'error':
					toast.message = 'Erreur lors de la suppression';
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;
				default:
					break;
			}
			await update();
			window.location.reload();
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons">
		<ButtonCreate titre="Créer" link="/admin/actualite" />
	</svelte:fragment>

	<div
		class="head w-full bg-surface-100 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4"
	>
		<h1 class="h1 font-bold text-2xl">Liste des actualites</h1>
	</div>

	<dl class="list-dl">
		{#each actualites as actualite}
			<div class="w-full block p-2 bg-surface-100 dark:bg-surface-800 rounded-container-token">
				<div class="h-16 w-full flex justify-between">
					<div class="h-full">
						<a
							href="/admin/actualite/{actualite.id}"
							class="group badge variant-outline-secondary hover:variant-outline-primary transition-all ease-out duration-300"
							><Icon
								icon="solar:double-alt-arrow-right-bold-duotone"
								class="text-secondary-500 transition-all ease-out duration-300 group-hover:text-primary-500"
								width="32"
								height="32"
							></Icon></a
						>
						<span class="flex-auto">
							<dt>{actualite.titre}</dt>
							<dd>{actualite.descriptionCourte ?? 'Aucune description'}</dd>
						</span>
					</div>
					<div class="h-full !p-0">
						{#if actualite.photo != null && actualite.photo.length > 0}
							<img
								src={actualite.photo}
								alt={actualite.titre}
								class="w-32 h-full object-cover rounded-container-token"
							/>
						{/if}
						<ButtonDelete class="!mr-0" type="submit" value="Update" form="delete" />
						<div class="!hidden">
							<form action="?/delete" method="POST" id="delete" use:enhance={submitDeleteActualite}>
								<input type="hidden" name="id" value={actualite.id} />
							</form>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</dl>
</Content>
