<script lang="ts">
	import { browser } from '$app/environment';
	import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { onMount } from 'svelte';
	import swiper from 'swiper';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import TriplesActualites from '$lib/components/TriplesActualites.svelte';

	export let data;
	const { actualites } = data;

	onMount(() => {
		loadSwiper();
	});

	function loadSwiper() {
		if (browser) {
			swiper.use([Autoplay, EffectFade, Pagination]);
			let swiperRef = new swiper('.swiper', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: true,
				speed: 600,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
					pauseOnMouseEnter: false,
					stopOnLastSlide: false,
					waitForTransition: true
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				}
			});

			swiperRef.init();
		}
	}
</script>

	<div
		class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
	>
		<div class="swiper w-full h-full !absolute">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<img
						class="w-full h-full object-cover bg-cover"
						src="/images/aa13a171-ec01-489e-bd5d-36032fb5352b.jpg?width=1920&height=1080"
						alt="federation"
					/>
				</div>
				<div class="swiper-slide">
					<img
						class="w-full h-full object-cover bg-cover"
						src="/images/a43316f9-262f-4e9a-a04b-05f565335047.jpg?width=1920&height=1080"
						alt="federation"
					/>
				</div>
				<div class="swiper-slide">
					<img
						class="w-full h-full object-cover bg-cover"
						src="/images/ext2OK.jpg?width=1920&height=1080"
						alt="federation"
					/>
				</div>
				<div class="swiper-slide">
					<img
						class="w-full h-full object-cover bg-cover"
						src="/images/DSC03-6-scaled.jpg?width=1920&height=1080"
						alt="federation"
					/>
				</div>
				<div class="swiper-slide">
					<img
						class="w-full h-full object-cover bg-cover"
						src="/images/-18564146_IMG_20230406_150627_6647277_resized.jpg?width=1920&height=1080"
						alt="federation"
					/>
				</div>
			</div>
		</div>
		<div class="swiper-pagination-home swiper-pagination"></div>

		<div
			class="relative sm:ml-32 ml-0 flex h-[95%] flex-col sm:w-2/5 w-full justify-end items-center overflow-hidden"
		>
			<img
				class="absolute w-full top-0 z-10 sm:block hidden"
				alt="background"
				src="/images/pictos/FFACB_formebleu.svg"
			/>
			<div class="z-10 p-16 flex flex-col justify-center">
				<h1 class="w-full h1-white font-extrabold mb-8">
					La Fédération Française des Artisans Coopérateurs du Bâtiment
				</h1>
			</div>
		</div>
	</div>

	<div class="bg-white text-center pl-16 pr-16 pt-8 pb-8 flex flex-col justify-center items-center">
		<p class="text-lg w-2/3 mt-16 mb-16">
			La Fédération Française des Artisans Coopérateurs du Bâtiment est une <strong
				>Organisation Professionnelle Nationale créée en 1988</strong
			> qui rassemble les groupements et coopératives d'artisans du bâtiment qui ont pour activité principale
			de construire des maisons individuelles mais qui peuvent également rénover, réhabiliter ou agrandir
			tous types de maisons ou de bâtiments.
		</p>
	</div>
	<div class="flex h-1/4">
		<div class="w-1/4">
			<img
				class="w-full h-full object-cover bg-cover"
				src="/images/photo-home-01.jpg"
				alt="illustration réalisation"
			/>
		</div>
		<div class="w-1/4">
			<img
				class="w-full h-full object-cover bg-cover"
				src="/images/photo-home-02.jpg"
				alt="illustration réalisation"
			/>
		</div>
		<div class="w-1/4">
			<img
				class="w-full h-full object-cover bg-cover"
				src="/images/photo-home-03.jpg"
				alt="illustration réalisation"
			/>
		</div>
		<div class="w-1/4">
			<img
				class="w-full h-full object-cover bg-cover"
				src="/images/photo-home-04.jpg"
				alt="illustration réalisation"
			/>
		</div>
	</div>
	<div class="flex w-full sm:flex-row flex-col">
		<div
			class="text-white sm:w-1/2 w-full sm:p-32 p-8 bg-dark flex justify-center items-center flex-col"
		>
			<a href="/professionnels">
				<h3 class="h2-blue pr-16 pl-16 mb-2 text-white font-bold text-center">
					Vous êtes un professionnel du bâtiment ?
				</h3>
				<p class=" w-full text-center">
					En créant votre coopérative et en rejoignant notre réseau, vous mettez toutes les chances
					de votre côté pour renforcer votre activité, remporter des marchés et assurer une
					meilleure défense de vos intérêts.
				</p></a
			>
		</div>

		<div
			class="text-white sm:w-1/2 w-full sm:p-32 p-8 bg-blue flex justify-center items-center flex-col"
		>
			<a href="/particuliers">
				<h3 class="h2-blue pr-16 pl-16 mb-2 text-white font-bold text-center">
					Vous êtes un particulier ?
				</h3>
				<p class="  w-full text-center">
					Vous avez un projet de construction, de rénovation ou d'agrandissement, faites confiance à
					notre réseau de coopératives, vous aurez affaire à des artisans et professionnels du
					bâtiment de proximité, aguerris et investis au service de votre projet.
				</p></a
			>
		</div>
	</div>
	<div class="bg-red flex justify-center items-center pt-9 flex-col sm:flex-row pb-9 sm:p-32 p-8">
		<div class="h-auto">
			<img class="h-48" src="/images/carte-pin.jpg" alt="persona" />
		</div>
		<div class="w-3/5 ml-7">
			<h3 class="h2-blue text-white font-bold">Trouver votre coopérative ?</h3>
			<div class="text-white text-lg mt-4 mb-4">
				Grâce à notre réseau de partenaires répartis sur tout le territoire français, trouvez les
				artisans coopérateurs les plus proches de chez vous.
			</div>
			<div class="flex -ml-2">
				<SimpleButton
					title="Ma coopérative"
					link="/cooperatives"
					backgroundColor="bg-dark"
					borderColor="border-dark"
				></SimpleButton>
			</div>
		</div>
	</div>
	<TriplesActualites {actualites}></TriplesActualites>