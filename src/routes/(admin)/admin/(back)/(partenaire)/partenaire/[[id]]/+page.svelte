<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { hideSpinner, showSpinner } from '$lib/client/spinner/index.js';
	import { onMount } from 'svelte';
	import PicturePicker from '$lib/components/admin/assets/pictures/PicturePicker.svelte';
	import {
		ENREGISTREMENT_ERROR,
		ENREGISTREMENT_FAILED,
		ENREGISTREMENT_SUCCES,
		FAILED,
		SUPRESSION_ERROR,
		SUPRESSION_FAILED,
		SUPRESSION_SUCCES
	} from '$lib/client/toasts/toasts.js';
	import Text from '$lib/components/admin/modules/detail/Text.svelte';
	import Textarea from '$lib/components/admin/modules/detail/Textarea.svelte';
	import Number from '$lib/components/admin/modules/detail/Number.svelte';

	const toastStore = getToastStore();

	let { data } = $props();

	let { partenaire, pictureAsset } = $state(data);

	let picturePicker: PicturePicker | null = $state(null);

	onMount(() => {
		picturePicker?.loadAssetRelation(pictureAsset);
	});

	const submitCreatePartenaire = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		const { name } = Object.fromEntries(formData);

		if (IsEmptyString(name)) {
			toastStore.trigger(FAILED.addMessage('Le nom du partenaire ne doit pas être vide').toToast());
			cancel();
			return;
		}

		showSpinner();
		return async ({ result }: { result: ActionResult; update: () => Promise<void> }) => {
			hideSpinner();

			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());

					if (typeof result.data !== 'undefined') {
						partenaire = result.data.partenaire;
						pictureAsset = result.data.pictureAsset;
						picturePicker?.loadAssetRelation(pictureAsset);
					}

					break;
				case 'failure':
					toastStore.trigger(ENREGISTREMENT_FAILED.addMessage(result.data?.errorMsg).toToast());

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

	const submitDeletePartenaire = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
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

			goto('/admin/partenaires', { invalidateAll: true });
		};
	};
</script>

<Content>
	{#snippet buttons()}
		<ButtonSave titre="Enregistrer" type="submit" value="Update" form="upsert" />
		{#if partenaire?.id != null}
			<ButtonDelete type="submit" value="Update" form="delete-partenaire-{partenaire?.id}" />

			<div class="hidden">
				<form
					action="?/delete"
					method="POST"
					id="delete-partenaire-{partenaire?.id}"
					use:enhance={submitDeletePartenaire}
				>
					<input type="hidden" name="id" value={partenaire.id} />
				</form>
			</div>
		{/if}
	{/snippet}

	<div class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1">
			{partenaire?.id == null ? 'Créer' : 'Modifier'} le Partenaire
		</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<form
			method="POST"
			action="?/upsert"
			id="upsert"
			class=""
			enctype="multipart/form-data"
			use:enhance={submitCreatePartenaire}
		>
			<Text name="Nom du partenaire" identifier="name" value={partenaire?.name} />
			<PicturePicker bind:this={picturePicker} assetName="Logo" />
			<Textarea name="Description" identifier="description" value={partenaire?.description} />
			<Text
				name="Lien vers le site internet"
				identifier="siteInternet"
				value={partenaire?.siteInternet}
			/>
			<Number
				name="Ordre d'affichage"
				identifier="ordre"
				value={partenaire?.ordre.toString()}
				min="0"
				step="1"
			/>

			<input type="hidden" name="id" value={partenaire?.id ?? null} />
		</form>
	</div>
</Content>
