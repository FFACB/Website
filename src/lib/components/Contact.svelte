<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { IsEmptyString } from '$lib/client/utils/type';
	import type { ParmetreReponse } from '$lib/client/utils/ambiant';

	interface Props {
		PUBLIC_RECAPCHA_SITEKEY: ParmetreReponse;
	}

	let { PUBLIC_RECAPCHA_SITEKEY }: Props = $props();
	let errorMsg: string = $state('');
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPCHA_SITEKEY.value}"
	></script>
</svelte:head>

<form
	method="POST"
	action="/api/contact"
	name="contact"
	id="contact"
	class="w-full pr-48 pl-48 z-20 block relative"
	use:enhance={async ({ formData, cancel }) => {
		try {
			const { nom, prenom, email, telephone, message, ville, cp, rue } =
				Object.fromEntries(formData);

			if (
				IsEmptyString(nom) ||
				IsEmptyString(prenom) ||
				IsEmptyString(email) ||
				IsEmptyString(telephone) ||
				IsEmptyString(message) ||
				IsEmptyString(ville) ||
				IsEmptyString(cp) ||
				IsEmptyString(rue)
			) {
				cancel();
				return;
			}

			await new Promise((resolve) => {
				window.grecaptcha.ready(async () => {
					resolve(true);
				});
			});

			const token = await window.grecaptcha.execute(PUBLIC_RECAPCHA_SITEKEY.value, {
				action: 'contact'
			});
			if (IsEmptyString(token)) {
				cancel();
				return;
			}

			formData.append('token', token);
		} catch (error) {
			console.error(error);
			errorMsg = "Une erreur est survenue lors de l'envoi du formulaire";
			cancel();
			return;
		}

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					await applyAction(result);
					// @ts-expect-error: Should expect message
					errorMsg = result?.message;
					break;
				case 'failure':
					// @ts-expect-error: Should expect error message
					if (typeof result.errorMsg === 'string')
						// @ts-expect-error: Should expect error message
						errorMsg = result.errorMsg;
					break;
				case 'error':
					errorMsg = 'Une erreur serveur est survenue';
					break;
				default:
					break;
			}
		};
	}}
>
	<div class="flex flex-col border border-blue rounded-3xl w-full">
		<div class="flex flex-row w-full">
			<div class="basis-1/2 p-8">
				<label class="label" for="nom">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Nom</span>
					<input class="input w-full" name="nom" contenteditable="true" type="text" required />
				</label>

				<label class="label" for="prenom">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Prenom</span>
					<input class="input w-full" name="prenom" contenteditable="true" type="text" required />
				</label>

				<label class="label" for="rue">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Rue</span>
					<input class="input w-full" name="rue" contenteditable="true" type="text" required />
				</label>

				<label class="label" for="cp">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Code Postal</span>
					<input class="input w-full" name="cp" contenteditable="true" type="text" required />
				</label>

				<label class="label" for="ville">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Ville</span>
					<input class="input w-full" name="ville" contenteditable="true" type="text" required />
				</label>

				<label class="label" for="email">
					<span class="ml-3 font-semibold w-full text-start uppercase block">E-mail</span>
					<input class="input w-full" name="email" contenteditable="true" type="email" required />
				</label>

				<label class="label" for="telephone">
					<span class="ml-3 font-semibold w-full text-start uppercase block">Téléphone</span>
					<input class="input w-full" name="telephone" type="tel" required />
				</label>
			</div>
			<div class="basis-1/2 flex flex-col p-8">
				<div class="h-4/5">
					<label class="label h-full" for="message">
						<span class="ml-3 font-semibold w-full text-start uppercase block">Message</span>
						<textarea class="input h-full rounded-3xl w-full" name="message"   required ></textarea>
					</label>
				</div>

				<div class="h-1/5 flex flex-col justify-end items-start">
					<div class="w-max  p-8 pt-2 pb-2 font-semibold text-white bg-blue rounded-full">
						<label class="label" for="envoyer">
							<button type="submit">Envoyer</button>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="error" aria-live="polite">
			{#if errorMsg && errorMsg.length > 0}
				<p>{errorMsg}</p>
			{/if}
		</div>
	</div>
</form>
