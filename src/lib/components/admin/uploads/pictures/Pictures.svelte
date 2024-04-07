<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import ButtonQuit from '$lib/components/admin/buttons/quit/ButtonQuit.svelte';
	import ButtonSave from '$lib/components/admin/buttons/save/ButtonSave.svelte';
	import ButtonSelect from '$lib/components/admin/buttons/select/ButtonSelect.svelte';
	import ButtonRefresh from '$lib/components/admin/buttons/refresh/ButtonRefresh.svelte';
	import { hidePictures, triggerPictureAction } from '$lib/client/uploads/pictures';
	import { showSpinner, hideSpinner } from '$lib/client/spinner';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import ButtonDelete from '../../buttons/delete/ButtonDelete.svelte';
	import { actions, type PicturePickerAction } from '$lib/client/uploads/pictures/actions';
	import { ENREGISTREMENT_ERROR, ENREGISTREMENT_FAILED, ENREGISTREMENT_SUCCES, ERROR, FAILED, SUPRESSION_ERROR, SUPRESSION_FAILED, SUPRESSION_SUCCES } from '$lib/client/toasts/toasts';

	const toastStore = getToastStore();

	let refreshButton: HTMLButtonElement | null = null;
	let picturesContainer: HTMLDivElement | null = null;
	let pictures: Picture[] = [];
	let pickturePickerId = ""

	export function toggle(value: PicturePickerAction) {
		pickturePickerId = value.picturePickerId
		if (value.open) onOpen();
		else onClose();
	}

	function onOpen() {
		if (!picturesContainer) return;
		picturesContainer.style.display = 'flex';

		if (pictures.length === 0) {
			refreshButton?.click();
		}
	}

	function onClose() {
		if (!picturesContainer) return;
		picturesContainer.style.display = 'none';
	}

	const submitFindall = async () => {
		showSpinner();
		return async ({ result }: { result: ActionResult; update: (data?: any) => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					if (typeof result.data !== 'undefined') {
						pictures = result.data.data;
					}
					break;
				case 'failure':
					toastStore.trigger(FAILED.addMessage(result.data?.errorMsg).toToast());

					break;
				case 'error':
					toastStore.trigger(ERROR.addMessage("Erreur lors de la récuperation des images").toToast());

					break;
				default:
					break;
			}

			await applyAction(result);
			hideSpinner();
		};
	};

	const submitCreate = async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
		showSpinner();
		return async ({ result }: { result: ActionResult; update: (data?: any) => Promise<void> }) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(ENREGISTREMENT_SUCCES.toToast());

					if (typeof result.data !== 'undefined') {
						pictures = [...result.data.data, ...pictures];
					}

					break;
				case 'failure':
					toastStore.trigger(ENREGISTREMENT_FAILED.addMessage(result.data?.errorMsg).toToast());

					break;
				case 'error':
					toastStore.trigger(ENREGISTREMENT_ERROR.toToast());
					break;
				default:
					break;
			}

			await applyAction(result);
			hideSpinner();
		};
	};

	const submitDelete = async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
		showSpinner();

		const { id } = Object.fromEntries(formData);
		let pictureToDelete = pictures.filter((picture) => picture.id === (id as string));
		if (pictureToDelete.length > 0)
			triggerPictureAction(actions.DELETE_PICTURE, pictureToDelete[0],  pickturePickerId);

		return async ({
			result,
			update
		}: {
			result: ActionResult;
			update: (data?: any) => Promise<void>;
		}) => {
			switch (result.type) {
				case 'success':
					toastStore.trigger(SUPRESSION_SUCCES.toToast());

					pictures = pictures.filter((picture) => picture.id !== result.data?.data);

					break;
				case 'failure':
					toastStore.trigger(SUPRESSION_FAILED.addMessage(result.data?.errorMsg).toToast());

					break;

				case 'error':
					toastStore.trigger(SUPRESSION_ERROR.toToast());

					break;
				default:
					break;
			}
			await update();

			hideSpinner();
		};
	};
</script>

<div
	bind:this={picturesContainer}
	class="hidden justify-center items-center absolute left-0 top-0 w-full h-full z-40 p-4 backdrop-blur-lg backdrop-brightness-75"
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

	<div class="w-full h-full z-10 rounded-container-token p-4 relative">
		<ButtonQuit
			class="absolute top-0 right-0"
			click={() => {
				hidePictures();
			}}
		/>

		<div class="flex flex-row flex-wrap p-4 h-full">
			<div class="w-full max-h-full p-4 h-full flex flex-col">
				<div class="w-full h-auto">
					<div class="rounded-container-token shadow-md p-4 mb-4 flex flex-row justify-between">
						<h2 class="h2">Sélectionner une image</h2>
						<ButtonRefresh class="" type="submit" value="Refresh" form="findall"></ButtonRefresh>
					</div>
				</div>

				<div
					class="h-full w-full rounded-container-token shadow-md overflow-hidden overflow-y-auto flex flex-col justify-start p-4"
				>
					<div class="flex flex-wrap justify-center">
						{#if pictures != null && pictures.length > 0}
							{#each pictures as picture, index}
								<div
									class="group rounded-lg lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full h-96 pr-4 pb-4 relative"
								>
									<ButtonDelete
										class="!hidden group-hover:!flex absolute top-4 right-4"
										type="submit"
										value="delete-{index}"
										form="delete-{index}"
									/>

									<div class="hidden">
										<form
											action="/admin/pictures?/delete"
											method="POST"
											id="delete-{index}"
											use:enhance={submitDelete}
										>
											<input type="hidden" name="id" value={picture.id} />
										</form>
									</div>

									<ButtonSelect
										click={() => {
											triggerPictureAction(actions.PICKED_PICTURE, picture, pickturePickerId);
											hidePictures();
										}}
										class="!hidden group-hover:!flex absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2"
									/>

									<img
										class="rounded-lg w-full h-full object-cover"
										loading="lazy"
										src="{picture.path}?width=300&height=300"
										alt=""
									/>
								</div>
							{/each}
						{/if}
					</div>
				</div>

				<div class="w-full">
					<div
						class="flex flex-col justify-center items-center w-full h-full rounded-container-token shadow-md p-4"
					>
						<div class="h-full flex justify-center items-end w-full">
							<form
								method="POST"
								action="/admin/pictures?/create"
								id="create"
								class="actualite-form w-full"
								enctype="multipart/form-data"
								use:enhance={submitCreate}
							>
								<label class="label mb-4" for="file">
									<span class="ml-3 font-semibold">Importer de nouvelles images</span>
									<input
										multiple
										class="input"
										type="file"
										id="file"
										name="picturesFiles"
										accept="image/*"
									/>
								</label>

								<ButtonSave titre="Importer" type="submit" value="Creer" form="create" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
