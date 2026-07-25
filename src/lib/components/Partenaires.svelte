<script lang="ts">
	import { browser } from '$app/environment';
	import { Autoplay, FreeMode } from 'swiper/modules';
	import { onDestroy, onMount } from 'svelte';
	import swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/free-mode';

	type Partenaire = {
		id: string;
		name: string;
		description: string;
		siteInternet: string;
		logo: string | null;
	};

	interface Props {
		partenaires: Partenaire[];
		titre?: string;
	}

	let { partenaires = [], titre = 'Nos partenaires' }: Props = $props();

	// Swiper a besoin d'un nombre de slides suffisant pour boucler sans à-coups :
	// on répète les partenaires jusqu'à en avoir assez pour remplir deux fois la vue la plus large.
	const MIN_SLIDES = 12;
	const slides = $derived(
		partenaires.length === 0
			? []
			: Array.from(
					{ length: Math.max(MIN_SLIDES, partenaires.length) },
					(_, index) => partenaires[index % partenaires.length]
				)
	);

	let swiperElement: HTMLDivElement | null = $state(null);
	let swiperRef: swiper | null = null;

	onMount(() => {
		loadSwiper();
	});

	onDestroy(() => {
		swiperRef?.destroy(true, true);
		swiperRef = null;
	});

	function loadSwiper() {
		if (!browser || swiperElement == null || slides.length === 0) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		swiper.use([Autoplay, FreeMode]);
		swiperRef = new swiper(swiperElement, {
			slidesPerView: 2,
			spaceBetween: 24,
			loop: true,
			speed: reducedMotion ? 600 : 4000,
			allowTouchMove: true,
			freeMode: {
				enabled: true,
				momentum: false
			},
			autoplay: reducedMotion
				? false
				: {
						delay: 0,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
						waitForTransition: true
					},
			breakpoints: {
				480: { slidesPerView: 3, spaceBetween: 24 },
				768: { slidesPerView: 4, spaceBetween: 32 },
				1024: { slidesPerView: 5, spaceBetween: 40 },
				1280: { slidesPerView: 6, spaceBetween: 48 }
			}
		});
	}
</script>

{#if partenaires.length > 0}
	<section class="bg-white w-full pt-12 pb-12 sm:pl-32 sm:pr-32 pl-4 pr-4">
		<h3 class="h2-blue font-bold text-center p-4 mb-4">{titre}</h3>

		<div class="swiper swiper-partenaires w-full" bind:this={swiperElement}>
			<div class="swiper-wrapper items-center">
				{#each slides as partenaire, index (index)}
					<div class="swiper-slide h-auto flex justify-center items-center">
						{#if partenaire.siteInternet != null && partenaire.siteInternet.length > 0}
							<a
								class="flex flex-col justify-center items-center w-full group"
								href={partenaire.siteInternet}
								target="_blank"
								rel="noopener noreferrer"
								title={partenaire.description != null && partenaire.description.length > 0
									? partenaire.description
									: partenaire.name}
							>
								<img
									class="h-16 sm:h-20 w-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
									src={partenaire.logo}
									alt={partenaire.name}
									loading="lazy"
								/>
								<span class="text-dark text-xs text-center mt-3 line-clamp-2">
									{partenaire.name}
								</span>
							</a>
						{:else}
							<div
								class="flex flex-col justify-center items-center w-full"
								title={partenaire.description != null && partenaire.description.length > 0
									? partenaire.description
									: partenaire.name}
							>
								<img
									class="h-16 sm:h-20 w-full object-contain opacity-90"
									src={partenaire.logo}
									alt={partenaire.name}
									loading="lazy"
								/>
								<span class="text-dark text-xs text-center mt-3 line-clamp-2">
									{partenaire.name}
								</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	/* Défilement continu et régulier des logos */
	.swiper-partenaires :global(.swiper-wrapper) {
		transition-timing-function: linear;
	}
</style>
