<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import ButtonQuit from '$lib/components/admin/buttons/quit/ButtonQuit.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import { hidePictures } from '$lib/client/uploads/pictures';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	const toastStore = getToastStore();
	const toast: ToastSettings = { message: '', background: '' };

	let refreshButton: HTMLButtonElement | null = null;
	let picturesContainer: HTMLDivElement | null = null;

	let pictures: Picture[] | null = null;

	onMount(() => {
		refreshButton?.click();
	});

	export function toggle(value: boolean) {
		if (value) onOpen();
		else onClose();
	}

	function onOpen() {
		if (!picturesContainer) return;
		picturesContainer.style.display = 'flex';

		if (pictures == null) {
			refreshButton?.click();
		}
	}

	function onClose() {
		if (!picturesContainer) return;
		picturesContainer.style.display = 'none';
	}

	const submitFindall = async ({
		formData,
		cancel
	}: {
		formData: FormData;
		cancel: () => void;
	}) => {
		return async ({ result }: { result: ActionResult; update: (data?: any) => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					if (typeof result.data !== 'undefined') {
						pictures = result.data.data;
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

	const submitCreate = async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
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
	bind:this={picturesContainer}
	class="hidden justify-center items-center absolute left-0 top-0 w-full h-full z-40 p-4 backdrop-blur-sm"
	{...$$restProps}
>
	<form
		method="POST"
		action="/admin/pictures?/findall"
		id="findall"
		class="hidden"
		enctype="multipart/form-data"
		use:enhance={submitFindall}
	>
		<button bind:this={refreshButton} class="hidden" type="submit" form="findall" value="Refresh"
		></button>
	</form>

	<div
		class="w-full h-full overflow-hidden z-10 dark:bg-surface-800 bg-surface-50 rounded-container-token p-4 relative"
	>
		
		<ButtonQuit
			class="absolute top-4 right-4"
			click={() => {
				hidePictures();
			}}
		/>

		<div class="flex flex-row h-full flex-wrap p-4">

			<h1 class="h1 font-bold text-2xl text-center w-full">Galerie Photos</h1>


			<div class="w-4/5  max-h-full p-4 flex flex-col justify-start overflow-hidden overflow-y-auto">
				<h2 class="h2 font-bold text-xl">Liste des images</h2>

				<div class="flex flex-wrap justify-center">
					{#if pictures != null && pictures.length > 0}
						{#each pictures as picture}
							<div class="rounded-lg basis-1/6 ">
								<img class="rounded-lg" loading="lazy" src={picture.path} alt="" />
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="w-1/5 flex flex-col justify-center items-center">
				<h2 class="h2 font-bold text-xl">Importer des images</h2>

				<div class="h-full flex justify-center items-end">
					<form
					method="POST"
					action="/admin/pictures?/create"
					id="create"
					class="actualite-form p-4"
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
		</div>
	</div>
</div>
