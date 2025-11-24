<script>
	import SimpleButton from '$lib/components/SimpleButton.svelte';

	export let data;
	const { actualitesDatas } = data;
	const { actualites, count, pageNumber, maxPageNumber, pages } = actualitesDatas;
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/DSC03-6-scaled.jpg?width=1920&height=1080"
		alt="federation"
	/>
	<div
		class="relative sm:ml-32 ml-0 flex h-[100%] sm:w-2/5 w-full flex-col justify-end items-center overflow-hidden"
	>
		<img
			class="absolute w-full top-0 sm:block hidden"
		alt="background" src="/images/pictos/FFACB_formebleu.svg" />
		<div class="z-10 p-16 flex flex-col justify-center mb-32">
			<h1 class="w-full h1-white font-extrabold mb-8">Nos actualites</h1>
		</div>
	</div>
</div>

<div class="bg-white sm:p-32 sm:pt-16  pb-16 flex flex-col justify-center items-center">
	<div class="flex flex-row flex-wrap justify-center items-center w-full ">
		{#each actualites as actualite}
			<div class="sm:basis-1/3 basis-full p-2 h-full flex-1 max-h-[34rem]" style="height: -webkit-fill-available;">
				<div
					class="bg-white rounded-3xl flex flex-col justify-between items-start p-4 h-full  border border-dark"
				>
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

	<div class="w-full flex justify-end items-center mt-4 mb-2">
		{#each pages as page}
			<div class="p-2 {pageNumber == page ? 'text-blue' : 'text-dark cursor-pointer'}">
				<a data-sveltekit-reload href="/actualites?page={page}">{page}</a>
			</div>
			{#if !(page == pages.length)}
				<div>|</div>
			{/if}
		{/each}
	</div>
</div>
