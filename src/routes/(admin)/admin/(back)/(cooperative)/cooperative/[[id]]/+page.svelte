<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type.js';
	import Writer from '$lib/components/editor/Writer.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import Content from '$lib/components/admin/content/Content.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonDelete from '$lib/components/admin/buttons/delete/ButtonDelete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { hideSpinner, showSpinner } from '$lib/client/spinner/index.js';
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
	import Number from '$lib/components/admin/modules/detail/Number.svelte';
	import PicturePicker from '$lib/components/admin/assets/pictures/PicturePicker.svelte';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();

	let { data } = $props();

	let {
		cooperative,
		cooperativeRegion,
		cooperativeRegions,
		pictureAsset1,
		pictureAsset2,
		pictureAsset3
	} = $state(data);

	let picturePicker1: PicturePicker | null = $state(null);
	let picturePicker2: PicturePicker | null = $state(null);
	let picturePicker3: PicturePicker | null = $state(null);

	onMount(() => {
		picturePicker1?.loadAssetRelation(pictureAsset1);
		picturePicker2?.loadAssetRelation(pictureAsset2);
		picturePicker3?.loadAssetRelation(pictureAsset3);
	});

	const submitCreateCooperative = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		const { name } = Object.fromEntries(formData);

		if (IsEmptyString(name)) {
			toastStore.trigger(
				FAILED.addMessage('Le nom de la coopérative ne doit pas être vide').toToast()
			);
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
						cooperative = result.data.cooperative;
						cooperativeRegion = result.data.cooperativeRegion;
						pictureAsset1 = result.data.pictureAsset1;
						pictureAsset2 = result.data.pictureAsset2;
						pictureAsset3 = result.data.pictureAsset3;
						picturePicker1?.loadAssetRelation(pictureAsset1);
						picturePicker2?.loadAssetRelation(pictureAsset2);
						picturePicker3?.loadAssetRelation(pictureAsset3);
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

	const submitDeleteCooperative = () => {
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

			goto('/admin/cooperatives', { invalidateAll: true });
		};
	};
</script>

<Content>
	{#snippet buttons()}
		<ButtonSave titre="Enregistrer" type="submit" value="Update" form="upsert" />
		{#if cooperative?.id != null}
			<ButtonDelete type="submit" value="Update" form="delete-cooperative-{cooperative?.id}" />

			<div class="hidden">
				<form
					action="?/delete"
					method="POST"
					id="delete-cooperative-{cooperative?.id}"
					use:enhance={submitDeleteCooperative}
				>
					<input type="hidden" name="id" value={cooperative.id} />
				</form>
			</div>
		{/if}
	{/snippet}

	<div class="head w-full bg-surface-50 dark:bg-surface-800 rounded-container-token pl-8 pr-8 p-4">
		<h1 class="h1">
			{cooperative?.id == null ? 'Créer' : 'Modifier'} la coopérative
		</h1>
	</div>

	<div class="mt-4 w-full bg-surface-300 dark:bg-surface-800 rounded-container-token p-8">
		<form
			method="POST"
			action="?/upsert"
			id="upsert"
			class=""
			enctype="multipart/form-data"
			use:enhance={submitCreateCooperative}
		>
			<Text name="Nom de la coopérative" identifier="name" value={cooperative?.name} />

			<label class="label mb-4" for="cooperativeRegionId">
				<span class="ml-3 font-semibold">Régions</span><br />
				<select
					id="cooperativeRegionId"
					class="input"
					name="cooperativeRegionId"
					value={cooperative?.cooperativeRegionId}
				>
					{#each cooperativeRegions as cooperativeRegion}
						<option value={cooperativeRegion.id}>{cooperativeRegion.name}</option>
					{/each}
				</select>
			</label>
			<Text name="Siren" identifier="siren" value={cooperative?.siren} />
			<Text name="Adresse" identifier="adresse" value={cooperative?.adresse} />
			<Text
				name="informations complementaires"
				identifier="infoComplementaire"
				value={cooperative?.infoComplementaire}
			/>

			<Number name="CP" identifier="cp" value={cooperative?.cp.toString()} />
			<Text name="Ville" identifier="ville" value={cooperative?.ville} />
			<Text name="Site Internet" identifier="siteInternet" value={cooperative?.siteInternet} />
			<Text name="Adresse Mail" identifier="adresseMail" value={cooperative?.adresseMail} />
			<Text name="Telephone" identifier="telephone" value={cooperative?.telephone} />
			<Text name="Contact 1 Nom" identifier="contact1Nom" value={cooperative?.contact1Nom} />
			<Text
				name="Contact 1 Téléphone"
				identifier="contact1telephone"
				value={cooperative?.contact1telephone}
			/>
			<Text name="Contact 1 Email" identifier="contact1Email" value={cooperative?.contact1Email} />
			<Text name="Contact 2 Nom" identifier="contact2Nom" value={cooperative?.contact2Nom} />
			<Text
				name="Contact 2 Téléphone"
				identifier="contact2telephone"
				value={cooperative?.contact2telephone}
			/>
			<Text name="Contact 2 Email" identifier="contact2Email" value={cooperative?.contact2Email} />
			<Text name="Latitude" identifier="latitude" value={cooperative?.latitude} />
			<Text name="Longitude" identifier="longitude" value={cooperative?.longitude} />

			<PicturePicker bind:this={picturePicker1} assetName="Photo 1" />
			<PicturePicker bind:this={picturePicker2} identifier="1" assetName="Photo 2" />
			<PicturePicker bind:this={picturePicker3} identifier="2" assetName="Photo 3" />

			<Text name="Lien video" identifier="lienVideo" value={cooperative?.lienVideo} />

			<input type="hidden" name="id" value={cooperative?.id ?? null} />
		</form>
	</div>
</Content>
