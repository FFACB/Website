<script>
	import Contact from '$lib/components/Contact.svelte';
    
    export let data;
	const { parametres } = data;
	const { PUBLIC_RECAPCHA_SITEKEY } = parametres;
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/placeholder.webp"
		alt="federation"
	/>
	<div class="relative ml-32 flex h-full w-2/5 flex-col justify-center items-center">
		<img
			class="absolute w-full bottom-0 h-full scale-y-125 z-10"
			alt="background"
			src="/images/FFACB_double_forme_entete_page_blue.png"
		/>
		<div class="z-10 p-16 flex flex-col justify-center text-white">
			<h1 class="w-full text-5xl font-extrabold mb-8 ml-12">Nous contacter</h1>
			<div class="flex flex-col justify-center items-start text-lg">
				<h2 class="uppercase font-bold ml-12">Siège social :</h2>
				<p class="font-semibold ml-12">FFACB</p>
				<div class="m-2 flex">
					<img src="/images/FFACB_picto_phone.svg" class="w-6 h-6 rounded-full bg-dark" alt="Map" />
					<a
						class="uppercase ml-4"
						href="https://www.google.com/maps/@45.9234846,6.0915712,15z?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"
						>Siège social <br /> 3 bis avenue Sainte Foy,<br /> 24500 Eymet</a
					>
				</div>
				<div class="m-2 flex">
					<img src="/images/FFACB_picto_phone.svg" class="w-6 h-6 rounded-full bg-dark" alt="Tel" />
					<a class="uppercase ml-4" href="tel:+33553235570">Tél. +33(0)5 53 23 55 70</a>
				</div>
				<br />
				<h2 class="uppercase font-bold ml-12">Services administratifs :</h2>
				<p class="font-semibold ml-12">FFACB</p>
				<div class="m-2 flex">
					<img src="/images/FFACB_picto_phone.svg" class="w-6 h-6 rounded-full bg-dark" alt="Tel" />
					<p class="uppercase ml-4">BP 15 - 24500 Eymet</p>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="bg-white text-center pl-16 pr-16 pt-8 pb-8 flex flex-col justify-center items-center z-0 relative ">
	<Contact {PUBLIC_RECAPCHA_SITEKEY}></Contact>
</div>
<div class="bg-lightgrey pb-4">
	<h3 class="h2-blue font-bold text-center p-4">Nos dernières actualités</h3>
	<div class="flex flex-row flex-wrap justify-center items-center w-full pr-32 pl-32">
		<div class="basis-1/3 p-2">
			<div class="bg-white rounded-3xl flex flex-col justify-center items-start p-4 h-full">
				<div class="w-full overflow-hidden mb-4">
					<img
						src="/images/IMG_7772.JPG"
						alt="article"
						class="w-full h-full object-cover bg-cover rounded-3xl"
					/>
				</div>

				<h4 class="h2-blue text-sm font-bold">
					Quelles sont les étapes pour faire construire sa maison individuelle ?
				</h4>
				<p class="text-dark text-sm mb-8">
					Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie
					qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques
					points incontournables pour garantir l'aboutissement de son projet en toute sérénité.
				</p>
				<div class="w-full flex items-end justify-end">
					<div class="w-max p-4 pt-2 pb-2 font-bold text-white bg-dark rounded-full">
						<a class="uppercase" href="/actualites">Lire plus</a>
					</div>
				</div>
			</div>
		</div>
		<div class="basis-1/3 p-2">
			<div class="bg-white rounded-3xl flex flex-col justify-center items-start p-4 h-full">
				<div class="w-full overflow-hidden mb-4">
					<img
						src="/images/IMG_7772.JPG"
						alt="article"
						class="w-full h-full object-cover bg-cover rounded-3xl"
					/>
				</div>

				<h4 class="h2-blue text-sm font-bold">
					Quelles sont les étapes pour faire construire sa maison individuelle ?
				</h4>
				<p class="text-dark text-sm mb-8">
					Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie
					qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques
					points incontournables pour garantir l'aboutissement de son projet en toute sérénité.
				</p>
				<div class="w-full flex items-end justify-end">
					<div class="w-max p-4 pt-2 pb-2 font-bold text-white bg-dark rounded-full">
						<a class="uppercase" href="/actualites">Lire plus</a>
					</div>
				</div>
			</div>
		</div>
		<div class="basis-1/3 p-2">
			<div class="bg-white rounded-3xl flex flex-col justify-center items-start p-4 h-full">
				<div class="w-full overflow-hidden mb-4">
					<img
						src="/images/IMG_7772.JPG"
						alt="article"
						class="w-full h-full object-cover bg-cover rounded-3xl"
					/>
				</div>

				<h4 class="h2-blue text-sm font-bold">
					Quelles sont les étapes pour faire construire sa maison individuelle ?
				</h4>
				<p class="text-dark text-sm mb-8">
					Avoir pour objectif de faire construire sa maison individuelle est un vrai projet de vie
					qui enclenche mille questions. Pour éviter les manquements et déconvenues, voici quelques
					points incontournables pour garantir l'aboutissement de son projet en toute sérénité.
				</p>
				<div class="w-full flex items-end justify-end">
					<div class="w-max p-4 pt-2 pb-2 font-bold text-white bg-dark rounded-full">
						<a class="uppercase" href="/actualites">Lire plus</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
