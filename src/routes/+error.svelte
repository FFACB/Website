<script lang="ts">
	import { onMount } from 'svelte';
	import './(front)/app.pcss';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
</script>

<div class="w-full h-full flex flex-col justify-end items-start relative shadow-inner">
	<div class=" w-full h-full">
		<img
			class="w-full h-full object-cover bg-cover"
			src="/images/aa13a171-ec01-489e-bd5d-36032fb5352b.jpg?width=1920&height=1080"
			alt="federation"
		/>
	</div>

	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<h1 class="w-full h1-white font-extrabold mb-8 text-5xl">
			La Féderation Française des artisans Coopérateurs du Bâtiment
		</h1>
		<h2 class="w-full h2-blue font-extrabold mb-8">404 - Page non trouvée</h2>

		<SimpleButton link="/" title="Accueil" borderColor="border-dark" backgroundColor="bg-dark"
		></SimpleButton>
	</div>
</div>
