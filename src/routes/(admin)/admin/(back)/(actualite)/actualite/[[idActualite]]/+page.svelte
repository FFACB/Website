<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import {  getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: ''};

	export let data;
	let { actualite } = data;

	// @ts-ignore
	let writerMethods: { saveContenu: () => string | Blob | PromiseLike<string | Blob>; };

	const submitCreateNote = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		const { titre, redacteur, tempsLecture, descriptionCourte } =
			Object.fromEntries(formData);

		if (IsEmptyString(titre)) {
			toast.message = '❌ Le titre ne doit pas être vide';
			toast.background = 'variant-filled-error';
			toastStore.trigger(toast);
			cancel();
		}

		if (IsEmptyString(redacteur)) {
			toast.message = '❌ Le rédacteur ne doit pas être vide';
			toast.background = 'variant-filled-error';
			toastStore.trigger(toast);
			cancel();
		}

		if (IsEmptyString(tempsLecture)) {
			toast.message = '❌ Le temps de lecture ne doit pas être vide';
			toast.background = 'variant-filled-error';
			toastStore.trigger(toast);
			cancel();
		}

		if (IsEmptyString(descriptionCourte)) {
			toast.message = '❌ La description courte ne doit pas être vide';
			toast.background = 'variant-filled-error';
			toastStore.trigger(toast);
			cancel();
		}

		
		formData.append('contenu', (await writerMethods.saveContenu()) ?? '');

		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: (data?: any) => Promise<void>;
		}) => {
			switch (result.type) {
				case 'success':
					toast.message = 'Enregistrement effectué !';
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
					if (typeof result.data !== 'undefined') {
						actualite = result.data?.data;
						goto(`/admin/actualite/${actualite?.id ?? ''}`, {
							invalidateAll: true,
							replaceState: true
						});
					}

					break;
				case 'failure':
					toast.message = result.data?.errorMsg;
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;
				case 'error':
					toast.message = "Erreur serveur lors de l'enregistrement";
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;
				default:
					break;
			}
			await applyAction(result);
		};
	};

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
			goto('/admin/actualites', { invalidateAll: true });
		};
	};
</script>

<Content>
	<svelte:fragment slot="buttons">
		<ButtonSave titre="Enregistrer" type="submit" value="Update" form="upsert" />
		{#if actualite?.id != null}
			<ButtonDelete type="submit" value="Update" form="delete" />

			<div class="hidden">
				<form action="?/delete" method="POST" id="delete" use:enhance={submitDeleteNote}>
					<input type="hidden" name="id" value={actualite.id} />
				</form>
			</div>
		{/if}
	</svelte:fragment>

	<div class="head w-full bg-surface-100 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1 font-bold text-2xl">{actualite?.id == null ? "Créer" : "Modifier"} l'Actualité</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<form
			method="POST"
			action="?/upsert"
			id="upsert"
			class="actualite-form"
			enctype="multipart/form-data"
			use:enhance={submitCreateNote}
		>
			<label class="label mb-4" for="titre">
				<span class="ml-3 font-semibold ">Titre</span>
				<input
					class="input"
					id="titre"
					name="titre"
					value={actualite?.titre?? ''}
					contenteditable="true"
					type="text"
				/>
			</label>

			<label class="label mb-4" for="file">
				<span class="ml-3 font-semibold">Image</span>
				<input
					
					class="input"
					type="file"
					id="file"
					name="photoFile"
					accept={['.jpg', '.jpeg', '.png', '.webp'].join(',')}
				/>
			</label>

			{#if actualite?.photo != null && actualite.photo.length != 0}
				<div class="mt-2 mb-4">
					<img class="card h-80 w-full bg-cover object-cover" alt="actualite" src={actualite.photo} />
				</div>
			{/if}

			<label class="label mb-4" for="redacteur">
				<span class="ml-3 font-semibold">Rédacteur</span>
				<input
					class="input"
					id="redacteur"
					name="redacteur"
					value={actualite?.redacteur?? ''}
					contenteditable="true"
					type="text"
				/>
			</label>

			<label class="label mb-4" for="tempsLecture">
				<span class="ml-3 font-semibold">Temps de Lecture (en minutes)</span>
				<input
					class="input"
					id="tempsLecture"
					name="tempsLecture"
					value={actualite?.tempsLecture ?? ''}
					contenteditable="true"
					type="number"
				/>
			</label>

			<label class="label mb-4" for="descriptionCourte">
				<span class="ml-3 font-semibold">Description courte (200 caracteres max)</span>
				<textarea
					class="textarea"
					id="descriptionCourte"
					rows="3"
					cols="45"
					maxlength="200"
					name="descriptionCourte"
					value={actualite?.descriptionCourte ?? ''}
					contenteditable="true"
				/>
			</label>

			<label class="label" for="contenu">
				<span class="ml-3 font-semibold">Contenu</span>
				<div class="textarea contenu" id="contenu">
				
					<Writer contenu={actualite?.contenu ?? ''} bind:methods={writerMethods} />
				</div>
			</label>

			<input type="hidden" name="id" value={actualite?.id ?? null} />
			<input type="hidden" name="photo" value={actualite?.photo ?? ''} />
		</form>
	</div>
</Content>
