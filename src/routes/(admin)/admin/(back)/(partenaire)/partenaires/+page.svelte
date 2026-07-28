<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonCreate from '$lib/components/admin/buttons/create/ButtonCreate.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import {
		SUPRESSION_ERROR,
		SUPRESSION_FAILED,
		SUPRESSION_SUCCES
	} from '$lib/client/toasts/toasts.js';

	const toastStore = getToastStore();
	let { data } = $props();
	let { partenaires } = $state(data);

	const submitDeletePartenaire = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					if (result.data != null && result.data.id != null) {
						const id: string = result.data.id;
						partenaires = partenaires.filter((partenaire) => partenaire.id != id);
					}
					await update();
					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.toToast());
					await update();
					break;

				case 'error':
					toastStore.trigger(SUPRESSION_ERROR.toToast());
					await update();
					break;
				default:
					break;
			}
		};
	};
</script>

<Content>
	{#snippet buttons()}
		<ButtonCreate titre="Créer" link="/admin/partenaire" />
	{/snippet}

	<div
		class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4"
	>
		<h1 class="h1">Liste des partenaires</h1>
	</div>

	<dl class="list-dl">
		{#each partenaires as partenaire, index (index)}
			<div class="w-full block p-2 bg-surface-50 dark:bg-surface-800 rounded-container-token">
				<div class="h-16 w-full flex justify-between">
					<div class="h-full">
						<a
							href="/admin/partenaire/{partenaire.id}"
							class="group badge variant-outline-secondary hover:variant-outline-primary transition-all ease-out duration-300"
							><Icon
								icon="solar:double-alt-arrow-right-bold-duotone"
								class="text-secondary-500 transition-all ease-out duration-300 "
								width="32"
								height="32"
							></Icon></a
						>
						<span class="flex-auto">
							<dt>{partenaire.ordre} — {partenaire.name}</dt>
							<dd>{partenaire.siteInternet.length > 0 ? partenaire.siteInternet : 'Aucun lien'}</dd>
						</span>
					</div>
					<div class="h-full !p-0">
						{#if partenaire.logo != null && partenaire.logo.length > 0}
							<img
								src={partenaire.logo}
								alt={partenaire.name}
								class="w-32 h-full object-contain rounded-container-token bg-white"
							/>
						{/if}
						<ButtonDelete
							class="!mr-0"
							type="submit"
							value="Delete"
							form="delete-partenaires-{index}"
						/>
						<div class="!hidden">
							<form
								action="?/delete"
								method="POST"
								id="delete-partenaires-{index}"
								use:enhance={submitDeletePartenaire}
							>
								<input type="hidden" name="id" value={partenaire.id} />
							</form>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</dl>
</Content>
