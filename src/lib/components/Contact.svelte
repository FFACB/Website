<script lang="ts">

	//@ts-nocheck
	import { enhance, applyAction } from '$app/forms';
	import { PUBLIC_RECAPCHA_SITEKEY } from '$env/static/public';
	import { IsEmptyString } from '$lib/client/utils/type';


</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPCHA_SITEKEY}"></script>
</svelte:head>

<form
	method="POST"
	action="/api/contact"
	name="contact"
	id="contact"
	use:enhance={async ({  formData,  cancel }) => {
		try {
			const { nom,prenom, email,telephone,message} = Object.fromEntries(formData);
			
			if (IsEmptyString(nom) || IsEmptyString(prenom) || IsEmptyString(email) || IsEmptyString(telephone) || IsEmptyString(message)) {
				cancel();
				return;
			}

			await new Promise ((resolve, reject)  => {

				window.grecaptcha.ready(async () => {
					resolve();
				});
			}) ;

			const token = await window.grecaptcha.execute(PUBLIC_RECAPCHA_SITEKEY, { action: 'contact' });
			if (IsEmptyString(token)) {
				cancel();
				return;
			}

			formData.append('token', token);
			
		} catch (error) {
			cancel();
			return;
		}

		return async ({ result, update }) => {
			
			switch (result.type) {
				case 'success':
					await update(result.data);
					console.log(result.message);
					break;
				case 'error':
					console.log(result.errorMsg);
					break;
				default:
					break;
			}
			await applyAction(result);
		};
	}}
>

	

	<label class="label" for="nom">
		<span class="ml-3 font-semibold">Nom</span>
		<input class="input" name="nom" contenteditable="true" type="text" required />
	</label>

	<label class="label" for="prenom">
		<span class="ml-3 font-semibold">Prenom</span>
		<input class="input" name="prenom" contenteditable="true" type="text" required />
	</label>

	<label class="label" for="email">
		<span class="ml-3 font-semibold">E-mail</span>
		<input class="input" name="email" contenteditable="true" type="email" required />
	</label>

	<label class="label" for="telephone">
		<span class="ml-3 font-semibold">Téléphone</span>
		<input class="input" name="telephone" type="tel" required />
	</label>

	<label class="label" for="message">
		<span class="ml-3 font-semibold">Message</span>
		<input class="input" name="message"  type="text" required />
	</label>


	<label class="label" for="envoyer">
		<button type="submit">Envoyer</button>
	</label>
</form>
