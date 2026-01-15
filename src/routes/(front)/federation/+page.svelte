<script lang="ts">
	let activeIndex = 0;
	let activeHover = 0;
	const dates = [
		{
			date: '1988',
			description:
				"Création de l'Union Nationale des Artisans Coopérateurs de la Construction (UNACC) par Michel Dreano."
		},
		{
			date: '1990',
			description:
				"L'UNACC devient la Fédération Nationale des Artisans Coopérateurs du Bâtiment (FNACB)."
		},
		{
			date: '1997',
			description:
				"Création de l'ARCAB, Association de Révision des Coopératives Artisanales du Bâtiment."
		},
		{
			date: '1998',
			description:
				'Lancement de la Démarche Qualité dans les Sociétés Coopératives Artisanales (SCA).'
		},
		{
			date: '2003',
			description:
				"Création de l'AFCAB, Association de Formation des Coopératives Artisanales du Bâtiment."
		},
		{
			date: '2005',
			description: "Mise en place de l'assurance sous-traitance pour les adhérents de la FFACB."
		},
		{
			date: '2009',
			description:
				"Inscription de la FFACB à l'Orias (Registre Unique des Intermédiaires en assurances, banques et finances)."
		},
		{
			date: '2013',
			description:
				'Mise en place du RGE pour les coopératives artisanales du bâtiment en partenariat avec le Ministère du Développement Durable et Qualibat. Création de la marque FFACB.'
		},
		{
			date: '2015',
			description: 'Création du Club des Partenaires et la FFACB devient adhérente de Qualibat.'
		},
		{
			date: '2016',
			description:
				"L'organisme de formation émanant de la FFACB, l'AFCAB, obtient la certification qualité, CERTIBAT Formation Professionnelle (N° du certificat FP1611)."
		},
		{
			date: '2020',
			description:
				"Signature de la convention entre GROUPAMA CAUTION et la FFACB pour la délivrance de garanties auprès de ses adhérents. Obtention par l'AFCAB de la certification Qualiopi pour la formation professionnelle."
		},
		{
			date: '2021',
			description:
				'Signature de la convention entre S2C et la FFACB pour la délivrance des garanties de remboursement, de livraison à prix et délais convenus et de paiement des sous-traitants auprès de ses adhérents.'
		},
		{
			date: '2023',
			description: 'Didier Fabignon est élu président de la FFACB.'
		},
		{
			date: '2024-2025',
			description: 'Restructuration interne et refonte des outils de communication.'
		}
	];

	let activeServices = false;
</script>

<div
	class="w-full h-[calc(100vh-112px)] flex flex-col justify-end items-start relative shadow-inner"
>
	<img
		class="w-full h-full object-cover bg-cover absolute"
		src="/images/AGC/Image10.jpg?width=1920&height=1080"
		alt="federation"
	/>
	<div
		class="relative sm:ml-32 ml-0 flex h-[100%] sm:w-2/5 w-full flex-col justify-end items-center overflow-hidden"
	>
		<img
			class="absolute w-full top-0 sm:block hidden"
			alt="background"
			src="/images/pictos/FFACB_formebleu.svg"
		/>
		<div class="z-10 p-16 flex flex-col justify-center">
			<h1 class="w-full h1-white font-extrabold mb-8">Une coopérative artisanale, c'est quoi ?</h1>
			<div class="text-white">
				<p class="font-light">
					Une coopérative artisanale est un groupement de plusieurs artisans qui décident de
					s'associer en créant une structure qu'ils dirigent de façon démocratique.
				</p>
				<p class="font-Funnel-Sans font-light">
					Tout en restant autonomes dans leurs activités propres, ils choisissent d'unir leurs
					forces pour mieux répondre à leurs besoins économiques et sociaux.
				</p>
				<p class="font-Funnel-Sans font-light sm:block hidden">
					La coopérative artisanale est un modèle économique unique, fondé sur des principes de
					partage et d'équité, qui permet de concilier performance économique, indépendance,
					solidarité et valorisation des savoir-faire.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white w-full p-16 sm:pl-48">
		<h2 class="h2-blue font-bold">Qui sommes-nous ?</h2>
		<br />

		La Fédération Française des Artisans Coopérateurs du Bâtiment (FFACB) est une organisation
		professionnelle nationale créée en 1988. Elle regroupe des coopératives d'artisans dans le
		secteur du bâtiment, principalement dans la construction et la rénovation de maisons
		individuelles, mais également dans les marchés collectifs et les travaux publics. La FFACB
		représente un modèle unique : celui d'artisans qui coopèrent, tout en restant indépendants, pour
		unir leurs compétences, partager des moyens et offrir une réponse complète et fiable aux
		clients.
	</div>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white sm:w-1/2 w-full p-16 sm:pl-48">
		<h2 class="text-2xl font-bold">Nos missions :</h2>
		<br />
		Notre rôle est d'accompagner, structurer et représenter nos Coopératives partout en France. Plus concrètement,
		la FFACB s'engage à :
		<br /><br />
		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				<strong> Fédérer </strong> les coopératives artisanales autour de valeurs communes : qualité,
				solidarité, responsabilité
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				<strong>Accompagner</strong> la création et le développement de coopératives locales
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong>Former</strong> les
				artisans et les dirigeants aux spécificités du modèle coopératif (gestion, droit, assurance, etc.)
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong
					>Garantir la qualité</strong
				> via une démarche qualité et un contrôle du respect de la réglementation
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong
					>Représenter et défendre
				</strong> les intérêts des coopératives auprès des pouvoirs publics et des institutions professionnelles
			</li>
		</ul>
	</div>
	<div class="bg-[#DCEFFC] sm:w-1/2 w-full p-16 sm:pr-48">
		<h2 class="text-2xl font-bold">Nos engagements :</h2>
		<br /><br />
		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Promouvoir une <strong> construction artisanale durable, responsable et humaine </strong>
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				Offrir un <strong>cadre structurant</strong> et des outils concrets (juridiques, commerciaux,
				administratifs)
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Contribuer à la
				<strong>pérennité des entreprises artisanales locales</strong> face aux grands groupes
			</li>
		</ul>
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
			« Avec le système de la coopérative, nous n'avons pas besoin de faire appel à des
			sous-traitants ou de manière exceptionnelle et tous les artisans partagent une philosophie et
			un engagement communs. Dans ce cadre, les artisans ne travaillent pas POUR un constructeur,
			ils sont LE constructeur. Tous sont donc impliqués à part égale dans le sérieux du projet »,
		</div>
		<div class="text-blue text-sm">
			Benjamin Houseaux, Vision Bois, constructeur de maisons en ossature bois basé à Chambéry (73)
			et membre de la coopérative Tout Habitat.
		</div>
	</div>
</div>
<div class="flex h-1/5">
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
<div class="flex sm:flex-row flex-col bg-white p-16">
	<div class="flex flex-col sm:w-1/2 w-full sm:pl-32 sm:pr-8">
		<h2 class="h2-blue font-bold">Avantages pour nos coopératives :</h2>
		<br />
		<ul class="ml-16">
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				<strong> Indépendance préservée</strong> mais avec la <strong>force d'un collectif</strong>
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
				<strong>Accès aux marchés</strong> (publics, privés, promoteurs, etc.)
			</li>
			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong
					>Sécurité juridique :</strong
				>
				contrat de construction (CCMI), garanties obligatoires et facultatives (Décennale, Garantie de
				Livraison, Dommage-Ouvrages etc.)
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong
					>Formations et accompagnement</strong
				> personnalisés
			</li>

			<li class=" mb-4">
				<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span><strong>Réseau </strong> d'entraide,
				de partage d'expérience et d'innovation
			</li>
		</ul>
	</div>
</div>

<div
	class="bg-blue text-center pt-8 pb-8 flex flex-col justify-center items-center sm:pl-32 sm:pr-32 pr-16 pl-16"
>
	<h2 class="h2-blue text-dark font-bold ">Quelques chiffres clés*</h2>
	<p class="italic text-sm mb-4">* En 2024</p>
	<p class="text-white">
		La Fédération Française des Artisans Coopérateurs du Bâtiment (FFACB),<br /> branche « bâtiment
		- construction » <br /> regroupe des coopératives artisanales du bâtiment qui représentent à elles
		toutes une part importante de la construction de maisons individuelle en France.
	</p>
	<div class="flex w-full sm:flex-row flex-col">
		<div class="basis-1/3 p-4">
			<div class="w-full">
				<h3 class="h2-blue text-9xl text-white font-bold">73</h3>
				<p class="">Coopératives adhérentes</p>
			</div>
		</div>

		<div class="basis-1/3 p-4">
			<div class="w-full">
				<h3 class="h2-blue text-9xl text-white font-bold">713</h3>
				<p class="">
					Entreprises artisanales (hors Tiers Non Associés) qui emploient 3 500 salariés.
				</p>
			</div>
		</div>

		<div class="basis-1/3 p-4">
			<div class="w-full">
				<h3 class="h2-blue text-9xl text-white font-bold">90</h3>
				<p class="">
					Millions de chiffre d'affaires réalisés par les coopératives et groupements membres de la
					fédération.
				</p>
			</div>
		</div>
	</div>

</div>

<div class="bg-[#DCEFFC] text-center p-16 flex flex-col justify-center items-center">
	<h2 class="h2-blue font-bold">Quels sont les atouts de la FFACB ?</h2>
	<p class="font-semibold text-lg mt-6 mb-6 sm:pr-48 sm:pl-48">
		La FFACB accompagne les coopératives artisanales, dès leur création, dans leur gestion et leur
		développement, dans le respect de la législation, des statuts et du règlement intérieur de la
		FFACB. Elle assure en outre leur suivi et les conseille tout au long de leur existence, en cas
		de difficultés ou de litiges. Elle représente enfin un gage de confiance et de qualité pour les
		clients.
	</p>
	<div class="flex sm:flex-row flex-col">
		<div class="flex flex-col m-2 p-8 text-white bg-dark rounded-3xl">
			<h3 class="uppercase font-bold text-xl">Des principes fondateurs</h3>
			<ul class="font-light">
				<li>L'adhésion volontaire.</li>
				<li>Le pouvoir démocratique exercé par les coopérateurs.</li>
				<li>La participation économique des coopérateurs.</li>
				<li>L'autonomie et l'indépendance.</li>
				<li>L'éducation, la formation et l'information.</li>
				<li>L'engagement volontaire envers la communauté.</li>
			</ul>
		</div>
		<div class="flex flex-col m-2 p-8 text-white bg-red rounded-3xl">
			<h3 class="uppercase font-bold text-xl">Des valeurs clés</h3>
			<ul class="font-light">
				<li>Savoir-faire artisanal.</li>
				<li>Ancrage territorial.</li>
				<li>Renommée locale.</li>
				<li>Qualité reconnue.</li>
			</ul>
		</div>
		<div class="flex flex-col m-2 p-8 text-white bg-blue rounded-3xl">
			<h3 class="uppercase font-bold text-xl">Des atouts majeurs</h3>
			<ul class="font-light">
				<li>Une sinistralité basse et autogérée.</li>
				<li>Un interlocuteur unique.</li>
				<li>Un encadrement fédéral.</li>
			</ul>
		</div>
	</div>
	<p class="mt-6 mb-6 sm:pr-48 sm:pl-48">
		La FFACB accompagne ses coopératives tout au long de l'année, en leur proposant des réunions
		d'informations, des newsletters, des formations complémentaires ainsi qu'un service juridique
		leur permettant <strong
			>de pouvoir accompagner leurs clients dans un projet durable et sécurisé</strong
		> avec les meilleures garanties du marché.
	</p>
</div>

<div class="font-Funnel Sans w-full flex sm:flex-row flex-col">
	<div class="bg-white w-full p-16 sm:pl-48">
		<h2 class="h2-blue font-bold">En résumé :</h2>
		<br />

		La FFACB est un des principaux réseaux de coopératives artisanales du bâtiment en France,
		offrant à la fois autonomie individuelle et force collective. Elle fédère un large nombre
		d’artisans engagés dans la construction ou la rénovation, en leur fournissant les outils,
		garanties et formations nécessaires à un modèle coopératif performant.
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
			« Il règne au sein de la FFACB un véritable esprit d'équipe et c'est agréable de se sentir
			appartenir à un mouvement coopératif qui porte ce sens du collectif. Grâce à sa rigueur, la
			Fédération a une solide réputation auprès de ses partenaires, assureurs et garants, et ça
			aussi c'est un plus »,
		</div>
		<div class="text-blue text-sm">
			Grégory Myotte-Duquet, Vice-président de la FFACB et co-gérant de l'entreprise familiale
			Myotte-Duquet, spécialiste de la construction de bâtiments en ossature bois sur le secteur du
			Grand-Est.
		</div>
	</div>
</div>

<div
	class="bg-white text-center pr-16 pl-16 sm:pr-48 sm:pl-48 pt-8 pb-8 flex flex-col justify-center items-center"
>
	<h2 class="h2-blue font-bold">Les services de la FFACB</h2>
	<p class="font-semibold text-lg mt-6 mb-6">
		Outre son rôle de trait d'union et d'information auprès des coopératives et des partenaires du
		secteur y compris sur le plan technique et l'application des nouvelles réglementations, la FFACB
		assure <strong>conseil et appui juridique.</strong><br />
		La fédération permet aux coopératives d'accéder à des produits d'assurances de la construction et
		met son personnel à disposition de l'ARCAB pour réaliser les travaux de révision quinquennale et de
		l'AFCAB pour dispenser des formations à ses membres.
	</p>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="uppercase overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			on:click={() => {
				activeServices = !activeServices;
			}}
			class="m-2 p-4 pt-2 pb-2 font-bold text-white border-2 bg-dark border-dark rounded-full hover:bg-white hover:text-black transition-all duration-300"
		>
			{ activeServices ? 'Masquer' : 'Découvrir' }
		</div>
	</div>

	<div class="overflow-hidden {activeServices ? 'h-auto' : 'h-0'}">
		<div class="flex flex-row sm:flex-nowrap flex-wrap h-auto">
			<div class="p-2 sm:basis-1/3 basis-full h-auto">
				<div class="h-full flex flex-col p-8 rounded-3xl border border-blue">
					<h3 class="uppercase font-bold text-xl h2-blue mb-4">Le service juridique et fiscal</h3>
					<ul class="font-light text-left">
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Établissement des
							statuts et du règlement intérieur.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Étude du budget
							prévisionnel.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Tenue des
							assemblées générales.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement
							juridique, fiscal et comptable.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							Mise à disposition du Contrat de Construction de Maison Individuelle (CCMI), régulièrement
							mis à jour en fonction des dernières évolutions législatives.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							Mise à disposition de différents modèles de contrats types (hors CCMI), d'avenants et autres
							outils destinés à faciliter leur gestion quotidienne.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Réalisation d'une
							veille juridique.
						</li>
					</ul>
				</div>
			</div>
			<div class="p-2 sm:basis-1/3 basis-full h-auto">
				<div class="h-full flex flex-col p-8 rounded-3xl border border-blue">
					<h3 class="uppercase font-bold text-xl h2-blue mb-4">
						Le service en charge des assurances
					</h3>
					<ul class="font-light text-left">
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							Établissement des dossiers d'assurances en partenariat avec les garants et l'assureur construction
							: garantie de remboursement et de livraison à prix et délais convenus, garantie décennale,
							responsabilité civile, assurance dommages-ouvrage...
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							Accompagnement des coopératives dans la gestion des dossiers d'assurance en cas de litige.
						</li>
					</ul>
				</div>
			</div>
			<div class="p-2 sm:basis-1/3 basis-full h-auto">
				<div class="h-full flex flex-col p-8 rounded-3xl border border-blue">
					<h3 class="uppercase font-bold text-xl h2-blue">
						Le service réviseurs en lien avec l'ARCAB
					</h3>
					<ul class="font-light text-left">
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							La procédure de révision coopérative a pour objet l'examen critique et analytique de la
							situation et du fonctionnement de celle-ci en tenant compte des caractéristiques propres
							des coopératives.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>
							L'ARCAB, Association de Révision des Coopératives Artisanales du Bâtiment, partenaire de
							la FFACB, est habilitée à réaliser la révision quinquennale des coopératives. À la FFACB,
							trois personnes sont agréées et mises à disposition de l'ARCAB pour tenir les révisions.
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="flex flex-col m-2 p-8 rounded-3xl border border-blue">
			<h3 class="uppercase font-bold text-xl h2-blue mb-4">
				Le service formation en relation avec l'AFCAB
			</h3>
			<ul class="font-light text-left">
				<li>
					L'AFCAB, Association de Formation des Coopératives Artisanales du Bâtiment, a été créée en
					2003 à la demande du Fonds de Formation conformément à la loi GIRAUD de 2004. Le rôle de
					l'AFCAB est de répondre à toutes demandes de formations pour les stages techniques,
					professionnels et transversaux des coopératives et futures coopératives membres de la
					FFACB.
				</li>
				<li>
					<br />
					Partenaire de cet organisme, la FFACB met à disposition son personnel qualifié et soutient la
					gestion des groupements et coopératives par des formations adaptées :
					<br /><br />
					<ul class="ml-16">
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Formation
							préalable à la création de la coopérative.
						</li>

						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Sensibilisation à
							la Démarche Qualité.
						</li>

						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Maîtrise du
							Contrat de Construction de Maison Individuelle.
						</li>

						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement
							juridique.
						</li>

						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement
							juridique, comptable et fiscal.
						</li>
						<li>
							<span class="w-2 h-2 inline-block bg-blue rounded-full mr-2"></span>Accompagnement
							administratif et comptable…
						</li>
					</ul>
				</li>
				<li>
					<br />
					Certifiée QUALIOPI, l'AFCAB remplit les 6 critères qualité exigés par le Décret n°2015-790 du
					30 juin 2015 relatif à la qualité des actions de formation professionnelle continue.<br />
					L'AFCAB est certifiée selon le Référentiel National sur la Qualité des actions concourants au
					développement des compétences mentionné à l'article L.6316-3 du code du travail et le PS-FOR-PRO-001
					- Programme de certification des prestataires concourant au développement des compétences applicable.
				</li>
			</ul>
		</div>
	</div>
</div>

<div
	class="bg-[#DCEFFC] text-center pl-16 pr-16 pt-8 pb-8 flex-col justify-center items-center sm:flex hidden"
>
	<h2 class="h2-blue font-bold mb-4">Nos faits marquants</h2>

	<div class="relative w-full">
		<div class="flex justify-center items-center relative h-80 w-full">
			{#each dates as date, index}
				<div
					style="left: {(index / (dates.length - 1)) * 90 + 5}%;"
					class="flex flex-col justify-center items-start bg-white max-w-64 rounded-3xl p-4 absolute -translate-x-1/2 top-[55%] -translate-y-full {activeIndex ===
					index
						? 'z-10'
						: 'hidden'}"
				>
					<p class=" text-start {activeIndex === index ? '' : 'hidden'}">
						{date.description}
					</p>
				</div>

				<div
					style="left: {(index / (dates.length - 1)) * 90 + 5}%;"
					class="flex flex-col justify-center items-start bg-white max-w-64 rounded-3xl p-4 absolute -translate-x-1/2 top-full -translate-y-full z-10"
				>
					<h3 class="h2-blue text-xl font-bold">{date.date}</h3>
				</div>

				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					style="left: {(index / (dates.length - 1)) * 90 + 5}%;"
					class="h-5 w-5 rounded-3xl bg-blue absolute top-[65%] -translate-y-1/2 -translate-x-1/2 cursor-pointer z-10"
					on:mouseenter={() => {
						activeHover = index;
					}}
					on:click={() => {
						activeIndex = index;
					}}
				></div>
			{/each}
			<div class="h-[2px] w-[90%] bg-blue top-[65%] -translate-y-1/2 absolute"></div>
		</div>
	</div>
</div>
