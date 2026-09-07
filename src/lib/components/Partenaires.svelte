<script lang="ts">
	import { browser } from '$app/environment';
	import { Autoplay } from 'swiper/modules';
	import swiper from 'swiper';
	import 'swiper/css';

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

	// Le défilement continu repose sur une chaîne d'évènements Swiper (transitionend -> resume) qui
	// peut se rompre : un `visibilitychange` ou un glissement tactile fait sortir `onTransitionEnd`
	// sans relancer la boucle, et le bandeau reste figé. On surveille donc son mouvement réel pour
	// le redémarrer, plutôt que de se fier aux états internes de la librairie.
	const IMMOBILE_MS = 1500;
	const PERIODE_CONTROLE_MS = 500;
	// Le clic ouvre un onglet : on laisse au navigateur le temps de basculer avant de relancer.
	const DELAI_APRES_CLIC_MS = 300;

	let swiperElement: HTMLDivElement | null = $state(null);
	let swiperRef: swiper | null = null;
	let controle: ReturnType<typeof setInterval> | null = null;
	let derniereMatrice = '';
	let dernierMouvement = 0;

	$effect(() => {
		// La dépendance à `slides` réinitialise le bandeau si les partenaires changent après le
		// montage (navigation client vers l'accueil), cas où l'ancienne instance restait figée.
		const nombreDeSlides = slides.length;

		if (!browser || nombreDeSlides === 0) return;

		chargerSwiper();

		return () => detruireSwiper();
	});

	function chargerSwiper() {
		if (swiperElement == null || slides.length === 0) return;

		const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		swiper.use([Autoplay]);
		swiperRef = new swiper(swiperElement, {
			slidesPerView: 2,
			spaceBetween: 24,
			loop: true,
			speed: mouvementReduit ? 600 : 4000,
			// Bandeau purement décoratif, non manipulable : un clic sur un logo était sinon traité
			// comme un début de glissement, ce qui figeait `animating` à true et rompait la boucle
			// de défilement sans que Swiper ne se déclare arrêté pour autant.
			allowTouchMove: false,
			autoplay: mouvementReduit
				? false
				: {
						delay: 0,
						disableOnInteraction: false,
						// Le bandeau ne s'arrête jamais, pas même au survol : après un clic sur un logo,
						// le curseur reste posé sur celui-ci au retour sur l'onglet, et la pause au survol
						// donnait alors un bandeau qui semblait bloqué tant que la souris ne bougeait pas.
						pauseOnMouseEnter: false,
						waitForTransition: true
					},
			breakpoints: {
				480: { slidesPerView: 3, spaceBetween: 24 },
				768: { slidesPerView: 4, spaceBetween: 32 },
				1024: { slidesPerView: 5, spaceBetween: 40 },
				1280: { slidesPerView: 6, spaceBetween: 48 }
			}
		});

		// Sans autoplay il n'y a rien à surveiller ni à relancer.
		if (mouvementReduit) return;

		document.addEventListener('visibilitychange', surVisibilite);
		window.addEventListener('focus', surRetour);
		window.addEventListener('pageshow', surRetour);

		derniereMatrice = '';
		dernierMouvement = Date.now();
		controle = setInterval(controlerDefilement, PERIODE_CONTROLE_MS);
	}

	function detruireSwiper() {
		if (controle != null) {
			clearInterval(controle);
			controle = null;
		}

		document.removeEventListener('visibilitychange', surVisibilite);
		window.removeEventListener('focus', surRetour);
		window.removeEventListener('pageshow', surRetour);

		swiperRef?.destroy(true, true);
		swiperRef = null;
	}

	function relancerDefilement() {
		if (swiperRef == null || swiperRef.destroyed) return;

		// Swiper peut se déclarer en lecture (`running` vrai, `paused` faux) alors que la boucle est
		// morte, `animating` étant resté bloqué à true. Ni `start()` ni `resume()` ne repartent dans
		// cet état : on remet le drapeau à plat et on redémarre l'autoplay sans condition.
		swiperRef.animating = false;
		swiperRef.autoplay.stop();
		swiperRef.autoplay.start();
	}

	function surVisibilite() {
		if (document.visibilityState !== 'visible') return;

		// Swiper traite son propre `visibilitychange` : on repasse après lui.
		requestAnimationFrame(() => relancerDefilement());
	}

	function surRetour() {
		requestAnimationFrame(() => relancerDefilement());
	}

	function surClicPartenaire() {
		// Filet pour le cas où l'onglet courant ne perd ni le focus ni la visibilité.
		setTimeout(() => relancerDefilement(), DELAI_APRES_CLIC_MS);
	}

	function controlerDefilement() {
		if (swiperRef == null || swiperRef.destroyed || swiperRef.wrapperEl == null) return;

		// Aucune exception, onglet masqué compris : dès que le bandeau cesse de bouger, on le relance.
		// `swiperRef.translate` ne change qu'à la fin de chaque transition, soit toutes les 4 s :
		// la matrice calculée du wrapper, elle, suit la valeur animée image par image.
		const matrice = getComputedStyle(swiperRef.wrapperEl).transform;

		if (matrice !== derniereMatrice) {
			derniereMatrice = matrice;
			dernierMouvement = Date.now();
			return;
		}

		if (Date.now() - dernierMouvement > IMMOBILE_MS) {
			relancerDefilement();
			dernierMouvement = Date.now();
		}
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
								onclick={surClicPartenaire}
								title={partenaire.description != null && partenaire.description.length > 0
									? partenaire.description
									: partenaire.name}
							>
								<img
									class="h-16 sm:h-20 w-auto max-w-full mx-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
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
									class="h-16 sm:h-20 w-auto max-w-full mx-auto object-contain opacity-90"
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
