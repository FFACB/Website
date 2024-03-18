<script lang="ts">
	import { actions } from '$lib/client/uploads/pictures/actions.js';
	import { onMount, type SvelteComponent } from 'svelte';
	import {
		showPictures,
		hidePictures,
		subscribePicturesAction
	} from '$lib/client/uploads/pictures/index.js';

	export let picture: Picture | null = null;
    export let pictureName = 'Photo principale';
    export let index = 0;

	subscribePicturesAction((event) => {
		const { type } = event;

		switch (type) {
			case actions.PICKED_PICTURE:
				picture = event.picture;
				break;
			case actions.DELETE_PICTURE:
				if (event.picture && event.picture.id == picture?.id) {
					picture = {
						id: 'null',
						path: 'null',
						createdAt: Date.prototype
					};
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

				<input type="hidden" name="pp_id_{index}" value="{picture?.id}" >
			</div>
			<div  class="basis-1/3 pl-4 pr-4 flex flex-col">
                <span class="ml-3 font-medium">Qulité</span>
				<select class="input" name="pp_quality_{index}" value="100">
					<option value="100">100</option>
					<option value="90">90</option>
                    <option value="80">80</option>
                    <option value="70">70</option>
                    <option value="60">60</option>
                    <option value="50">50</option>
				</select>
			</div>
			<div  class="basis-1/3 flex flex-col">
                <span class="ml-3 font-medium">Résolution</span>
				<select class="input" name="pp_resolution_{index}">
					<option value="full">Maximum</option>
					<option value="1920">Full HD (1920×1080)</option>
                    <option value="1280">Medium (1280x720)</option>
                    <option value="720">Low (720x480)</option>
				</select>
			</div>
		</div>
        <div>
			{#if picture != null}
				<div class="mt-4">
					<img class="card h-80 w-full bg-cover object-cover" alt="actualite" src={picture.path} />
				</div>
			{/if}
		</div >
	</div>
</div>
