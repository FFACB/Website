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
	let { cooperatives } = $state(data);

	const submitDeleteActualite = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					if (result.data != null && result.data.id != null) {
						const id: string = result.data.id;
						cooperatives = cooperatives.filter((cooperative) => cooperative.id != id);
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
		<ButtonCreate titre="Créer" link="/admin/cooperative" />
	{/snippet}

	<div
		class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token mb-4 pl-8 pr-8 p-4"
	>
		<h1 class="h1">Liste des cooperatives</h1>
	</div>

	<dl class="list-dl">
		{#each cooperatives as cooperative, index (index)}
			<div class="w-full block p-2 bg-surface-50 dark:bg-surface-800 rounded-container-token">
				<div class="h-16 w-full flex justify-between">
					<div class="h-full">
						<a
							href="/admin/cooperative/{cooperative.id}"
							class="group badge variant-outline-secondary hover:variant-outline-primary transition-all ease-out duration-300"
							><Icon
								icon="solar:double-alt-arrow-right-bold-duotone"
								class="text-secondary-500 transition-all ease-out duration-300 "
								width="32"
								height="32"
							></Icon></a
						>
						<span class="flex-auto">
							<dt>{cooperative.name}</dt>
							<dd>{cooperative.adresse ?? 'Aucune adresse'}</dd>
						</span>
					</div>
					<div class="h-full !p-0">
						<ButtonDelete
							class="!mr-0"
							type="submit"
							value="Delete"
							form="delete-cooperatives-{index}"
						/>
						<div class="!hidden">
							<form
								action="?/delete"
								method="POST"
								id="delete-cooperatives-{index}"
								use:enhance={submitDeleteActualite}
							>
								<input type="hidden" name="id" value={cooperative.id} />
							</form>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</dl>
</Content>
