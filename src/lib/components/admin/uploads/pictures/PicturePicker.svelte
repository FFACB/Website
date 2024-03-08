<script lang="ts">
import { showPictures, hidePictures , subscribePicturesAction} from '$lib/client/uploads/pictures/index.js';
	import { actions} from '$lib/client/uploads/pictures/actions.js';
	import { onMount, type SvelteComponent } from 'svelte';

export let picture: Picture | null = null;

</script>


<label class="label mb-4" for="file">
    <span class="ml-3 font-semibold">Galerie</span>
    <input
        class="input"
        type="button"
        id="gal"
        name="gal"
        on:click={() => {
            showPictures()
        }}
    />
</label>


{#if picture != null }
    <div class="mt-2 mb-4">
        <img
            class="card h-80 w-full bg-cover object-cover"
            alt="actualite"
            src={picture.path}
        />
    </div>
{/if}