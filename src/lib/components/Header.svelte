<script>
	import SimpleButton from './SimpleButton.svelte';

	let menuOpen = false;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<header
	class="flex bg-white flex-row justify-between items-center relative z-20 h-28 pl-16 pr-16 lg:pl-32 lg:pr-32 pt-4 pb-4 shadow-lg"
>
	<div class="h-full">
		<a href="/">
			<img
				class="w-full h-full object-contain bg-contain"
				src="/images/pictos/FFACB_logo_horizontal_couleur.svg"
				alt="FFACB logo"
			/></a
		>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="h-8 relative justify-between items-center sm:hidden cursor-pointer w-8"
		on:click={() => (menuOpen = !menuOpen)}
	>
		<div
			class="w-10 h-1 bg-blue transition-all duration-300 absolute left-0 {menuOpen
				? 'rotate-45 top-4'
				: 'top-0'}"
		></div>
		<div
			class="w-10 h-1 bg-blue absolute transition-all duration-300 top-1/2 -translate-y-1/2 left-0 {menuOpen
				? 'hidden'
				: 'block'}"
		></div>
		<div
			class="w-10 h-1 bg-blue absolute transition-all duration-300 left-0 {menuOpen
				? '-rotate-45 bottom-3'
				: 'bottom-0'} "
		></div>
	</div>

	<div
		class=" flex-row justify-between items-center sm:flex absolute sm:relative sm:w-auto sm:top-auto top-full sm:left-auto left-0 bg-white w-full text-center { menuOpen ? 'block' : "hidden"}"
	>
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
			<a class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap" href="/actualites"
				>Actualités</a
			>
		</div>
		<div class="intro-darkblue m-2">
			<a class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap" href="/contact"
				>contact</a
			>
		</div>

		<div class=" sm:hidden flex-row items-center flex justify-center">
			<SimpleButton
				backgroundColor="bg-red"
				title="Ma coopérative"
				link="/cooperatives"
				borderColor="border-red"
			></SimpleButton>
			<SimpleButton
				backgroundColor="bg-blue"
				title="Votre espace"
				link="https://adherent.site-ffacb.fr/"
				borderColor="border-blue"
			></SimpleButton>
		</div>
	</div>
	<div class="flex flex-row items-center sm:flex hidden">
		<SimpleButton
			backgroundColor="bg-red"
			title="Ma coopérative"
			link="/cooperatives"
			borderColor="border-red"
		></SimpleButton>
		<SimpleButton
			backgroundColor="bg-blue"
			title="Votre espace"
			link="https://adherent.site-ffacb.fr/"
			borderColor="border-blue"
		></SimpleButton>
	</div>
</header>
