<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { initializeStores ,Toast} from '@skeletonlabs/skeleton';

	initializeStores();

	const { links = {} } = $page.data;
	const { titre = '' } = $page.data;
    const { active = ''} = $page.data;
</script>

<Toast position="t" padding="p-4" />

<AppShell regionPage="relative" slotPageHeader=" sticky top-0 z-10" slotSidebarLeft="dark:bg-surface-700 bg-surface-50 w-56 p-4 m-4 rounded-3xl">
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a data-sveltekit-reload class="{active == "home" ? "underline" : ""} underline-offset-4 decoration-secondary-500" href="/admin/home">Home</a></li>
				<li><a data-sveltekit-reload class="{active == "actualite" ? "underline" : ""} underline-offset-4 decoration-secondary-500" href="/admin/actualites">Actualite</a></li>

			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<div class="h-full w-full flex flex-col p-4 pl-0">
		<AppBar class="dark:bg-surface-700 bg-surface-50 p-4 rounded-3xl w-full sticky top-4 z-10">
			<svelte:fragment slot="lead">
				{#if links.back}
					<a data-sveltekit-reload href="{links.back}" class="btn variant-ghost-secondary p-1 pl-4 pr-4 rounded-m">
						<Icon
							class="text-secondary-500 "
							icon="solar:alt-arrow-left-bold-duotone"
							width="32"
							height="32"
						/>
					</a>
				{/if}
			</svelte:fragment>
			<slot name="buttons" />

			<svelte:fragment slot="trail">
				<div class="rounded-3xl border-2 border-secondary-500 w-fit">
					<LightSwitch />
				</div>

				<form
					method="POST"
					action="/admin/logout"
					use:enhance={async ({ formElement, formData, action, cancel, submitter }) => {
						return async ({ result, update }) => {
							window.location.href = '/admin/login';
						};
					}}
				>
					<button
						type="submit"
						value="logout"
						title="Deconnexion"
						class="btn variant-ghost-secondary bg-tertiary-100 ring-tertiary-400 p-1 pl-4 pr-4 rounded-m"
					>
						<Icon class="text-tertiary-400 dark:text-white" icon="solar:login-broken" width="32" height="32" />
					</button>
				</form>
			</svelte:fragment>
		</AppBar>

        <div class="h-full mt-4">
            <slot />
        </div>

    
     
     

		
	</div>
</AppShell>
