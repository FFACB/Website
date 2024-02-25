<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: '', timeout: 3000 };

	export let data;
	let { contact } = data;

	const Delete = () => {
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: (data?: any) => Promise<void>;
		}) => {
			switch (result.type) {
				case 'success':
					toast.message = 'Contact supprimé !';
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
			goto('/admin/contacts', { invalidateAll: true });
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons">
		{#if contact?.id != null}
			<ButtonDelete type="submit" value="Update" form="delete" />

			<div class="hidden">
				<form action="?/delete" method="POST" id="delete" use:enhance={Delete}>
					<input type="hidden" name="id" value={contact.id} />
				</form>
			</div>
		{/if}
	</svelte:fragment>

	<div class="head w-full bg-surface-100 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1 font-bold text-2xl">{contact?.id == null ? 'Créer' : 'Modifier'} le Contact</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<div class="mb-4 flex flex-col">
			<span class="ml-3 font-semibold">Nom</span>
			<span class="bg-surface-100 dark:bg-surface-700 p-2 pl-3 pr-3 rounded-container-token"
				>{contact.nom}</span
			>
		</div>

		<div class="mb-4 flex flex-col">
			<span class="ml-3 font-semibold">Prenom</span>
			<span class="bg-surface-100 dark:bg-surface-700 p-2 pl-3 pr-3 rounded-container-token"
				>{contact.prenom}</span
			>
		</div>

		<div class="mb-4 flex flex-col">
			<span class="ml-3 font-semibold">Téléphone</span>
			<span class="bg-surface-100 dark:bg-surface-700 p-2 pl-3 pr-3 rounded-container-token"
				><a href="tel:{contact.telephone}">{contact.telephone}</a></span
			>
		</div>

		<div class="mb-4 flex flex-col">
			<span class="ml-3 font-semibold">E-mail</span>
			<span class="bg-surface-100 dark:bg-surface-700 p-2 pl-3 pr-3 rounded-container-token"
				><a href="mailto:{contact.email}">{contact.email}</a></span
			>
		</div>

		<div class="mb-4 flex flex-col">
			<span class="ml-3 font-semibold">Message</span>
			<span
				class="bg-surface-100 h-24 dark:bg-surface-700 p-2 pl-3 pr-3 rounded-container-token overflow-y-auto"
				>{contact.message}</span
			>
		</div>
	</div>
</Content>
