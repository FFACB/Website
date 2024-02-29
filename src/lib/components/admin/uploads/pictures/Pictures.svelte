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

	
		<div class="flex flex-row flex-wrap p-4 h-full">

			<div class="w-2/3  max-h-full p-4  h-full flex flex-col">


				<div class="w-full h-auto">
					<div class=" bg-surface-400 rounded-container-token p-4 mb-4">
						<h2 class="h2">Sélectionnez une image</h2>
					</div>
				</div>
		

				<div class="h-full w-full overflow-hidden overflow-y-auto flex  flex-col justify-start shadow-2xl rounded-container-token p-4 ">
					

					<div class="flex flex-wrap justify-center">
						{#if pictures != null && pictures.length > 0}
							{#each pictures as picture}
								<div class="rounded-lg basis-1/6 pr-4 pb-4">
									<img class="rounded-lg" loading="lazy" src={picture.path} alt="" />
								</div>
							{/each}
						{/if}
					</div>
				</div>
				
			</div>

			<div class="w-1/3 p-4">
				<div class="flex flex-col justify-center items-center w-full h-full">
					<h2 class="h2 pb-4">Importer des images</h2>

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
</div>
