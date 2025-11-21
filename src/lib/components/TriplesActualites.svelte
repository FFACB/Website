<script lang="ts">
	// import type { Actualite } from '@prisma/client';
	import SimpleButton from './SimpleButton.svelte';

	interface Props {
		actualites: any[];
	}
	
	let { actualites }: Props = $props();

</script>

<div class="bg-lightgrey pb-4">
	<h3 class="h2-blue font-bold text-center p-4">Nos dernières actualités</h3>
	<div class="flex flex-row flex-wrap justify-center items-center w-full pr-32 pl-32">
		{#each actualites as actualite}
			<div class="basis-1/3 p-2"  style="height: -webkit-fill-available;">
				<div class="bg-white rounded-3xl flex flex-col justify-between items-start p-4 h-full">
					<div class="w-full overflow-hidden mb-4">
						<img
							src={actualite.photo}
							alt="article"
							class="w-full h-full object-cover bg-cover rounded-3xl"
						/>
					</div>

					<h4 class="h2-blue text-sm font-bold">
						{actualite.titre}
					</h4>
					<p class="text-dark text-sm mb-8">
						{actualite.description}
					</p>
					<div class="w-full flex items-end justify-end">
						<SimpleButton
							title="Lire plus"
							link="/actualites/{actualite.id}"
							backgroundColor="bg-dark"
							borderColor="border-dark"
						></SimpleButton>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="w-full flex justify-center items-center mt-4 mb-2">
		<SimpleButton
			title="Toutes les actualités"
			link="/actualites"
			backgroundColor="bg-blue"
			borderColor="border-blue"
		></SimpleButton>
	</div>
</div>
