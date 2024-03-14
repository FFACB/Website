<script lang="ts">

	import { actions} from '$lib/client/uploads/pictures/actions.js';
	import { onMount, type SvelteComponent } from 'svelte';
	import { showPictures, hidePictures , subscribePicturesAction} from '$lib/client/uploads/pictures/index.js';
	import { invalidate, invalidateAll } from '$app/navigation';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
export let picture: Picture | null = null;


subscribePicturesAction((event) => {
		const { type } = event;
		
		switch(type){
			case actions.PICKED_PICTURE:
				picture = event.picture;
				break;
			case actions.DELETE_PICTURE:
                debugger
              
				if(event.picture && event.picture.id == picture?.id){
					picture = {
                        id: "null",
                        path: "null",
                        createdAt: Date.prototype,
                    }
				}
				break;
		}
	});

</script>

<form>
    <label class="label mb-4" for="galery">
        <span class="ml-3 font-semibold">Galerie</span>
        <input
            class="input"
            type="button"
            value="Choisir une image"
            name="galery"
            on:click={() => {
                showPictures()
            }}
        />
    </label>
    <ButtonSave titre="Importer" type="submit" value="Creer" form="create" />
</form>


{#if picture != null }
    <div class="mt-2 mb-4">
        <img
            class="card h-80 w-full bg-cover object-cover"
            alt="actualite"
            src={picture.path}
        />
    </div>
{/if}