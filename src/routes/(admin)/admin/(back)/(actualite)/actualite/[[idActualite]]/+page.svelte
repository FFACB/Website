<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';

	const toastStore = getToastStore();

	const toast: ToastSettings = {message: '', background: ''};


	export let data;
	let { actualite } = data;


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
		cancel: () => Promise<void>;
	}) => {
		const { titre, redacteur, tempsLecture, descriptionCourte, photoFile } =
			Object.fromEntries(data);

		if (titre == null || typeof titre !== 'string' || titre.length < 1) {
			
			toast.message = '❌ Le titre ne doit pas être vide';
			toast.background = 'variant-filled-danger';
			toastStore.trigger(toast);
			cancel();
		}

		if (redacteur == null || typeof redacteur !== 'string' || redacteur.length < 1) {
			
			toast.message = '❌ Le rédacteur ne doit pas être vide';
			toast.background = 'variant-filled-danger';
			toastStore.trigger(toast);
			cancel();
		}

		if (tempsLecture == null || typeof tempsLecture !== 'string' || tempsLecture.length < 1) {
			
			toast.message = '❌ Le temps de lecture ne doit pas être vide';
			toast.background = 'variant-filled-danger';
			toastStore.trigger(toast);
			cancel();
		}

		if (
			descriptionCourte == null ||
			typeof descriptionCourte !== 'string' ||
			descriptionCourte.length < 1
		) {
			
			toast.message = '❌ La description courte ne doit pas être vide';
			toast.background = 'variant-filled-danger';
			toastStore.trigger(toast);
			cancel();
		}
	

		data.append('contenu', (await writerMethods.saveContenu()) ?? '');

		data.append('id', actualite?.id ?? '');
		data.append('photo', actualite?.photo ?? '' );
		
		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: (data?: any) => Promise<void>;
		}) => {
			switch (result.type) {
				case 'success':

					toast.message = 'Actualité enregistré!';
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
					await applyAction(result);

					if(typeof result.data !== 'undefined'){
						actualite = result.data.data;
						if(actualite != null && actualite.id != null && actualite.id.length != 0){
							goto(`/admin/actualite/${actualite.id}`, { invalidateAll: true });
							writerMethods.loadContenu(actualite.contenu);
						}
							
					}
					

					break;
				case 'failure':
					toast.message = "Erreur lors de l'enregistrement";
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
	
					break;
				case 'error':
					toast.message = "Erreur lors de l'enregistrement";
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
	
					break;
				default:
					break;
			}

			await update();


			
		};
	};

	const submitDeleteNote = () => {
		return async ({ result, update }: {
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

<div>
	<h1>Formulaire d'Actualité</h1>

	<form method="POST" action="?/create" class="actualite-form" use:enhance={submitCreateNote}>
		<div class="form-group">
			<label for="titre">Titre</label>
			<input
				id="titre"
				name="titre"
				bind:value={actualite.titre}
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
			{#if actualite.photo != null && actualite.photo.length != 0}
				<img src={actualite.photo} alt={actualite.titre} />
			{/if}
		</div>

		<div class="form-group">
			<label for="redacteur">Rédacteur</label>
			<input
				id="redacteur"
				name="redacteur"
				bind:value={actualite.redacteur}
				contenteditable="true"
				type="text"
			/>
		</div>
		<div class="form-group">
			<label for="tempsLecture">Temps de Lecture (en minutes)</label>
			<input
				id="tempsLecture"
				name="tempsLecture"
				bind:value={actualite.tempsLecture}
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
				bind:value={actualite.descriptionCourte}
				contenteditable="true"
				type="text"
			/>
		</div>

		<div class="form-group">
			<label for="contenu">Contenu</label>

			<div id="contenu" class="contenu" name="contenu" required>
				<Writer bind:methods={writerMethods} contenu={actualite.contenu} />
			</div>
		</div>

		<button type="submit" for="envoyer" value="envoyer" class="submit-button">Enregistrer</button>
	</form>
</div>

<style lang="scss">
	.actualite-form {
		margin: 0px 20px;
		padding: 20px;
		background-color: var(--color-blanc);
		border: 1px solid var(--color-gris-clair);

		.form-group {
			margin-bottom: 20px;

			img {
				margin-top: 20px;
				width: 100%;
				height: auto;
				object-fit: cover;
				max-height: 300px;
			}

			label {
				font-family: var(--font-secondary-medium);
				color: var(--color-gris-dark);
				margin-bottom: 5px;
				display: block;
			}

			input[type='text'],
			input[type='number'],
			textarea,
			.contenu {
				width: 100%;
				padding: 10px;
				border: 1px solid var(--color-gris-clair);
				font-family: var(--font-secondary-regular);
				background: white;
			}
		}

		.submit-button {
			background-color: var(--color-jaune);
			color: var(--color-blanc);
			padding: 10px 20px;
			font-family: var(--font-secondary-bold);
			border: none;
			cursor: pointer;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: var(--color-bordeaux);
			}
		}
	}
</style>
