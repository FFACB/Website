<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { error, type ActionResult } from '@sveltejs/kit';
	import type { Actualite } from '@prisma/client';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';

	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: '' };

	export let data;
	let { actualite } = data;

	let { 
		id = null,
		titre = '',
		photo = '',
		redacteur = '',
		tempsLecture = '',
		descriptionCourte = '',
		contenu,
		createdAt
	} = actualite ?? {};

	let writerMethods;

	const submitCreateNote = async ({
		form,
		data,
		action,
		cancel
	}: {
		form: HTMLElement;
		data: FormData;
		action: URL;
		cancel: () => void;
	}) => {

		debugger
		const { titre, redacteur, tempsLecture, descriptionCourte, photoFile } =
			Object.fromEntries(data);

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

		data.append('contenu', (await writerMethods.saveContenu()) ?? '');

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
					await applyAction(result);

					if (typeof result.data !== 'undefined') {
						actualite = result.data.data;
						if (actualite != null && actualite.id != null && actualite.id.length != 0) {
							goto(`/admin/actualite/${actualite.id}`, { invalidateAll: true });
							writerMethods.loadContenu(actualite.contenu);
						}
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

			await update();
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
		{#if id != null}
		
		<ButtonDelete type="submit" value="Update" form="delete" />

			<div class="hidden">
				<form action="?/delete" method="POST" id="delete" use:enhance={submitDeleteNote}>
					<input type="hidden" name="id" value={id} />
				
				</form>
			</div>
			
		{/if}

	</svelte:fragment>

	<div class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token p-8">
		<h1 class="h1">Formulaire d'Actualité</h1>
	</div>

	<div class="mt-4 w-full bg-surface-50 dark:bg-surface-800 rounded-container-token p-8">


		<form method="POST" action="?/upsert" id="upsert" class="actualite-form" use:enhance={submitCreateNote}>
			<div class="form-group">
				<label for="titre">Titre</label>
				<input
					id="titre"
					name="titre"
					bind:value={titre}
					contenteditable="true"
					type="text"
				/>
			</div>

			<div class="form-group">
				<label for="file">Image</label>
				<input
					type="file"
					id="file"
					name="photoFile"
					accept={['.jpg', '.jpeg', '.png', '.webp'].join(',')}
				/>
				{#if photo != null && photo.length != 0}
					<img src={photo} alt={titre} />
				{/if}
			</div>

			<div class="form-group">
				<label for="redacteur">Rédacteur</label>
				<input
					id="redacteur"
					name="redacteur"
					bind:value={redacteur}
					contenteditable="true"
					type="text"
				/>
			</div>
			<div class="form-group">
				<label for="tempsLecture">Temps de Lecture (en minutes)</label>
				<input
					id="tempsLecture"
					name="tempsLecture"
					bind:value={tempsLecture}
					contenteditable="true"
					type="number"
				/>
			</div>

			<div class="form-group">
				<label for="descriptionCourte">Description courte (200 caracteres max)</label>
				<textarea
					id="descriptionCourte"
					rows="3"
					cols="45"
					maxlength="200"
					name="descriptionCourte"
					bind:value={descriptionCourte}
					contenteditable="true"
				/>
			</div>

			<div class="form-group">
				<label for="contenu">Contenu</label>

				<div id="contenu" class="contenu"  >
					<Writer contenu={contenu}  bind:methods={writerMethods}/>
					
				</div>
			</div>
			<input type="hidden" name="id" value={id} />
			<input type="hidden" name="photo" value={photo} />
		</form> 

	</div>
</Content>
<!-- <div slot="buttons">
	<button
		class="back-button"
		on:click={() => {
			goto('/admin/actualites');
		}}>Retour aux actualites</button
	>
	{#if actualite != null && actualite.id != null && actualite.id.length != 0}
		<form action="?/delete" method="POST" use:enhance={submitDeleteNote}>
			<input type="hidden" name="id" value={actualite.id} />
			<button type="submit" class="delete-button">Supprimer</button>
		</form>
	{/if}
</div> -->
<!-- 
<div>
	

	
</div> -->
