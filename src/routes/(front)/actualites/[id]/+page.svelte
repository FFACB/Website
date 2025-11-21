<script lang="ts">
	import Reader from '$lib/components/editor/Reader.svelte';

	export let data;
	const { actualite , pictureAsset} = data;
</script>

<div class="bg-white">

    <div class="flex flex-col justify-center items-center p-16 pr-48 pl-48 pb-48">

        <h1 class="h2-blue font-bold text-center mb-16">
            {actualite?.titre}
        </h1>

        <img src="{pictureAsset?.path}" alt="article" class="w-full h-3/4 object-cover bg-cover rounded-3xl" />

        <p class="font-semibold text-start w-full mt-16">
            {actualite?.description}
        </p>

        <div class="w-full text-start mt-8">
            <Reader contenu={actualite?.contenu ?? ''} />
        </div>
        
    </div>

</div>
