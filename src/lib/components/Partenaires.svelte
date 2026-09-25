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
	// on répète les partenaires jusqu'à en avoir assez pour remplir deux fois la vue la plus large,
	// avec de la marge pour les clics rapides sur les flèches. La liste est répétée en entier pour que
	// l'ordre des partenaires reste le même d'un tour à l'autre.
	const MIN_SLIDES = 24;
	const slides = $derived(
		partenaires.length === 0
			? []
			: Array.from(
					{ length: Math.ceil(MIN_SLIDES / partenaires.length) * partenaires.length },
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
	// Navigation par les flèches : glissement court, puis reprise du défilement après inactivité.
	const VITESSE_NAVIGATION_MS = 300;
	const DELAI_REPRISE_MS = 2000;

	// `loopFix` existe à l'exécution mais n'apparaît pas dans les typages de Swiper.
	type SwiperBoucle = swiper & {
		loopFix(options: {
			direction: 'next' | 'prev';
			activeSlideIndex: number;
			byMousewheel: boolean;
		}): void;
	};

	let swiperElement: HTMLDivElement | null = $state(null);
	let navigationManuelle = $state(false);
	let swiperRef: swiper | null = null;
	let controle: ReturnType<typeof setInterval> | null = null;
	let reprise: ReturnType<typeof setTimeout> | null = null;
	let defilementAuto = false;
	// Logo visé par le dernier clic de flèche : les clics rapides s'enchaînent à partir de lui.
	let cibleCourante: HTMLElement | null = null;
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
		defilementAuto = !mouvementReduit;

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

		if (reprise != null) {
			clearTimeout(reprise);
			reprise = null;
		}
		cibleCourante = null;
		navigationManuelle = false;

		document.removeEventListener('visibilitychange', surVisibilite);
		window.removeEventListener('focus', surRetour);
		window.removeEventListener('pageshow', surRetour);

		swiperRef?.destroy(true, true);
		swiperRef = null;
	}

	function relancerDefilement() {
		// Pendant une navigation aux flèches, seule la fin du délai de reprise relance le bandeau.
		if (swiperRef == null || swiperRef.destroyed || navigationManuelle) return;

		// Swiper peut se déclarer en lecture (`running` vrai, `paused` faux) alors que la boucle est
		// morte, `animating` étant resté bloqué à true. Ni `start()` ni `resume()` ne repartent dans
		// cet état : on remet le drapeau à plat et on redémarre l'autoplay sans condition.
		swiperRef.animating = false;
		swiperRef.autoplay.stop();
		swiperRef.autoplay.start();
	}

	// Chaque clic agit immédiatement, même en plein glissement : on fige le bandeau là où il est à
	// l'écran, on réordonne les slides si besoin, puis on repart vers le logo visé depuis cette position.
	// `slideNext`/`slidePrev` sont évités : en boucle, leur `loopFix` recale le bandeau d'un coup sur
	// une frontière de logo, ce qui le fait sauter quand il est entre deux logos.
	function naviguer(sens: 'precedent' | 'suivant') {
		if (swiperRef == null || swiperRef.destroyed || swiperRef.wrapperEl == null) return;

		const bandeau = swiperRef as SwiperBoucle;
		const pas = sens === 'suivant' ? 1 : -1;

		if (defilementAuto) {
			if (!navigationManuelle) {
				navigationManuelle = true;
				bandeau.autoplay.stop();
			}

			if (reprise != null) clearTimeout(reprise);
			reprise = setTimeout(() => {
				reprise = null;
				cibleCourante = null;
				navigationManuelle = false;
				relancerDefilement();
			}, DELAI_REPRISE_MS);
		}

		const position = new DOMMatrix(getComputedStyle(bandeau.wrapperEl).transform).m41;
		bandeau.translateTo(position, 0, false, false);
		bandeau.animating = false;

		// Position affichée en nombre de logos depuis le début du wrapper (fractionnaire en glissement).
		const pasGrille = bandeau.slidesGrid[1] - bandeau.slidesGrid[0];
		const affiche = (-position - bandeau.slidesGrid[0]) / pasGrille;

		// Les clics rapides s'additionnent depuis la cible précédente ; sinon on vise le logo voisin de
		// la position affichée. L'avance sur l'affichage est bornée pour que le réordonnancement ne
		// retire jamais une slide encore à l'écran : il en faut assez pour couvrir l'écart plus la vue.
		const avanceMax = Math.max(
			1,
			bandeau.slides.length - Math.ceil(Number(bandeau.params.slidesPerView)) - 2
		);
		const indexPrecedent = cibleCourante != null ? bandeau.slides.indexOf(cibleCourante) : -1;
		let indexCible = (indexPrecedent >= 0 ? indexPrecedent : Math.round(affiche)) + pas;
		indexCible =
			pas > 0
				? Math.min(indexCible, Math.floor(affiche) + avanceMax)
				: Math.max(indexCible, Math.ceil(affiche) - avanceMax);
		indexCible = Math.max(0, Math.min(bandeau.slides.length - 1, indexCible));

		const cible = bandeau.slides[indexCible];

		// Mode « molette » : Swiper compense le réordonnancement par un simple décalage du wrapper,
		// sans le recaler sur une frontière de logo. Rien ne bouge à l'écran.
		bandeau.loopFix({
			direction: pas > 0 ? 'next' : 'prev',
			activeSlideIndex: indexCible,
			byMousewheel: true
		});

		// Force le navigateur à appliquer la position figée et le réordonnancement avant de lancer le
		// glissement : sans cela, la nouvelle transition partirait de l'ancienne position animée
		// (saut d'un logo), voire serait ignorée si la cible ne change pas.
		void bandeau.wrapperEl.offsetWidth;

		bandeau.slideTo(bandeau.slides.indexOf(cible), VITESSE_NAVIGATION_MS);
		cibleCourante = cible;
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

		// Bandeau immobile volontairement : l'utilisateur parcourt les partenaires aux flèches.
		if (navigationManuelle) return;

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

		<div class="flex items-center gap-2 sm:gap-4">
			<button
				type="button"
				class="fleche-partenaires"
				aria-label="Partenaire précédent"
				onclick={() => naviguer('precedent')}
			>
				<svg
					viewBox="0 0 24 24"
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>

			<div
				class="swiper swiper-partenaires flex-1 min-w-0"
				class:navigation-manuelle={navigationManuelle}
				bind:this={swiperElement}
			>
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

			<button
				type="button"
				class="fleche-partenaires"
				aria-label="Partenaire suivant"
				onclick={() => naviguer('suivant')}
			>
				<svg
					viewBox="0 0 24 24"
					class="w-5 h-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>
		</div>
	</section>
{/if}

<style>
	/* Défilement continu et régulier des logos */
	.swiper-partenaires :global(.swiper-wrapper) {
		transition-timing-function: linear;
	}

	/* Navigation aux flèches : glissement amorti plutôt que linéaire */
	.swiper-partenaires.navigation-manuelle :global(.swiper-wrapper) {
		transition-timing-function: ease-out;
	}

	.fleche-partenaires {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background-color: #ffffff;
		color: #007bc3;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.fleche-partenaires:hover,
	.fleche-partenaires:focus-visible {
		background-color: #007bc3;
		color: #ffffff;
	}
</style>
