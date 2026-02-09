<script lang="ts">
	import gsap from 'gsap';
	import { SplitText } from 'gsap/all';
	import { ScrollTrigger } from 'gsap/all';
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import './app.pcss';

	let { data, children } = $props();
	const { parametres, actualites } = data;
	const { PUBLIC_HEAD_TAG_MANAGER, PUBLIC_BODY_TAG_MANAGER } = parametres;

	onMount(() => {
		animateText();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			animateText();
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;

				animateText();
			});
		});
	});

	function animateText() {
		gsap.registerPlugin(SplitText, ScrollTrigger);
		const splitText = new SplitText(document.querySelector('h1'));

		gsap.from(splitText.chars, {
			autoAlpha: 0,
			duration: 0.4,
			stagger: 0.02,
			y: 10
		});

		document.querySelectorAll('h2,h3').forEach((element) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: element,
					start: 'top 80%',
					end: 'bottom 80%',
					markers: false
				}
			});
			tl.from(element, {
				autoAlpha: 0,
				duration: 0.4,
				y: 10
			});
		});
	}
</script>

<svelte:head>
	{#if PUBLIC_HEAD_TAG_MANAGER && PUBLIC_HEAD_TAG_MANAGER.value != null && PUBLIC_HEAD_TAG_MANAGER.value.length > 0}
		{@html PUBLIC_HEAD_TAG_MANAGER.value}
	{/if}
</svelte:head>

{#if PUBLIC_BODY_TAG_MANAGER && PUBLIC_BODY_TAG_MANAGER.value != null && PUBLIC_BODY_TAG_MANAGER.value.length > 0}
	{@html PUBLIC_BODY_TAG_MANAGER.value}
{/if}

<Header />

{@render children?.()}

<Footer
	actualites={actualites}
/>
