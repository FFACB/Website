<script lang="ts">
	import { actions } from '$lib/client/uploads/pictures/stores-actions.js';
	import qualities, { Quality } from '$lib/client/uploads/pictures/quality';
	import resolutions, { Resolution } from '$lib/client/uploads/pictures/resolution';
	import ButtonDelete from '../../buttons/delete/ButtonDelete.svelte';
	import {
		showPictures,
		subscribePicturesAction
	} from '$lib/client/uploads/pictures/stores.js';
	import type { PictureRelation } from '@prisma/client';
	import { v4 as uuid } from 'uuid';

	let galeryPicture: Picture | null = null;
	export let savedPicture: PictureRelation | null = null;
	export let pictureName = 'Photo';
	export let identifier: string = '0';

	const picturePickerId = uuid();
	let resolution = Resolution.fromInput(savedPicture?.resolution);
	let quality = Quality.fromInput(savedPicture?.quality);

	export function deletePictureRelation() {
		galeryPicture = null;
		savedPicture = null;
	}

	export function loadPictureRelation(_savedPicture: PictureRelation | null) {
		
		deletePictureRelation();
		savedPicture = _savedPicture;
		resolution = Resolution.fromInput(savedPicture?.resolution);
		quality = Quality.fromInput(savedPicture?.quality);

	}

	subscribePicturesAction(picturePickerId, (event) => {
		const { type } = event;

		switch (type) {
			case actions.PICKED_PICTURE:
				if (event.picturePickerId == picturePickerId) galeryPicture = event.picture;
				break;

			case actions.DELETE_PICTURE:
				if (event.picture) {
					const id = event.picture.id;
					if (id == galeryPicture?.id || id == savedPicture?.pictureId) {
						deletePictureRelation();
					}
				}
				break;
		}
	});
</script>

<div class=" mb-4">
	<!-- <span class="ml-3 font-semibold">Galerie</span> -->
	<div class="rounded-container-token">
		<div class="flex">
			<div class="basis-1/3 flex flex-col">
				<span class="ml-3 font-medium">{pictureName}</span>
				<input
					class="input h-full"
					type="button"
					value={'Choisir une image dans la galerie'}
					on:click={() => {
						showPictures(picturePickerId);
					}}
				/>

				<input
					type="hidden"
					name="pp_id_{identifier}"
					value={galeryPicture?.id ?? savedPicture?.pictureId}
				/>
			</div>
			<div class="basis-1/3 pl-4 pr-4 flex flex-col">
				<span class="ml-3 font-medium">Qulité</span>
				<select class="input" name="pp_quality_{identifier}" value={quality.value()}>
					{#each qualities as quality}
						<option value={quality.value()}>{quality.key()}</option>
					{/each}
				</select>
			</div>
			<div class="basis-1/3 flex flex-col">
				<span class="ml-3 font-medium">Résolution</span>
				<select class="input" name="pp_resolution_{identifier}" value={resolution.value()}>
					{#each resolutions as resolution}
						<option value={resolution.value()}>{resolution.key()}</option>
					{/each}
				</select>
			</div>
		</div>
		<div>
			{#if galeryPicture != null || savedPicture != null}
				<div class="mt-4 relative">
					<ButtonDelete
						class="absolute top-4 right-4"
						id="btn-relation"
						click={() => {
							deletePictureRelation();
						}}
					/>

					<img
						class="card h-80 w-full bg-cover object-cover"
						alt="actualite"
						src={galeryPicture?.path ?? savedPicture?.path}
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
