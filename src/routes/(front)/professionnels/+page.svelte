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

		htmlAccompagnement.style.borderBottomColor = 'rgb(13 28 48)';
		htmlAssurances.style.borderBottomColor = 'rgb(13 28 48)';
		htmlArcab.style.borderBottomColor = 'rgb(13 28 48)';
		htmlFormations.style.borderBottomColor = 'rgb(13 28 48)';
		htmlPartage.style.borderBottomColor = 'rgb(13 28 48)';
		htmlAccompagnement.style.backgroundColor = '#DCEFFC';
		htmlAccompagnement.style.fontWeight = 'normal';
		htmlAssurances.style.backgroundColor = '#DCEFFC';
		htmlAssurances.style.fontWeight = 'normal';
		htmlArcab.style.backgroundColor = '#DCEFFC';
		htmlArcab.style.fontWeight = 'normal';
		htmlFormations.style.backgroundColor = '#DCEFFC';
		htmlFormations.style.fontWeight = 'normal';
		htmlPartage.style.backgroundColor = '#DCEFFC';
		htmlPartage.style.fontWeight = 'normal';

		element.style.backgroundColor = '#ffffff'; //"#DCEFFC";
		if (window.innerWidth > 768) {
			element.style.borderBottomColor = '#ffffff';
		}
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
	});
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/GRANDVOINET.CHAPELLE.DES.BUIS.jpg?width=1920&height=1080"
		alt="federation"
	/>
	<div
		class="relative sm:ml-32 ml-0 flex h-[95%] sm:w-2/5 w-full flex-col justify-end items-center overflow-hidden"
	>
		<img
			class="absolute w-full top-0 sm:block hidden"
			alt="background"
			src="/images/pictos/FFACB_formebleu.svg"
		/>

		<div class="z-10 p-16 flex flex-col justify-center">
			<h1 class="w-full h1-white font-extrabold mb-8">
				Comment fonctionne une coopérative d'artisans ?
			</h1>
			<div class="text-white">
				<p class="font-Funnel-Sans-Italic font-medium text-lg sm:block hidden">
					Une coopérative d'artisans est une structure qui permet à plusieurs artisans indépendants
					de travailler ensemble, tout en conservant leur autonomie juridique et leur entreprise
					propre. Elle fonctionne selon les principes de la coopération : mutualisation, solidarité,
					gouvernance démocratique.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white sm:w-1/2 w-full p-16 sm:pl-48 pr-16">
		<h2 class="text-2xl font-bold">1. Constitution de la coopérative</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Regroupe plusieurs artisans (souvent 5 à 10 au départ).
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Statut juridique : Société Coopérative Artisanale constituée sous forme SARL à capital variable.
				(Il existe des coopératives artisanales sous forme SA. Cependant, la FFACB n'en créé pas en raison
				des risques et responsabilités liés à cette forme juridique).
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Parts sociales réparties
				de manière égales entre les associés.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Au moins 3/4 des
				associés et 2/3 de la Cogérance doivent être immatriculés au Registre National des
				Entreprises sous une activité Artisanale.
			</li>
		</ul>
	</div>
	<div class="bg-lightgrey sm:w-1/2 w-full p-16 sm:pr-48">
		<h2 class="text-2xl font-bold">2. Organisation interne</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Fonctionnement démocratique : chaque associé dispose d'une voix dans la prise de décision, quels
				que soient son chiffre d'affaires et son nombre de dirigeants (principe coopératif : 1 associé
				= 1 voix).
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Une Cogérance tripartite est exigée pour les coopératives membres de la FFACB.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Répartition des
				responsabilités entre les associés pour la gestion quotidienne (commerciale, administrative,
				technique…). La gérance n'est là que pour faciliter la gestion quotidienne de la
				coopérative, mais tous les associés doivent s'investir. La Coopérative peut également
				engager des salariés ou prestataires indépendants pour assurer certaines missions de support
				administratif.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Les membres sont à la
				fois associés et utilisateurs de la coopérative
			</li>
		</ul>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-lightgrey sm:w-1/2 w-full p-16 sm:pl-48 pr-16">
		<h2 class="text-2xl font-bold">3. Activités mutualisées au sein de la Coopérative :</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Administratives et juridiques : mise en place et gestion des contrats, assurances, facturation,
				préparation des Assemblées Générales, etc.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Commerciales : relation avec les clients, réponses à des appels d'offres, etc.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Technique :
				planification et suivi des chantiers, réunion entre les associés, etc.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Communication et
				marketing : site web, logo, plaquettes, etc.
			</li>
		</ul>
	</div>
	<div class="bg-white sm:w-1/2 w-full p-16 sm:pr-48">
		<h2 class="text-2xl font-bold">4. Relation avec le client et les artisans</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Le client signe un seul contrat avec la coopérative (et non avec chaque artisan séparément) dont
				elle est l'interlocuteur unique. Les artisans quant à eux soumettent leurs devis à la Coopérative
				pour lui permettre de chiffrer un contrat.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				La coopérative gère les garanties légales pour ses chantiers (ex. garantie de livraison à demander
				pour un CCMI)
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>L'artisan est mandaté
				par la coopérative pour exécuter ses lots dans les règles de l'art. L'artisan ne peut pas
				sous-traiter son lot. Seule la Coopérative peut avoir un sous-traitant appelé un
				Tiers-Non-Associés. L'appel à des Tiers Non Associés est limité à 20% du Chiffre d'affaires
				annuel de la Coopérative.
			</li>
		</ul>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white sm:w-1/2 w-full p-16 sm:pl-48 pr-16">
		<h2 class="text-2xl font-bold">5. Partage des résultats :</h2>
		<br />

		<p class="ml-16">
			Les résultats dégagés à la fin de l'exercice social doivent être répartis entre les associés
			de la coopérative au prorata du chiffre d'affaires qu'ils ont réalisé avec cette dernière.
		</p>
	</div>
	<div class="bg-lightgrey sm:w-1/2 w-full p-16 sm:pr-48">
		<h2 class="text-2xl font-bold">6. Avantages fiscaux</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Exonération de l'impôt sur les sociétés (IS) *
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Exonération de Contribution Économique Territoriale (CFE et CVAE), ancienne Taxe Professionnelle
				*
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Exonération de la Taxe
				d'Apprentissage *
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Exonération de la
				Contribution Sociale de Solidarité des Sociétés (C3S) * = sauf pour la quote-part de
				résultat issue de l'activité réalisée avec les sous-traitants.
			</li>
		</ul>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white w-full p-16 sm:pl-48">
		<h2 class="h2-blue font-bold">Les points de vigilance à prendre en compte :</h2>
		<br />

		<p>
			- Bonne entente et gouvernance essentielle (les conflits internes peuvent pénaliser
			l'activité)
		</p>
		<p>- Vision partagée et gestion rigoureuse</p>
		<p>- Implication régulière demandée (temps, réunions, décisions collectives etc.)</p>
	</div>
</div>
<!-- <div class="flex bg-white sm:flex-row flex-col">
	<div class="flex flex-col sm:w-1/2 w-full pr-8 p-16 sm:pl-48">
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
</div> -->

<div class="bg-dark flex justify-center items-center pt-9 pb-9">
	<div class="h-auto sm:block hidden">
		<div class=" border bg-white border-black rounded-full p-4 w-32">
			<img src="/images/homme.png" class="" alt="picto quali" />
		</div>
	</div>
	<div class="sm:w-3/5 w-full p-16 sm:p-0 sm:ml-7">
		<div class="font-Funnel-Sans-Italic font-medium text-lg text-white">
			« En travaillant en coopérative, nous avons l'immense avantage de connaitre parfaitement notre
			réseau d'artisans et de maîtriser notre sujet de A à Z. Nous ne sommes pas juste des
			assembleurs de compétences, nous mettons en œuvre nos connaissances et notre expertise de la
			construction. En étant des artisans constructeurs et pas des constructeurs faisant appel à des
			artisans, nous avons une logique inverse. Après le soutien de la FFACB pour nous structurer
			est essentiel. Passer en CCMI est une démarche chronophage et coûteuse. C'est un
			enrichissement de pouvoir compter sur l'expérience et le savoir des professionnels de la FFACB
			qui sont extrêmement pointus sur le sujet »,
		</div>
		<div class="text-blue text-sm">
			Anne Lang, gérante d'Avenir et Bois, constructeur de maisons passives en bois en Alsace,
			membre de la coopérative ARTCOPA.
		</div>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-lightgrey w-full p-16 sm:pl-48 pr-16">
		<h2 class="text-2xl text-blue font-bold">
			Quels sont les principaux avantages de modèle coopératif ?
		</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Unir ses forces pour peser davantage et répondre à des marchés plus ambitieux
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Devenir constructeur, sans renier son identité artisanale
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Partager des
				savoir-faire et monter en compétence ensemble
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Rompre l'isolement
				professionnel qui peut parfois peser sur les entreprises
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>S'assurer une nouvelle
				source de marchés et renforcer sa situation économique
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Développer un réseau de
				confiance
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Conserver son
				indépendance tout en mutualisant des outils
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Donner du sens à son
				activité en contribuant à un modèle solidaire
			</li>
		</ul>

		<p class="italic text-lg w-full text-center">
			« Seul on va plus vite, ensemble on va plus loin. »
		</p>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white w-full p-16 sm:pl-48">
		<h2 class="text-2xl text-blue text-center font-bold">
			Entreprendre autrement : les atouts de la coopérative avec la FFACB
		</h2>
		<br />

		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Etablissement et modifications des statuts ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Une Cogérance tripartite est exigée pour les coopératives membres de la FFACB.
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement pour
				l'établissement et les modifications du Règlement Intérieur (une trame adaptée au système
				coopératif est fournie aux nouveaux Adhérents) ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Préparation des
				documents pour les Assemblées Générales de la coopérative ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Mise à disposition de
				divers contrats : Contrat de Construction de Maison Individuelle, (CCMI) Contrat de
				sous-traitance, Marché de Travaux, Contrat de réservation (VEFA), contrat d'apporteur
				d'affaires etc. ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Informations sur les DTU
				et normes du bâtiment ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Mise en relation avec
				nos partenaires et suivi des dossiers d'assurances (Décennale, Responsabilité Civile,
				professionnelle, Dommages-Ouvrage) et de garanties (garantie de remboursement des acomptes,
				garantie de livraison, garantie de paiement des sous-traitants, garantie de futur
				achèvement) pour la coopérative ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Traitements des
				garanties (sous réserve d'acceptation du dossier par les Garants) ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement pour le
				recouvrement des impayés ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Référencement auprès
				d'un Médiateur de la Consommation ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Mise à disposition des
				Partenariats FFACB le cas échéant ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement
				juridique, fiscal et comptable ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Veille juridique sur la
				règlementation des Coopératives et du CCMI ;
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Sollicitation des
				pouvoirs publics et élus locaux sur les problèmes rencontrés par les Coopératives et leurs
				Artisans ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement dans la
				procédure collective de dissolution de la Coopérative ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Adhésion à l'AFCAB,
				Association de Formation émanant de la FFACB, permettant la dispense de formations
				spécifiques (sur le CCMI pour exemple) aux membres des coopératives adhérentes FFACB ;
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Adhésion à l'ARCAB,
				Association de Révision émanant de la FFACB, permettant l'accès à la révision coopérative
				(révision quinquennale obligatoire).
			</li>
		</ul>
	</div>
</div>

<div class="bg-[#DCEFFC] text-center sm:p-32 p-16 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Pourquoi adhérer à la FFACB ?</h2>
	<br /><br />
	<div class="flex sm:flex-row flex-col">
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
	<div class="h-auto sm:block hidden">
		<div class=" border bg-white border-black rounded-full p-4 w-32">
			<img src="/images/homme.png" class="" alt="picto quali" />
		</div>
	</div>
	<div class="sm:w-3/5 w-full p-16 sm:p-0 sm:ml-7">
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

<div class="bg-red text-center p-16 sm:pr-48 sm:pl-48 flex flex-col justify-center items-center">
	<h3 class="h2-blue text-white font-bold">Comment créer une coopérative avec la FFACB ?</h3>

	<p class="font-semibold text-lg text-white mt-4 mb-6">
		Si vous envisagez de créer une coopérative artisanale du bâtiment, contactez-nous par mail à : <span
			class="text-dark underline"><a href="mailto:infos@ffacb.com">infos@ffacb.com</a></span
		>
	</p>
	<p class="font-light text-lg text-white mt-4 mb-6">
		Après de premiers échanges sur les éléments clés pour constituer une coopérative, une formation
		axée sur le statut coopératif sera organisée pour permettre aux futurs associés d'appréhender au
		mieux son fonctionnement, ses particularités et ses enjeux
	</p>
	<p class="font-light text-lg text-white mt-4 mb-6">
		Cette formation est l'occasion pour les participants d'évaluer l'opportunité pour eux de créer
		une coopérative et d'adhérer à la FFACB. Le cas échéant, la Fédération prépare et établit les
		statuts à déposer et se charge de présenter les dossiers aux partenaires.
	</p>

	<SimpleButton
		backgroundColor="bg-dark"
		title="Nous contacter"
		link="/contact"
		borderColor="border-dark"
	></SimpleButton>
</div>
<!-- 
<div class="bg-white text-center p-16 sm:pr-32 sm:pl-32 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Principes fondateurs de la FFACB</h2>
	<br /><br />
	<div
		class="flex flex-col flex-wrap justify-center items-center w-full bg-[#DCEFFC] rounded-3xl mb-8"
	>
		<div class="flex justify-center items-start m-2 p-8 w-full sm:flex-row flex-col">
			<div class="p-4 basis-1/5 w-full">
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

			<div class="p-4 basis-1/5 w-full">
				<h3 class="uppercase font-bold text-blue text-xl">Droits</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Les entreprises
						disposent de droits égaux : pour l'accès aux services* et les prises de décision (1
						entreprise = 1 voix)
					</li>
				</ul>
			</div>

			<div class="p-4 basis-1/5 w-full">
				<h3 class="uppercase font-bold text-blue text-xl">Services</h3>

				<ul class="  text-dark mt-4 text-left">
					<li class="mt-2">
						<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Seules les
						entreprises adhérentes ont accès aux services de la coopérative**
					</li>
				</ul>
			</div>
			<div class="p-4 basis-1/5 w-full">
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
			<div class="p-4 basis-1/5 w-full">
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

	<div class="sm:pl-16 sm:pr-16">
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
</div> -->

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white w-full p-16 sm:pl-48 pr-16">
		<h2 class="text-2xl font-bold">Bénéficiez d'un partage d'expérience</h2>
		<br />

		<p class="ml-16">
			À travers les différents outils communs mis en place, la FFACB sert de liant entre les
			coopératives et peut les mettre en relation en fonction de leurs besoins.
		</p>
	</div>
</div>

<div class="bg-dark flex justify-center items-center pt-9 pb-9">
	<div class="h-auto sm:block hidden">
		<div class=" border bg-white border-black rounded-full p-4 w-32">
			<img src="/images/homme.png" class="" alt="picto quali" />
		</div>
	</div>
	<div class="sm:w-3/5 w-full sm:ml-7 sm:p-0 p-16">
		<div class="font-Funnel-Sans-Italic font-medium text-lg text-white">
			« Avec le système des coopératives, nous nous inscrivons dans des modèles d'économie sociale
			et solidaire. Pouvoir intégrer un groupe qui partage ses expériences du quotidien, échanger
			sur nos difficultés mais aussi prendre du recul est enrichissant pour tout le monde. C'est le
			sens de la dynamique dans laquelle nous voulons aller »,
		</div>
		<br />
		<div class="text-blue text-sm">
			Anne Lang, gérante d'Avenir et Bois, constructeur de maisons passives en bois en Alsace, relié
			à la coopérative ARTCOPA.
		</div>
	</div>
</div>

<div class="bg-white text-center p-16 sm:pr-32 sm:pl-32 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Quels sont les services proposés par la FFACB ?</h2>
	<br /><br />

	<div class="relative mt-16 sm:w-auto w-full">
		<div
			class="sm:absolute bottom-full translate-y-[1px] sm:w-[95%] w-full sm:flex-row flex-col left-1/2 sm:-translate-x-1/2 translate-x-0 flex"
		>
			<input
				type="button"
				on:click={() => {
					clickService(htmlAccompagnement, 0);
				}}
				bind:this={htmlAccompagnement}
				class="uppercase sm:absolute block bottom-0 left-0 sm:w-1/5 w-full z-50 p-4 bg-white text-dark text-center rounded-3xl rounded-tl-3xl sm:rounded-tr-3xl sm:rounded-bl-none sm:rounded-br-none sm:mb-0 mb-4 cursor-pointer border border-dark"
				value="ACCOMPAGNEMENT"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlAssurances, 1);
				}}
				bind:this={htmlAssurances}
				class="uppercase sm:absolute block bottom-0 left-[20%] sm:w-1/5 w-full z-50 p-4 bg-white text-dark text-center rounded-3xl rounded-tl-3xl sm:rounded-tr-3xl sm:rounded-bl-none sm:rounded-br-none sm:mb-0 mb-4 cursor-pointer border border-dark"
				value="ASSURANCES"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlArcab, 2);
				}}
				bind:this={htmlArcab}
				class="uppercase sm:absolute block bottom-0 left-[40%] sm:w-1/5 w-full z-50 p-4 bg-white text-dark text-center rounded-3xl rounded-tl-3xl sm:rounded-tr-3xl sm:rounded-bl-none sm:rounded-br-none sm:mb-0 mb-4 cursor-pointer border border-dark"
				value="ARCAB"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlFormations, 3);
				}}
				bind:this={htmlFormations}
				class="uppercase sm:absolute block bottom-0 left-[60%] sm:w-1/5 w-full z-50 p-4 bg-white text-dark text-center rounded-3xl rounded-tl-3xl sm:rounded-tr-3xl sm:rounded-bl-none sm:rounded-br-none sm:mb-0 mb-4 cursor-pointer border border-dark"
				value="FORMATIONS"
			/>

			<input
				type="button"
				on:click={() => {
					clickService(htmlPartage, 4);
				}}
				bind:this={htmlPartage}
				class="uppercase sm:absolute block bottom-0 left-[80%] sm:w-1/5 w-full z-50 p-4 bg-white text-dark text-center rounded-3xl rounded-tl-3xl sm:rounded-tr-3xl sm:rounded-bl-none sm:rounded-br-none sm:mb-0 mb-4 cursor-pointer border border-dark"
				value="PARTAGE"
			/>
		</div>

		<div
			id="block-0"
			class="blocks flex flex-row flex-wrap justify-center items-center sm:w-auto w-full"
		>
			<div class="border border-dark rounded-3xl sm:w-auto w-full">
				<h3 class="h2-blue font-bold sm:m-8 mt-16 text-2xl">
					UN ACCOMPAGNEMENT JURIDIQUE, FISCAL ET COMPTABLE
				</h3>
				<div class="flex sm:flex-row flex-col sm:text-start text-center">
					<div class="basis-1/2 sm:p-16 p-8 font-bold">
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
					<div class="basis-1/2 sm:p-16 p-8">
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
								le service participe à la rédaction de la trame de ce contrat, garantissant ainsi la conformité
								aux normes légales et la protection des parties prenantes. Mis en place de longue date,
								il est régulièrement actualisé afin de tenir compte des évolutions législatives mais aussi
								des remarques des adhérents. Il s'agit d'en optimiser le fonctionnement. Le CCMI est un
								gage de qualité et un cadre sécurisant pour les coopératives adhérentes.
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
								le service assure une veille juridique pour informer les coopératives des évolutions législatives
								et réglementaires. En cas de litige, le service accompagne le client lors de la phase
								pré-judiciaire et si une procédure doit être engagée, la FFACB propose une mise en relation
								avec les avocats référents de l'AAMOI* avec lesquels une convention a été signée.
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

		<div
			id="block-1"
			class="blocks flex-row flex-wrap justify-center items-center sm:w-auto w-full hidden"
		>
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service de gestion des produits d'assurances
				</h3>
				<div class="flex flex-col sm:flex-row text-start">
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

		<div
			id="block-2"
			class="blocks flex-row flex-wrap justify-center items-center sm:w-auto w-full hidden"
		>
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service réviseurs en lien avec l'ARCAB
				</h3>
				<div class="flex flex-col sm:flex-row text-start">
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

		<div
			id="block-3"
			class="blocks flex-row flex-wrap justify-center items-center sm:w-auto w-full hidden"
		>
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">
					Un service de formations en partenariat avec l'AFCAB
				</h3>
				<div class="flex flex-col sm:flex-row text-start">
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

		<div
			id="block-4"
			class="blocks flex-row flex-wrap justify-center items-center sm:w-auto w-full hidden"
		>
			<div class="border border-dark rounded-3xl">
				<h3 class="h2-blue font-bold m-8 mt-16 text-2xl uppercase">Un partage d'expériences</h3>
				<div class="flex flex-col sm:flex-row text-start">
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
								></span><strong> L'Assemblée Générale </strong> de la FFACB rassemble les adhérents une
								fois par an, sauf exception liée au contexte économique ou sociétal.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span><strong>Des réunions régionales </strong> sont proposées de manière ponctuelle
								avec les partenaires pour renforcer les échanges.
							</li>
							<li class="ml-4">
								<span class="min-w-2 w-2 min-h-2 h-2 inline-block bg-blue rounded-full mr-2 mt-2"
								></span><strong>Des webinaires </strong> liés à des sujets d'actualité ou des problématiques
								majeures pour les adhérents sont régulièrement suggérés autour de thèmes tels que le carnet
								d'information du logement ou encore les différents types de marchés auxquels peuvent répondre
								les coopératives.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- TODO -->
