<script lang="ts">
	interface Props {
		actualites: ActualiteListing[];
	}

	let { actualites }: Props = $props();
</script>

<footer class="flex flex-col pl-16 pr-16 pt-4 pb-4 shadow-lg bg-dark">
	<div class="flex w-full h-full sm:flex-row flex-col justify-between items-start sm:text-start text-center">
		<div class="sm:w-1/5 w-full sm:h-full h-56 p-8 ">
			<a href="/">
				<img
					class="w-full h-full bg-contain object-contain"
					src="/images/pictos/FFACB_logo_icone_white.svg"
					alt="FFACB logo"
				/></a
			>
		</div>
		<div class="sm:w-1/5 w-full sm:mt-0 mt-16 text-white">
			<div class=" m-2">
				<a class="uppercase" href="/federation">la fédération</a>
			</div>
			<div class=" m-2">
				<a class="uppercase" href="/particuliers">particuliers</a>
			</div>
			<div class=" m-2">
				<a class="uppercase" href="/professionnels">professionnels</a>
			</div>
			<div class=" m-2">
				<a class="uppercase" href="/actualites">Actualités</a>
			</div>
			<div class=" m-2">
				<a class="uppercase" href="/contact">contact</a>
			</div>
			<div class=" m-2 text-red">
				<a class="uppercase" href="/federation">ma cooperative</a>
			</div>
			<div class=" m-2 text-blue">
				<a class="uppercase" href="/professionnels">votre espace</a>
			</div>
		</div>
		<div class="sm:w-1/5 w-full sm:mt-0 mt-16 text-white">
			<div class=" m-2">
				<a class="uppercase font-bold" href="/actualites">Dernieres actualites</a>
			</div>
			{#each actualites as actualite}
				<div class=" m-2">
					<a class="uppercase" href="/actualites/{actualite.id}">{actualite.titre}</a>
				</div>
			{/each}
		</div>
		<div class="sm:w-1/5 w-full sm:mt-0 mt-16 text-white text-left">
			<div class="m-2">
				<a class="uppercase font-bold" href="/contact">Nous contacter</a>
			</div>
			<div class="m-2 flex mb-4">
				<img src="/images/pictos/FFACB_picto_phone.svg" class="w-6 h-6 rounded-full" alt="Tel" />
				<a class="uppercase ml-4" href="tel:+33553235570">+33(0)5 53 23 55 70</a>
			</div>
			<div class="m-2 flex">
				<img
					src="/images/pictos/FFACB_picto_localisation.svg"
					class="w-6 h-6 rounded-full"
					alt="Map"
				/>
				<a
					class="uppercase ml-4"
					href="https://www.google.com/maps/@45.9234846,6.0915712,15z?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
					>Siège social <br /> 3 bis avenue Sainte Foy,<br /> 24500 Eymet</a
				>
			</div>
		</div>
	</div>
	<div class="flex justify-center items-center text-white font-light text-sm">
		<a href="/cookies">Politique de cookies</a>
		|
		<a href="/mentions">Mentions légales</a>
		|
		<a target="_blank" href="https://www.sogocom.fr">Réalisation : Sogo Com</a>
	</div>
</footer>
