<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';

	let { data } = $props();
	const { parametres } = data;
	const { PUBLIC_RECAPCHA_SITEKEY } = parametres;
</script>

<h1 class="font-extrabold">Home</h1>
<Contact {PUBLIC_RECAPCHA_SITEKEY} />
