<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import ButtonQuit from '$lib/components/admin/buttons/quit/ButtonQuit.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import { hidePictures } from '$lib/client/uploads/pictures';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';


	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: '' };

	let pictures: HTMLDivElement | null = null;

	export function toggle(value: boolean) {
		if (!pictures) return;

		if (value) pictures.style.display = 'flex';
		else pictures.style.display = 'none';
	}

	const submitCreate = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		return async ({ result }: { result: ActionResult; update: (data?: any) => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toast.message = 'Enregistrement effectué !';
					toast.background = 'variant-filled-success';
					toastStore.trigger(toast);
					if (typeof result.data !== 'undefined') {
					}

					break;
				case 'failure':
					toast.message = result.data?.errorMsg;
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;
				case 'error':
					toast.message = "Erreur serveur lors de l'enregistrement";
					toast.background = 'variant-filled-error';
					toastStore.trigger(toast);

					break;
				default:
					break;
			}

			await applyAction(result);
		};
	};
</script>

<div
	bind:this={pictures}
	class="hidden justify-center items-center absolute left-0 top-0 w-full h-full z-40 p-4 backdrop-blur-sm"
	{...$$restProps}
>
	<div
		class="w-full h-full z-10 dark:bg-surface-800 bg-surface-50 rounded-container-token p-4 relative"
	>
		<h1 class="h1 font-bold text-2xl text-center">Galerie Photos</h1>

		<ButtonQuit
			class="absolute top-4 right-4"
			click={() => {
				hidePictures();
			}}
		/>

		<form
			method="POST"
			action="/admin/pictures?/create"
			id="create"
			class="actualite-form"
			enctype="multipart/form-data"
			use:enhance={submitCreate}
		>
			<label class="label mb-4" for="file">
				<span class="ml-3 font-semibold">Image</span>
				<input
					multiple
					class="input"
					type="file"
					id="file"
					name="picturesFiles"
					accept="image/*"
				/>
			</label>

			<ButtonSave titre="Enregistrer" type="submit" value="Creer" form="create" />
		</form>
	</div>
</div>
