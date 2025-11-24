<script lang="ts">
	import SimpleButton from '$lib/components/SimpleButton.svelte';
	import { onMount } from 'svelte';

	let servicesActiveIndex = 0;
	let servicesZIndex = 60;
	let htmlAccompagnement: HTMLInputElement;

	let htmlAssurances: HTMLInputElement;
	let htmlArcab: HTMLInputElement;
	let htmlFormations: HTMLInputElement;
	let htmlPartage: HTMLInputElement;

	function clickService(element: HTMLInputElement, id: number) {
		servicesZIndex++;

		element.style.zIndex = servicesZIndex.toString();

		htmlAccompagnement.style.backgroundColor = '#DCEFFC';
		htmlAccompagnement.style.borderBottomColor = 'rgb(13 28 48)';
		htmlAccompagnement.style.fontWeight = 'normal';
		htmlAssurances.style.backgroundColor = '#DCEFFC';
		htmlAssurances.style.borderBottomColor = 'rgb(13 28 48)';
		htmlAssurances.style.fontWeight = 'normal';
		htmlArcab.style.backgroundColor = '#DCEFFC';
		htmlArcab.style.borderBottomColor = 'rgb(13 28 48)';
		htmlArcab.style.fontWeight = 'normal';
		htmlFormations.style.backgroundColor = '#DCEFFC';
		htmlFormations.style.borderBottomColor = 'rgb(13 28 48)';
		htmlFormations.style.fontWeight = 'normal';
		htmlPartage.style.backgroundColor = '#DCEFFC';
		htmlPartage.style.borderBottomColor = 'rgb(13 28 48)';
		htmlPartage.style.fontWeight = 'normal';

		element.style.backgroundColor = '#ffffff'; //"#DCEFFC";
		element.style.borderBottomColor = '#ffffff';
		element.style.fontWeight = 'bold';

		document.querySelectorAll('.blocks').forEach((element) => {
			if (element instanceof HTMLElement) {
				if (element.id.toString() === 'block-' + id.toString()) {
					element.style.display = 'flex';
				} else {
					element.style.display = 'none';
				}
			}
		});
	}

	onMount(() => {

		clickService(htmlAccompagnement, 0);

	})
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/GRANDVOINET.CHAPELLE.DES.BUIS.jpg?width=1920&height=1080"
		alt="federation"
	/>
	<div class="relative sm:ml-32 ml-0 flex h-[95%] sm:w-2/5 w-full flex-col justify-end items-center overflow-hidden">
		<img
			class="absolute w-full top-0 sm:block hidden "
			alt="background"
			src="/images/pictos/FFACB_formebleu.svg"
		/>
		<div class="z-10 p-16 flex flex-col justify-center">
			<h1 class="w-full h1-white font-extrabold mb-8">
				Comment fonctionne une coopérative d'artisans ?
			</h1>
		</div>
	</div>
</div>

<div class="font-Funnel Sans w-full flex flex-row">
	<div class="bg-white w-1/2 p-16 pl-48 pr-16">
		L'article 1 er de la loi n° 83-657 du 20 juillet 1983 stipule que « les Sociétés Coopératives
		Artisanales ont pour objet la réalisation de toutes opérations et la prestation de tous services
		susceptibles de contribuer, directement ou indirectement, au développement des activités
		artisanales de leurs associés ainsi que l'exercice en commun de ces activités. »<br /><br />
		Les coopératives du bâtiment sont constituées sous forme de
		<strong>Société à Responsabilité Limitée</strong> (SARL) ou de <strong>Société Anonyme</strong>
		(SA). La coopérative doit être fondée sur un principe d'égalité des droits qui s'exprime sous la
		formule <strong class="inline-block">« un associé = une voix »</strong>.
	</div>
	<div class="bg-white w-1/2 p-16 pr-48">
		Le plus souvent les coopératives et groupements d'artisans sont composés d'une équipe
		opérationnelle réunissant les différents corps d'état, en moyenne une dizaine d'entreprises, qui
		traitent dix à trente chantiers par an, voire plus selon le volume d'activité. Par ailleurs, ces
		entreprises exercent une activité en propre, suivant leur métier, en dehors de la coopérative.<br
		/><br />
		Les chantiers des coopératives sont soumis en permanence aux autocontrôles et présentent le plus
		faible taux de sinistralité dans le secteur de la maison individuelle, ce qui représente un véritable
		argument pour sécuriser le client dans son projet.
	</div>
</div>

<div class="flex bg-white">
	<div class="flex flex-col w-1/2 pr-8 p-16 pl-48">
		<h2 class="h2-blue font-bold">Pourquoi se constituer en coopérative avec la FFACB ?</h2>
		<br />
		<p class="">
			Avant tout, parce <strong> l'union fait la force</strong>. Les artisans regroupés sous forme
			de groupements ou de coopératives l'ont compris. Ils unissent ainsi leurs forces et leurs
			compétences pour remporter de nouveaux marchés, construire des maisons individuelles ou
			rénover l'habitat existant.
		</p>
		<br />
		<h3 class="uppercase font-bold text-xl">
			Être membre de la FFACB permet aux coopératives adhérentes de :
		</h3>
		<ul class="font-semibold text-lg text-blue mt-4">
			<li class="mt-2">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Travailler en commun
				pour gagner des marchés.
			</li>
			<li class="mt-2">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Gagner du temps et de la
				productivité.
			</li>
			<li class="mt-2">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Mutualiser et offrir des
				services performants.
			</li>
			<li class="mt-2">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Rompre l'isolement.
			</li>
			<li class="mt-2">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Faire fonctionner la
				solidarité.
			</li>
		</ul>
		<br />
		<p class="">
			La coopérative artisanale est un outil de développement qui permet aux entreprises et artisans
			de multiplier leurs opportunités de marchés tout en conservant leur autonomie. Il suffit
			d'accepter un pouvoir central de coordination, dont les artisans membres de la coopérative
			restent les principaux acteurs.
		</p>
		<br />
		<p>
			Si la force des petites et moyennes entreprises repose sur leur savoir-faire, leur compétences
			spécifiques et leur adaptabilité, vous devez en tant qu'artisan, maîtriser des domaines aussi
			larges que le commercial, les ressources humaines ou encore la gestion administrative et
			l'informatique. Des responsabilités et une charge de travail pesantes au quotidien.
		</p>
		<br />
		<p>
			En choisissant d'exercer une partie de votre activité au sein d'une coopérative artisanale,
			vous profitez de la force de frappe et de l'appui de cette structure organisationnelle. Les
			entreprises coopératives d'une même famille adhèrent à une fédération qui les représente et
			leur apporte un ensemble de conseils et d'assistance, en vue d'assurer leur bon
			fonctionnement. C'est le rôle de la FFACB.
		</p>
	</div>
	<div class="flex flex-col w-1/2 mt-64">
		<div class="bg-dark h-full relative">
			<img
				src="/images/profesionnel-droit.png"
				alt="professionnel"
				class="w-auto h-full object-contain bg-contain absolute -translate-y-1/3 right-0 top-0 hidden md:block"
			/>

			<div class="flex flex-col w-full h-1/2 relative p-16">
				<div class="relative h-full">
					<div
						class=" border bg-white border-black rounded-full p-8 w-1/5  object-cover bg-cover absolute bottom-0 left-0"
					>
						<img src="/images/pictos/picto-interlocuteur.svg" class="" alt="picto quali" />
					</div>
				</div>
			</div>
			<div class="flex flex-col w-full h-1/2 relative pl-16 pr-48">
				<p class="text-white text-lg font-Funnel-Sans-Italic">
					« En travaillant en coopérative, nous avons l'immense avantage de connaitre parfaitement
					notre réseau d'artisans et de maîtriser notre sujet de A à Z. Nous ne sommes pas juste des
					assembleurs de compétences, nous mettons en œuvre nos connaissances et notre expertise de
					la construction. En étant des artisans constructeurs et pas des constructeurs faisant
					appel à des artisans, nous avons une logique inverse. Après le soutien de la FFACB pour
					nous structurer est essentiel. Passer en CCMI est une démarche chronophage et coûteuse.
					C'est un enrichissement de pouvoir compter sur l'expérience et le savoir des
					professionnels de la FFACB qui sont extrêmement pointus sur le sujet »,
				</p>
				<br />
				<p class="text-blue text-sm font-semibold">
					Anne Lang, gérante d'Avenir et Bois, constructeur de maisons passives en bois en Alsace,
					membre de la coopérative ARTCOPA.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="bg-[#DCEFFC] text-center p-32 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">
		Quels sont les avantages à se constituer en coopérative et à adhérer à la fédération ?
	</h2>
	<br /><br />
	<div class="flex flex-row">
		<div class="flex flex-col m-2 p-8 text-white bg-dark rounded-3xl basis-1/3">
			<h3 class="uppercase font-bold text-xl">Des principes fondateurs</h3>
			<br />
			<ul class="font-light">
				<li>Exonération de l'impôt sur les sociétés (IS) *</li>
				<li>
					Exonération de Contribution Économique Territoriale (CFE et CVAE), ancienne Taxe
					Professionnelle *
				</li>
				<li>Exonération de la Taxe d'Apprentissage *</li>
				<li>
					Exonération de la Contribution Sociale de Solidarité des Sociétés (C3S) * = sauf pour la
					quote-part de résultat issue de l'activité réalisée avec les sous-traitants.
				</li>
			</ul>
		</div>
		<div class="flex flex-col m-2 p-8 text-white bg-red rounded-3xl basis-1/3">
			<h3 class="uppercase font-bold text-xl">Les avantages juridiques</h3>
			<br />
			<ul class="font-light">
				<li>
					Aide à la rédaction et contrôle du Contrat de Construction de Maison Individuelle (CCMI).
				</li>
				<li>Accompagnement juridique, fiscal et comptable.</li>
				<li>Défense des intérêts des artisans coopérateurs.</li>
			</ul>
		</div>
		<div class="flex flex-col m-2 p-8 text-white bg-blue rounded-3xl basis-1/3">
			<h3 class="uppercase font-bold text-xl">Des atouts majeurs</h3>
			<br />
			<ul class="font-light">
				<li>Établissement des statuts et du règlement intérieur.</li>
				<li>Étude du budget prévisionnel.</li>
				<li>Tenue des assemblées générales.</li>

				<li>Indépendance vis-à-vis de la sous-traitance.</li>

				<li>Mise en place de nombreux outils de travail efficaces.</li>

				<li>Maintien et contrôle des marges.</li>

				<li>Formations adaptées.</li>

				<li>Rencontres et partages d'expérience.</li>
			</ul>
		</div>
	</div>
</div>

<div class="bg-dark flex justify-center items-center pt-9 pb-9">
	<div class="h-auto">
		<div class=" border bg-white border-black rounded-full p-8 w-32">
			<img src="/images/pictos/picto-interlocuteur.svg" class="" alt="picto quali" />
		</div>
	</div>
	<div class="w-3/5 ml-7">
		<div class="font-Funnel-Sans-Italic font-medium text-lg text-white">
			« Parmi les principaux avantages de l'affiliation à la FFACB il y a évidemment le fait de
			profiter du contrat de construction élaboré dans les règles de l'art. Mais au-delà de ça, les
			services de la FFACB nous permettent de profiter de conseils juridiques très pointus, d'être
			au courant des dernières réglementations et d'avoir toujours un interlocuteur pour répondre
			rapidement aux problématiques du quotidien »,
		</div>
		<br />
		<div class="text-blue text-sm">
			Benjamin Houseaux, Vision Bois, constructeur de maisons en ossature bois basé à Chambéry (73)
			et membre de la coopérative Tout Habitat.
		</div>
	</div>
</div>

<div class="bg-white text-center p-16 pr-32 pl-32 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Quels sont les services proposés par la FFACB ?</h2>
	<br /><br />

	<div class="relative mt-16">
		<div class="absolute bottom-full translate-y-[1px] w-[95%] flex left-1/2 -translate-x-1/2 ">
			<input
				type="button"
				on:click={() => {
					clickService(htmlAccompagnement, 0);
				}}
				bind:this={htmlAccompagnement}
				class="uppercase absolute bottom-0 left-0 w-1/5 z-50 p-4 bg-white text-dark text-center rounded-tl-3xl rounded-tr-3xl cursor-pointer border border-dark"
				value="ACCOMPAGNEMENT"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlAssurances, 1);
				}}
				bind:this={htmlAssurances}
				class="uppercase absolute bottom-0 left-[20%] w-1/5 z-40 p-4 bg-lightgrey text-dark text-center rounded-tl-3xl rounded-tr-3xl cursor-pointer border border-dark"
				value="ASSURANCES"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlArcab, 2);
				}}
				bind:this={htmlArcab}
				class="uppercase absolute bottom-0 left-[40%] w-1/5 z-30 p-4 bg-lightgrey text-dark text-center rounded-tl-3xl rounded-tr-3xl cursor-pointer border border-dark"
				value="ARCAB"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlFormations, 3);
				}}
				bind:this={htmlFormations}
				class="uppercase absolute bottom-0 left-[60%] w-1/5 z-20 p-4 bg-lightgrey text-dark text-center rounded-tl-3xl rounded-tr-3xl cursor-pointer border border-dark"
				value="FORMATIONS"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlPartage, 4);
				}}
				bind:this={htmlPartage}
				class="uppercase absolute bottom-0 left-[80%] w-1/5 z-10 p-4 bg-lightgrey text-dark text-center rounded-tl-3xl rounded-tr-3xl cursor-pointer border border-dark"
				value="PARTAGE"
			/>
		</div>

		<div id="block-0" class="blocks flex flex-row flex-wrap justify-center items-center">
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl">
					UN ACCOMPAGNEMENT JURIDIQUE, FISCAL ET COMPTABLE
				</h3>
				<div class="flex text-start">
					<div class="basis-1/2 p-16 font-bold">
						Le service juridique de la FFACB assure un rôle de conseil, d'accompagnement et de
						représentation pour les coopératives artisanales du bâtiment, afin de garantir leur
						conformité légale, leur bon fonctionnement et la protection de leurs intérêts.
						<br /><br />
						Présent pour le fonctionnement interne de la structure, le service juridique a surtout pour
						mission de se tenir à la disposition des adhérents afin de répondre à toutes les questions
						juridiques, que ce soit pour faciliter leur gestion au quotidien en développant des outils
						ou encore les conseiller et les orienter en cas de litige.

						<img src="/images/IMG_20240705_110605.jpg" class="mt-8 rounded-3xl" alt="" />
					</div>
					<div class="basis-1/2 p-16">
						<p class="font-semibold">Les missions principales du service juridique de la FFACB :</p>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong>L'accompagnement juridique, fiscal et comptable :</strong><br />
								le service assiste les coopératives dans l'établissement de leurs statuts, la rédaction
								de leur règlement intérieur, l'étude de leur budget prévisionnel et la tenue de leurs
								assemblées générales.
							</p>
						</div>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong
									>La rédaction du Contrat de Construction de Maison Individuelle (CCMI) :</strong
								><br />
								le service participe à la rédaction de la trame de ce contrat, garantissant ainsi la
								conformité aux normes légales et la protection des parties prenantes. Mis en place de
								longue date, il est régulièrement actualisé afin de tenir compte des évolutions législatives
								mais aussi des remarques des adhérents. Il s'agit d'en optimiser le fonctionnement. Le
								CCMI est un gage de qualité et un cadre sécurisant pour les coopératives adhérentes.
							</p>
						</div>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong>La mise en place d'autres types de contrats</strong><br />
								tels que le marché de travaux ou le contrat de sous-traitance, qui bénéficient aux TNA,
								c'est-à-dire aux sous-traitants de la coopérative.
							</p>
						</div>
						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong>La mise à disposition de nombreuses trames</strong><br />
								d'avenants, de courriers, de protocoles utiles aux adhérents dans leur gestion quotidienne
								ou dans leur relation avec le Maître de l'Ouvrage.
							</p>
						</div>
						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong>La veille juridique et la représentation :</strong><br />
								le service assure une veille juridique pour informer les coopératives des évolutions
								législatives et réglementaires. En cas de litige, le service accompagne le client lors
								de la phase pré-judiciaire et si une procédure doit être engagée, la FFACB propose une
								mise en relation avec les avocats référents de l'AAMOI* avec lesquels une convention
								a été signée.
							</p>
						</div>

						<p class="text-sm italic mt-8">
							* L'AAMOI est une association chargée de défendre les maîtres d'ouvrage (c'est-à-dire
							le clients) de constructeurs de maison individuelle.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div id="block-1" class="blocks flex-row flex-wrap justify-center items-center hidden">
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service de gestion des produits d'assurances
				</h3>
				<div class="flex text-start">
					<div class="basis-1/2 p-16 font-bold">
						La FFACB a un rôle d'intermédiaire entre les coopératives et les partenaires en
						assurances et garants. Elle sert ainsi de lien entre ces instances pour faciliter les
						relations et permettre plus facilement aux coopératives d'obtenir les assurances
						attendues.

						<img src="/images/4 apres.jpg" class="mt-8 rounded-3xl" alt="" />
					</div>
					<div class="basis-1/2 p-16">
						<p class="font-semibold">
							La FFACB a développé un partenariat solide avec des compagnies d'assurances pour
							l'obtention des assurances suivantes :
						</p>

						<ul>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Garantie de remboursement et de livraison à prix et délais convenus.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Garantie Dommages-Ouvrage.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Garantie Décennale.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Responsabilité civile et tous risques chantiers.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Garantie de Paiement des Sous-Traitants.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Garantie Financière d'Achèvement
							</li>
						</ul>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong
									>Lorsque le statut de coopérative est établi, la FFACB s'occupe de monter les
									dossiers et de les présenter à ses partenaires assureurs.</strong
								><br />
								« Les assureurs avec qui nous nouons des partenariats, connaissant notre façon de travailler,
								ils peuvent ainsi accepter plus facilement les dossiers que nous leur présentons. Cela
								étant, cela ne constitue pas une obligation pour les coopératives qui peuvent faire appel
								à d'autres partenaires. C'est un service en plus qui leur est proposé », explique Christelle
								Géral, Secrétaire Générale.
							</p>
						</div>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								« En cas de litige sur un chantier, nous faisons là encore le lien. Que ce soit pour
								conseiller et orienter la coopérative dans le cas de l'assurance dommages-ouvrage
								par exemple ou en transmettant directement les dossiers de déclarations de sinistre
								dans le cadre de la responsabilité civile ou la garantie décennale. Nous sommes,
								quoi qu'il arrive, un interlocuteur privilégié des coopératives pour faciliter
								l'ensemble des démarches administratives liées au déclenchement des assurances »,
								ajoute Christelle Géral.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="block-2" class="blocks flex-row flex-wrap justify-center items-center hidden">
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service réviseurs en lien avec l'ARCAB
				</h3>
				<div class="flex text-start">
					<div class="basis-1/2 p-16 font-bold">
						La révision coopérative est un processus obligatoire d'examen critique et analytique de
						la situation et du fonctionnement de la coopérative.
						<br /><br />
						Grâce à leur statut juridique, les coopératives artisanales bénéficient d'avantages fiscaux
						et d'une réglementation propre qui exige un audit obligatoire au minimum tous les 5 ans.

						<img src="/images/20240624_075651.jpg" class="mt-8 rounded-3xl" alt="" />
					</div>
					<div class="basis-1/2 p-16">
						<p class="font-semibold">
							Le service réviseurs conduit ces audits dans le cadre de la révision et a pour but
							d'analyser le fonctionnement et la conformité des coopératives par rapport à la
							réglementation. L'ARCAB, Association de Révision des Coopératives Artisanales du
							Bâtiment, est une émanation de la FFACB et est habilitée à réaliser la révision des
							coopératives artisanales du bâtiment. Un accompagnement personnalisé et une procédure
							qui permettent d'assurer la vérification et le réajustement du fonctionnement de
							chacune en fonction des coopératives et de ses spécificités.
						</p>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong
									>Des salariés de la FFACB sont agréés et mis à disposition de l'ARCAB pour
									effectuer les révisions des coopératives artisanales adhérentes à la fédération.</strong
								><br />
								Le rapport de révision constituer un document complet qui vise à vérifier la conformité
								du fonctionnement global des coopératives avec les règles qui leur incombent et que l'on
								peut retrouver dans le code de l'artisanat.
							</p>
						</div>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								Dans le cas d'un non-respect de la réglementation, ce rapport permet de mettre en
								lumière les difficultés et de voir précisément les points avec lesquels les
								coopératives doivent se mettre en conformité. La FFACB n'a pas un rôle de sanction
								mais se doit d'alerter en cas de dysfonctionnement.
							</p>
						</div>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								« Dans la mesure où nous accompagnons les coopératives sur le plan juridique, fiscal
								et comptable en préparant tous les ans leurs assemblées générales, nous avons toutes
								les clés en main pour les alerter rapidement en cas de manquement, c'est une
								sécurité supplémentaire pour elles. En tant que réviseurs agréés, nous avons des
								spécialistes de la coopérative artisanale du bâtiment et nous en maitrisons tous les
								aspects. L'accompagnement de la FFACB est régulier et maîtrisé », assure Christelle
								Géral.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="block-3" class="blocks flex-row flex-wrap justify-center items-center hidden">
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service de formations en partenariat avec l'AFCAB
				</h3>
				<div class="flex text-start">
					<div class="basis-1/2 p-16 font-bold">
						Partenaire de l'AFCAB, Association de Formation des Coopératives Artisanales du
						Bâtiment, la FFACB accompagne et soutient la gestion des groupements et coopératives par
						des formations adaptées :

						<ul>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Formation préalable à la création de la coopérative.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Sensibilisation à la Démarche Qualité.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Maîtrise du Contrat de Construction de Maison Individuelle.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Accompagnement juridique, comptable et fiscal.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span>Accompagnement administratif et comptable…
							</li>
						</ul>

						<img src="/images/DSC13-5-scaled.jpg" class="mt-8 rounded-3xl" alt="" />
					</div>
					<div class="basis-1/2 p-16">
						<p class="font-semibold">
							Certaines formations proposées sont incontournables comme la formation préalable à la
							création de la coopérative, la sensibilisation à la Démarche Qualité ainsi que la
							maîtrise du CCMI. D'autres sont suggérées et fortement recommandées, notamment dans le
							cas de recrutements au sein de la coopérative.
						</p>

						<div class="flex mt-8">
							<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
							></span>
							<p>
								<strong>L'objectif ? </strong><br />
								Permettre aux coopératives d'avoir toujours un même degré d'information et de connaissance
								sur la réglementation. Trois personnes de la FFACB sont mises à disposition de l'AFCAB
								pour assurer les formations des coopératives membres.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="block-4" class="blocks flex-row flex-wrap justify-center items-center hidden">
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">Un partage d'expériences</h3>
				<div class="flex text-start">
					<div class="basis-1/2 p-16 font-bold">
						À travers les différents outils communs mis en place, la FFACB sert de liant entre les
						coopératives et peut les mettre en relation en fonction de leurs besoins.
						<br /><br />
						La refonte des outils de communication comme la création d'un nouveau site internet ou le
						lancement d'une newsletter vont permettre de redynamiser les échanges entre les coopératives.

						<img src="/images/DSC13-5-scaled.jpg" class="mt-8 rounded-3xl" alt="" />
					</div>
					<div class="basis-1/2 p-16">
						<p class="font-semibold">
							« Avec le système des coopératives, nous nous inscrivons dans des modèles d'économie
							sociale et solidaire. Pouvoir intégrer un groupe qui partage ses expériences du
							quotidien,<br /> échanger sur nos difficultés mais aussi prendre du recul est
							enrichissant pour tout le monde. C'est le sens de la dynamique dans laquelle nous
							voulons aller »,<br /><br />
							Anne Lang, gérante d'Avenir et Bois, constructeur de maisons passives en bois en Alsace,
							relié à la coopérative ARTCOPA.
						</p>
						<br /><br />
						<p>
							Des temps d'échange et de partage sont organisés régulièrement afin de créer du lien
							et des espaces de dialogue entre les coopératives adhérentes :
						</p>

						<ul>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span><strong> L'Assemblée Générale </strong> de la FFACB rassemble les adhérents
								une fois par an, sauf exception liée au contexte économique ou sociétal.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span><strong>Des réunions régionales </strong> sont proposées de manière
								ponctuelle avec les partenaires pour renforcer les échanges.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span><strong>Des webinaires </strong> liés à des sujets d'actualité ou des
								problématiques majeures pour les adhérents sont régulièrement suggérés autour de
								thèmes tels que le carnet d'information du logement ou encore les différents types
								de marchés auxquels peuvent répondre les coopératives.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- TODO -->

<div class="bg-red text-center p-16 pr-48 pl-48 flex flex-col justify-center items-center">
	<h3 class="h2-blue text-white font-bold">Comment créer une coopérative avec la FFACB ?</h3>

	<p class="font-semibold text-lg text-white mt-4 mb-6">
		Si vous envisagez de créer une coopérative artisanale du bâtiment, la première chose à faire est
		de contacter la FFACB, par mail de préférence à : <span class="text-dark underline"
			><a href="mailto:infos@ffacb.com">infos@ffacb.com</a></span
		>
	</p>
	<p class="font-light text-lg text-white mt-4 mb-6">
		Après transmission des éléments clés pour la constitution de la coopérative permettant aux
		candidats de prendre du recul sur leur démarche, la FFACB propose une formation axée sur le
		statut coopératif afin de bien maîtriser l'angle et la composition de la structure à venir.
	</p>
	<p class="font-light text-lg text-white mt-4 mb-6">
		Une fois le projet enclenché, la FFACB prépare et établit les statuts à déposer puis transmet
		les dossiers aux partenaires.
	</p>

	<SimpleButton
		backgroundColor="bg-dark"
		title="Nous contacter"
		link="/contact"
		borderColor="border-dark"
	></SimpleButton>
</div>

<div class="bg-white text-center p-16 pr-32 pl-32 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Principes fondateurs de la FFACB</h2>
	<br /><br />
	<div
		class="flex flex-col flex-wrap justify-center items-center w-full bg-[#DCEFFC] rounded-3xl mb-8"
	>
		<div class=" flex-row justify-center items-start m-2 p-8 w-full flex">
			<div class="p-4 basis-1/5">
				<h3 class="uppercase font-bold text-blue text-xl">Liberté</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Liberté d'adhésion
						et de retrait
					</li>
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Les entreprises se
						choisissent librement
					</li>
				</ul>
			</div>

			<div class="p-4 basis-1/5">
				<h3 class="uppercase font-bold text-blue text-xl">Droits</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Les entreprises
						disposent de droits égaux : pour l'accès aux services* et les prises de décision (1
						entreprise = 1 voix)
					</li>
				</ul>
			</div>

			<div class="p-4 basis-1/5">
				<h3 class="uppercase font-bold text-blue text-xl">Services</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Seules les
						entreprises adhérentes ont accès aux services de la coopérative**
					</li>
				</ul>
			</div>
			<div class="p-4 basis-1/5">
				<h3 class="uppercase font-bold text-blue text-xl">Obligations</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Utiliser les
						services de la coopérative
					</li>
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Participer à la
						gestion de celle-ci
					</li>
				</ul>
			</div>
			<div class="p-4 basis-1/5">
				<h3 class="uppercase font-bold text-blue text-xl">Equité</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Les entreprises
						participent de façon équitable aux résultats, au prorata de leur activité avec la
						coopérative***
					</li>
				</ul>
			</div>
		</div>

		<div>
			<ul class="font-light text-xs mt-4 mb-6">
				<li>* sauf pour la 3 ème catégorie.</li>
				<li>** exclusivisme sauf dérogation pour les Tiers Non Associés.</li>
				<li>*** (sauf pour la 3 ème catégorie et les Tiers Non Associés).</li>
			</ul>
		</div>
	</div>

	<div class="pl-16 pr-16">
		À travers ses principes fondateurs, la FFACB assure une meilleure défense des intérêts des
		coopératives artisanales, notamment vis-à-vis des pouvoirs publics et au regard des projets de
		lois qui peuvent impacter la vie des artisans. En assurant un accompagnement régulier et une
		veille permanente sur les évolutions législatives, se regrouper en fédération permet aux
		coopératives artisanales de se tenir à jour et de se développer dans un cadre juridique fiable.
	</div>
	<br />

	<div class="pl-16 pr-16">
		Les valeurs de la coopérative artisanale, fondées sur des principes d'économie sociale et
		solidaire, permettent aux artisans d'unir leurs forces et de continuer à exister dans un marché
		très concurrentiel.
	</div>
</div>

<div class="bg-dark flex justify-center items-center pt-9 pb-9">
	<div class="h-auto">
		<div class=" border bg-white border-black rounded-full p-8 w-32">
			<img src="/images/pictos/picto-interlocuteur.svg" class="" alt="picto quali" />
		</div>
	</div>
	<div class="w-3/5 ml-7">
		<div class="text-white">
			La solidarité et la mutualisation des moyens sont des atouts non négligeables pour faire face
			à la concurrence :
		</div>
		<br />
		<div class="font-Funnel-Sans-Italic font-medium text-lg text-white">
			« Parmi les principaux avantages de l'affiliation à la FFACB il y a évidemment le fait de
			profiter du contrat de construction élaboré dans les règles de l'art. Mais au-delà de ça, les
			services de la FFACB nous permettent de profiter de conseils juridiques très pointus, d'être
			au courant des dernières réglementations et d'avoir toujours un interlocuteur pour répondre
			rapidement aux problématiques du quotidien »
		</div>
		<br />
		<div class="text-blue text-sm">
			Benjamin Houseaux, Vision Bois, constructeur de maisons en ossature bois basé à Chambéry (73)
			et membre de la coopérative Tout Habitat.
		</div>
	</div>
</div>
