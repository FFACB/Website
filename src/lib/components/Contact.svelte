<script>
	import { enhance } from '$app/forms';
	let formData = {
		nom: ''
	};

	async function handleSubmit() {

        grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LcpGiMpAAAAAFrpzza3QtzJ0gDWHnaU5p4zSkLh', {action: 'LOGIN'});
        });
        
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			if (response.ok) {
				console.log('Formulaire soumis avec succès!');
				// Effectuez d'autres actions en cas de succès
			} else {
				console.error('Erreur lors de la soumission du formulaire.');
				// Gérez les erreurs ici
			}
		} catch (error) {
			console.error("Une erreur s'est produite:", error);
			// Gérez les erreurs ici
		}
	}
</script>

<svelte:head>
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcpGiMpAAAAAFrpzza3QtzJ0gDWHnaU5p4zSkLh"></script>

</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
	<label class="label" for="nom">
		<span class="ml-3 font-semibold">Nom</span>
		<input class="input" value={formData.nom} name="nom" contenteditable="true" type="text" />
	</label>

    <label class="label" for="envoyer">
		<button type="submit" >Envoyer</button>
	</label>
</form>
