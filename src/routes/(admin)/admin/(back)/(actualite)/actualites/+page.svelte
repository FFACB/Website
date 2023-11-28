<script lang="ts">
	
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonCreate from '$lib/components/admin/buttons/create/ButtonCreate.svelte';

	const toastStore = getToastStore();
	export let data;
	let { actualites } = data;
	
	const toast: ToastSettings = {message: '', background: ''};


	const submitDeleteNote  = () => {

		debugger

		return  async  ({ result , update } : { result: ActionResult, update: (data?: any) => Promise<void> } ) => {
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
		
		<ButtonCreate titre="Créer" link="/admin/actualite" target="_blank"/>
		<!--  type="submit" value="Update" form="delete" -->
		<!-- Buttons ici -->
		
	</svelte:fragment>



	<div class="grid-view">
		<h1>
			{actualites.length == 0 ? 'Aucune actualité' : 'Liste des actualites'}
		</h1>

		<table class="actualite-table" style={actualites.length == 0 ? 'display:none;' : ''}>
			<thead>
				<tr>
					<th>Titre</th>
					<th>Redacteur</th>
					<th>Date de création</th>
					<th>Supprimer</th>
				</tr>
			</thead>
			<tbody>
				{#each actualites as actualite, index}
					<tr>
						<td
							><a href="/admin/actualite/{actualite.id}">{actualite?.titre ?? 'Aucun titre'}</a
							></td
						>
						<td>{actualite?.redacteur ?? 'Aucun rédacteur'}</td>

						<td
							>{new Intl.DateTimeFormat('fr-FR', {
								dateStyle: 'full',
								timeStyle: 'long'
							}).format(actualite?.createdAt)}</td
						>
						<td
							>
							
							
								<form action="?/delete" method="POST" use:enhance={submitDeleteNote}>
									<input type="hidden" name="id" value={actualite.id} />
									<button type="submit" class="delete-button">Supprimer</button>
								</form>

							
							</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Content>
<style lang="scss">



	.actualite-table {
		width: 100%;
		border-collapse: collapse;

		th,
		td {
			border: 1px solid var(--color-gris-clair);
			padding: 10px;
			text-align: left;
			a {
				color: #000;
				&:hover {
					color: var(--color-rose);
				}
			}
		}

		th {
			background-color: var(--color-jaune);
			color: var(--color-blanc);
			font-family: var(--font-secondary-bold);
		}

		td {
			font-family: var(--font-secondary-regular);
		}

		.delete-button {
			background-color: var(--color-rose); /* Couleur de fond */
			color: var(--color-blanc); /* Couleur du texte */
			padding: 10px 20px; /* Espacement interne */
			font-family: var(--font-secondary-bold); /* Police */
			border: none; /* Supprime la bordure */
			cursor: pointer; /* Curseur au survol */
			width: 100%;
			transition: background-color 0.3s ease; /* Transition au survol */
			&:hover {
				background-color: var(--color-bordeaux); /* Couleur de fond au survol */
			}
		}

		tbody tr:nth-child(even) {
			background-color: var(--color-gris-clair);
		}
	}

	.grid-view {
		max-width: var(--tablet);
		margin: 0 auto;
		padding: 20px;
		text-align: center;
		overflow: auto;
		max-height: 90vh;

		h1 {
			font-family: var(--font-primary-bold);
			color: var(--color-rose);
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(
				3,
				1fr
			); /* Trois colonnes par ligne, ajustez selon vos besoins */
			gap: 20px; /* Espacement entre les éléments */
		}

		.grid-item {
			background-color: var(--color-blanc);
			border: 1px solid var(--color-gris-clair);
			padding: 20px;

			/* Styles spécifiques pour le contenu de la demande de actualite */

			/* Exemple de style pour le titre de la demande */
			.request-title {
				font-family: var(--font-secondary-medium);
				color: var(--color-bleu);
				font-size: 18px;
				margin-bottom: 10px;
			}

			/* Exemple de style pour les détails de la demande */
			.request-details {
				font-family: var(--font-secondary-regular);
				color: var(--color-gris-dark);
			}
		}
	}
</style>
