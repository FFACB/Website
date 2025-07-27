<script lang="ts">
	import './app.pcss';

	let { data, children } = $props();
	const { parametres } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;
</script>

<svelte:head>
	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>

{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
	{@html PUBLIC_BODY_TAG_MANAGER.value}
{/if}

<div>
	<div>
		<img src="/images/FFACB_logo_horizontal_couleur.svg" alt="FFACB logo" class="logo" />
	</div>
	<div>
		<div class="intro-darkblue">
			<a class="uppercase" href="/federation">la fédération</a>
		</div>
		<div class="intro-darkblue">
			<a class="uppercase" href="/particuliers">particuliers</a>
		</div>
		<div class="intro-darkblue">
			<a class="uppercase" href="/professionnels">professionnels</a>
		</div>
	</div>
	<div>
		<div><a class="uppercase" href="/cooperatives">Ma coopérative</a></div>
		<div><a class="uppercase" href="/espace">Votre espace</a></div>
	</div>
</div>

{@render children?.()}
