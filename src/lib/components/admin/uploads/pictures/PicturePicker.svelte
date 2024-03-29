<script lang="ts">
	import { actions } from '$lib/client/uploads/pictures/actions.js';
	import qualities, { Quality } from '$lib/client/uploads/pictures/quality';
	import resolutions, { Resolution } from '$lib/client/uploads/pictures/resolution';
	import { onMount, type SvelteComponent } from 'svelte';
	import {
		showPictures,
		hidePictures,
		subscribePicturesAction
	} from '$lib/client/uploads/pictures/index.js';
	import type { PictureRelation } from '@prisma/client';

	export let pictureRelation: PictureRelation | null = null;
	let picture : Picture | null = null;
    export let pictureName = 'Photo principale';
    export let index = 0;

	let resolution = Resolution.fromInput(pictureRelation?.resolution)
	let quality = Quality.fromInput(pictureRelation?.quality)

	subscribePicturesAction((event) => {
		const { type } = event;
		
		switch (type) {
			case actions.PICKED_PICTURE:
				picture = event.picture;
				break;
			case actions.DELETE_PICTURE:
				
				if (event.picture) {
					if(event.picture.id == picture?.id){
						picture = null
					}
					if(event.picture.id == pictureRelation?.pictureId){
						pictureRelation = null
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
					value={"Choisir une image dans la galerie"}
					on:click={() => {
						showPictures();
					}}
				/>

				<input type="hidden" name="pp_id_{index}" value="{picture?.id ?? pictureRelation?.pictureId}" >
			</div>
			<div  class="basis-1/3 pl-4 pr-4 flex flex-col">
                <span class="ml-3 font-medium">Qulité</span>
				<select class="input" name="pp_quality_{index}" value="{quality.value()}">
					{#each qualities as quality }
						<option value="{quality.value()}">{quality.key()}</option>
					{/each}
					
				</select>
			</div>
			<div  class="basis-1/3 flex flex-col">
                <span class="ml-3 font-medium">Résolution</span>
				<select class="input" name="pp_resolution_{index}" value="{resolution.value()}">
					{#each resolutions as resolution }
					<option value="{resolution.value()}">{resolution.key()}</option>
				{/each}
				</select>
			</div>
		</div>
        <div>
			{#if picture != null || pictureRelation != null}
				<div class="mt-4">
					<img class="card h-80 w-full bg-cover object-cover" alt="actualite" src={picture?.path ?? pictureRelation?.path} />
				</div>
			{/if}
		</div >
	</div>
</div>
