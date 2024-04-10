<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { hideSpinner, showSpinner } from '$lib/client/spinner/index.js';
	import type { Actualite,  PictureRelation } from '@prisma/client';
	import { onMount, type SvelteComponent } from 'svelte';
	import PicturePicker from '$lib/components/admin/uploads/pictures/PicturePicker.svelte';
	import { ENREGISTREMENT_ERROR, ENREGISTREMENT_FAILED, ENREGISTREMENT_SUCCES, ERROR, FAILED, SUPRESSION_ERROR, SUPRESSION_FAILED, SUPRESSION_SUCCES } from '$lib/client/toasts/toasts.js';
	

	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: '' };

	export let data;

	let {actualite , pictureRelation} = data

	let writer: Writer | null = null;

	let picturePicker : PicturePicker | null = null;
	

	onMount(() => {
		writer?.loadContenu(actualite?.contenu ?? '');
		picturePicker?.loadPictureRelation(pictureRelation)

	});


	const submitCreateActualite = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		const { titre, redacteur, tempsLecture, descriptionCourte } = Object.fromEntries(formData);

		if (IsEmptyString(titre)) {
			toastStore.trigger(FAILED.addMessage("Le titre ne doit pas être vide").toToast());
			cancel();
		}

		if (IsEmptyString(redacteur)) {
			toastStore.trigger(FAILED.addMessage("Le rédacteur ne doit pas être vide").toToast());
			cancel();
		}

		if (IsEmptyString(tempsLecture)) {
			toastStore.trigger(FAILED.addMessage("Le temps de lecture ne doit pas être vide").toToast());
			cancel();
		}

		if (IsEmptyString(descriptionCourte)) {
			toastStore.trigger(FAILED.addMessage("La description ne doit pas être vide").toToast());
			cancel();
			return;
		}

		formData.append('contenu', (await writer?.saveContenu()) ?? '');

		showSpinner();
		return async ({ result }: { result: ActionResult; update: () => Promise<void> }) => {
		
			hideSpinner();
			
			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());
					if (typeof result.data !== 'undefined') {
						actualite = result.data.actualite;
						pictureRelation = result.data.pictureRelation
						picturePicker?.loadPictureRelation(pictureRelation)
					
					}

					break;
				case 'failure':
					toastStore.trigger(ENREGISTREMENT_FAILED.toToast());

					break;
				case 'error':
					toastStore.trigger(ENREGISTREMENT_ERROR.toToast());
					break;
				default:
					break;
			}
			await applyAction(result);
		};
	};

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
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.toToast());

					break;

				case 'error':
					toastStore.trigger(SUPRESSION_ERROR.toToast());

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
				<form action="?/delete" method="POST" id="delete" use:enhance={submitDeleteActualite}>
					<input type="hidden" name="id" value={actualite.id} />
				</form>
			</div>
		{/if}
	</svelte:fragment>

	<div class="head w-full bg-surface-100 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1">
			{actualite?.id == null ? 'Créer' : 'Modifier'} l'Actualité
		</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<form
			method="POST"
			action="?/upsert"
			id="upsert"
			class="actualite-form"
			enctype="multipart/form-data"
			use:enhance={submitCreateActualite}
		>
			<label class="label mb-4" for="titre">
				<span class="ml-3 font-semibold">Titre</span>
				<input
					class="input"
					id="titre"
					name="titre"
					value={actualite?.titre ?? ''}
					contenteditable="true"
					type="text"
				/>
			</label>

			<PicturePicker bind:this={picturePicker} pictureName="Photo Principale" />

			<label class="label mb-4" for="redacteur">
				<span class="ml-3 font-semibold">Rédacteur</span>
				<input
					class="input"
					id="redacteur"
					name="redacteur"
					value={actualite?.redacteur ?? ''}
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
					<Writer bind:this={writer} />
				</div>
			</label>

			<input type="hidden" name="id" value={actualite?.id ?? null} />
		</form>
	</div>
</Content>
