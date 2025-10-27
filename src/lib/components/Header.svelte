<script>
	import SimpleButton from "./SimpleButton.svelte";

</script>
<header
	class="flex bg-white flex-row justify-between relative z-20 h-28 pl-16 pr-16 lg:pl-32 lg:pr-32 pt-4 pb-4 shadow-lg"
>
	<div class="">
		<a href="/">
			<img
				class="w-full h-full object-contain bg-contain"
				src="/images/pictos/FFACB_logo_horizontal_couleur.svg"
				alt="FFACB logo"
			/></a
		>
	</div>
	<div class="flex flex-row justify-between items-center">
		<div class="intro-darkblue m-2">
			<a class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap" href="/federation"
				>la fédération</a
			>
		</div>
		<div class="intro-darkblue m-2">
			<a class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap" href="/particuliers"
				>particuliers</a
			>
		</div>
		<div class="intro-darkblue m-2">
			<a
				class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap"
				href="/professionnels">professionnels</a
			>
		</div>
		<div class="intro-darkblue m-2">
			<a
				class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap"
				href="/actualites">Actualités</a
			>
		</div>
		<div class="intro-darkblue m-2">
			<a
				class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap"
				href="/contact">contact</a
			>
		</div>
	</div>
	<div class="flex flex-row items-center">
	
		<SimpleButton backgroundColor="bg-red" title="Ma coopérative" link="/cooperatives" borderColor="border-red"></SimpleButton>
		<SimpleButton backgroundColor="bg-blue" title="Votre espace" link="https://adherent.site-ffacb.fr/" borderColor="border-blue"></SimpleButton>
		
	</div>
</header>
