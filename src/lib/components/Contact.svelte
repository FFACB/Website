<script lang="ts">
	// @ts-nocheck

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
	use:enhance={async ({ formElement, formData, action, cancel }) => {
		try {
			const { nom } = Object.fromEntries(formData);

			if (IsEmptyString(nom)) {
				cancel();
				return;
			}

			await new Response((resolve, reject) => {
				window.grecaptcha.ready(async () => {
					resolve();
				});
			});

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
					await update(result);
					console.log('Formulaire soumis avec succès!');
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
		<input class="input" name="nom" contenteditable="true" type="text" />
	</label>

	<label class="label" for="envoyer">
		<button type="submit">Envoyer</button>
	</label>
</form>
