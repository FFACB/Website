<script>
	import Contact from '$lib/components/Contact.svelte';
	import TriplesActualites from '$lib/components/TriplesActualites.svelte';

	export let data;
	const { parametres, actualites } = data;
	const { PUBLIC_RECAPCHA_SITEKEY } = parametres;
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/JMV8.jpg?width=1920&height=1080"
		alt="federation"
	/>
	<div class="relative ml-32 flex h-full w-2/5 flex-col justify-center items-center">
		<div class="absolute top-50 z-10">
			<img
				class="w-full h-full object-cover bg-cover scale-x-[2] scale-y-150"
				alt="background"
				src="/images/pictos/FFACB_formebleu.svg"
			/>
		</div>

		<div class="z-10 p-16 flex flex-col justify-center text-white">
			<h1 class="w-full text-5xl font-extrabold mb-8 ml-12">Nous contacter</h1>
			<div class="flex flex-col justify-center items-start text-lg">
				<h2 class="uppercase font-bold ml-12">Siège social :</h2>
				<p class="font-semibold ml-12">FFACB</p>
				<div class="m-2 flex">
					<img
						src="/images/pictos/FFACB_picto_localisation_dark.svg"
						class="w-6 h-6 rounded-full bg-dark"
						alt="Map"
					/>
					<a
						class="uppercase ml-4"
						href="https://www.google.com/maps/@45.9234846,6.0915712,15z?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
						>Siège social <br /> 3 bis avenue Sainte Foy,<br /> 24500 Eymet</a
					>
				</div>
				<div class="m-2 flex">
					<img
						src="/images/pictos/FFACB_picto_phone_dark.svg"
						class="w-6 h-6 rounded-full bg-dark"
						alt="Tel"
					/>
					<a class="uppercase ml-4" href="tel:+33553235570">Tél. +33(0)5 53 23 55 70</a>
				</div>
				<br />
				<h2 class="uppercase font-bold ml-12">Services administratifs :</h2>
				<p class="font-semibold ml-12">FFACB</p>
				<div class="m-2 flex">
					<img
						src="/images/pictos/FFACB_picto_localisation_dark.svg"
						class="w-6 h-6 rounded-full bg-dark"
						alt="Tel"
					/>
					<p class="uppercase ml-4">BP 15 - 24500 Eymet</p>
				</div>
			</div>
		</div>
	</div>
</div>
<div
	class="bg-white text-center pl-16 pr-16 pt-8 pb-8 flex flex-col justify-center items-center z-0 relative"
>
	<Contact {PUBLIC_RECAPCHA_SITEKEY}></Contact>
</div>

<TriplesActualites {actualites}></TriplesActualites>
