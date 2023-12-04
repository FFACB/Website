<script lang="ts">
	// @ts-nocheck

	import { PUBLIC_RECAPCHA_SITEKEY } from '$env/static/public';
	let formData = {
		nom: ''
	};

	async function handleSubmit() {
		try {
			grecaptcha.ready(async () => {
				const token = await grecaptcha.execute(PUBLIC_RECAPCHA_SITEKEY, { action: 'contact' });
				var data = {
					formData,
					token: token
				};

				const response = await fetch('/api/contact', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});

				if (response.ok) {
					console.log('Formulaire soumis avec succès!');
					// Effectuez d'autres actions en cas de succès
				} else {
					console.error('Erreur lors de la soumission du formulaire.');
					// Gérez les erreurs ici
				}
			});
		} catch (error) {
			console.error("Une erreur s'est produite:", error);
			// Gérez les erreurs ici
		}
	}
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPCHA_SITEKEY}"
	></script>
</svelte:head>

<form action="contact" name="contact" id="contact" on:submit|preventDefault={handleSubmit}>
	<label class="label" for="nom">
		<span class="ml-3 font-semibold">Nom</span>
		<input class="input" value={formData.nom} name="nom" contenteditable="true" type="text" />
	</label>

	<label class="label" for="envoyer">
		<button type="submit">Envoyer</button>
	</label>
</form>
