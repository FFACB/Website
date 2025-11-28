<script lang="ts">
	export let data;
	const { mentionsLegales } = data;
</script>

<div class="bg-white w-full">
	<div class="mentions">
		<h1 class="h2-blue text-3xl font-bold mb-8 text-blue">Mentions légales</h1>

		<p>
			<b>Client :</b> tout professionnel ou personne physique capable au sens des articles 1123 et
			suivants du Code civil, ou personne morale, qui visite le Site objet des présentes conditions
			générales.<br />
			<b>Prestations et Services :</b>
			<a href={mentionsLegales['$website$']}>{mentionsLegales['$website$']}</a> met à disposition des
			Clients :
		</p>
		<p>
			<b>Contenu :</b> Ensemble des éléments constituants l'information présente sur le Site, notamment
			textes - images - vidéos.
		</p>
		<p>
			<b>Informations clients :</b> Ci-après dénommé « Information(s) » qui correspondent à
			l'ensemble des données personnelles susceptibles d'être détenues par
			<a href={mentionsLegales['$website$']}>{mentionsLegales['$website$']}</a> pour la gestion de votre
			compte, de la gestion de la relation client et à des fins d'analyses et de statistiques.
		</p>
		<p><b>Utilisateur :</b> Internaute se connectant, utilisant le site susnommé.</p>
		<p>
			<b>Informations personnelles :</b> « Les informations qui permettent, sous quelque forme que ce
			soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent
			» (article 4 de la loi n° 78-17 du 6 janvier 1978).
		</p>
		<p>
			Les termes « données à caractère personnel », « personne concernée », « sous-traitant » et «
			données sensibles » ont le sens défini par le Règlement Général sur la Protection des Données
			(RGPD : n° 2016-679).
		</p>

		<h2>1. Présentation du site internet.</h2>
		<p>
			En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
			l'économie numérique, il est précisé aux utilisateurs du site internet <a
				href={mentionsLegales['$website$']}>{mentionsLegales['$website$']}</a
			> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
		</p>
		<p>
			<strong>Propriétaire</strong> : {mentionsLegales['$formJuridique$']}
			{mentionsLegales['$nomEntreprise$']} - Capital social de {mentionsLegales['$csEntreprise$']}€
			- Numéro de TVA : {mentionsLegales['$tvaEntreprise$']} - {mentionsLegales[
				'$adresseEntreprise$'
			]}
			{mentionsLegales['$cpEntreprise$']}
			{mentionsLegales['$villeEntreprise$']}<br />
			<strong>SIRET</strong> : 350 715 900 0048 - <strong>Code APE</strong> : 9499 Z -
			<strong>Récépissé de déclaration</strong>
			: RNA n° W923000233 (Sous-préfecture de Boulogne-Billancourt) - <strong>ORIAS</strong> :
			09050316.<br />
			<strong>Responsable de la publication</strong> : {mentionsLegales['$nomWebmaster$']} - {mentionsLegales[
				'$mailWebmaster$'
			]}<br />
			<strong>Hébergeur</strong> : {mentionsLegales['$nomHebergeur$']} - {mentionsLegales[
				'$adresseHebergeur$'
			]}
			{mentionsLegales['$cpHebergeur$']}
			{mentionsLegales['$villeHebergeur$']} - Téléphone : {mentionsLegales['$telHebergeur$']}<br />
			<strong>Délégué à la protection des données (DPO)</strong> : {mentionsLegales[
				'$representantCnil$'
			]} - {mentionsLegales['$mailCnil$']}
		</p>

		<h2>2. Conditions générales d'utilisation du site et des services proposés.</h2>
		<p>
			Le Site constitue une œuvre de l'esprit protégée par les dispositions du Code de la Propriété
			Intellectuelle et des Réglementations Internationales applicables. Le Client ne peut en aucune
			manière réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou
			travaux du Site.
		</p>
		<p>
			L'utilisation du site <a href={mentionsLegales['$website$']}>{mentionsLegales['$website$']}</a
			> implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites.
			Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
		</p>

		<h2>3. Politique de confidentialité et cookies</h2>
		<h3>3.1 Responsable de traitement et DPO</h3>
		<p>
			Responsable : {mentionsLegales['$nomEntreprise$']}, {mentionsLegales['$adresseEntreprise$']}
			{mentionsLegales['$cpEntreprise$']}
			{mentionsLegales['$villeEntreprise$']} ; contact : {mentionsLegales['$mailWebmaster$']}.<br />
			Déléguée à la protection des données (DPO) : {mentionsLegales['$representantCnil$']} - {mentionsLegales[
				'$mailCnil$'
			]}.
		</p>
		<h3>3.2 Finalités et bases légales</h3>
		<ul>
			<li>Exploitation, sécurité et maintenance du site : intérêt légitime.</li>
			<li>Mesure d’audience (analytics non exemptés) : consentement.</li>
			<li>Affichage de vidéos YouTube : consentement.</li>
			<li>Gestion du formulaire de contact : intérêt légitime.</li>
		</ul>
		<p>
			Les données personnelles collectées par la {mentionsLegales['$nomEntreprise$']} sont susceptibles
			d’être enregistrées dans sa base de données. L’ensemble des informations collectées via le formulaire
			de contact sont nécessaires à la gestion de votre dossier et au traitement de votre demande et
			seront principalement utilisées pour suivre votre dossier.
		</p>
		<h3>3.3 Données traitées et origine</h3>
		<p>
			Données d’identification et de contact (formulaire), données de navigation/traceurs
			(analytics/YouTube), journaux techniques ; certaines données peuvent provenir de services
			tiers intégrés (YouTube), sous réserve de votre consentement.
		</p>
		<h3>3.4 Destinataires et sous-traitants</h3>
		<p>
			Accès interne restreint ; sous-traitants techniques : hébergeur, mainteneur/formulaire,
			prestataire analytics et sécurité/infogérance, agissant sur instructions documentées et soumis
			à confidentialité et sécurité.
		</p>
		<p>
			L’accès aux données personnelles est strictement limité aux employés et préposés de la {mentionsLegales[
				'$nomEntreprise$'
			]}, habilités à les traiter en raison de leurs fonctions. Les informations recueillies
			pourront éventuellement être communiquées à des tiers liés à l’entreprise par contrat pour
			l’exécution de tâches sous-traitées nécessaires à la gestion informatique des dossiers.
		</p>
		<h3>3.5 Durées de conservation</h3>
		<ul>
			<li>Formulaire de contact : durée nécessaire au traitement puis archivage limité.</li>
			<li>Journaux techniques et sécurité : durée proportionnée à la finalité de sécurité.</li>
			<li>Traceurs : selon la Politique cookies et la durée annoncée pour chaque traceur.</li>
		</ul>
		<h3>3.6 Vos droits et exercice</h3>
		<p>
			Conformément aux dispositions légales et réglementaires applicables, vous bénéficiez d’un
			droit d’accès, de rectification, de portabilité et d’effacement de ces données ou encore de
			limitation du traitement. Vous pouvez également, pour des motifs légitimes, vous opposer au
			traitement des données vous concernant.
		</p>
		<p>
			Vous pouvez, sous réserve de la production d’un justificatif d’identité valide, exercer vos
			droits en contactant le DPO de la {mentionsLegales['$nomEntreprise$']}, Madame {mentionsLegales[
				'$representantCnil$'
			]}, par courrier à {mentionsLegales['$nomEntreprise$']}, {mentionsLegales[
				'$adresseEntreprise$'
			]}
			{mentionsLegales['$cpEntreprise$']}
			{mentionsLegales['$villeEntreprise$']} ou par mail {mentionsLegales['$mailCnil$']}.
		</p>
		<p>
			En cas de difficulté en lien avec la gestion de vos données personnelles, vous pouvez adresser
			une réclamation auprès de la Commission Nationale de l’Informatique et des Libertés (CNIL) ou
			de toute autre autorité compétente.
		</p>

		<h2>4. Signalement de contenu illicite</h2>
		<p>
			Tout signalement peut être adressé par mail à {mentionsLegales['$mailWebmaster$']}.<br />
			La {mentionsLegales['$nomEntreprise$']} ne peut être tenue responsable des contenus, informations
			ou publications (textes, images, vidéos, commentaires, etc.) diffusés par les coopératives adhérentes
			sur leurs sites internet ou leurs comptes personnels sur les réseaux sociaux, ces derniers étant
			édités et administrés sous leur entière responsabilité.
		</p>

		<h2>5. Contact</h2>
		<p>
			Pour toute question, envoyez-nous un mail à {mentionsLegales['$mailWebmaster$']}.
		</p>

		<div id="linkHTML">
			<p>
				Ces mentions légales RGPD sont issues du <a
					href="https://fr.orson.io/1371/generateur-mentions-legales"
					title="générateur gratuit offert par Orson.io">générateur gratuit offert par Orson.io</a
				>
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.mentions {
		margin: 0 auto;
		padding: 150px 8rem;

		h1,
		h2,
		h3 {
			color: var(--dark-color-0d1c30);

			margin: 4rem;
			@media only screen and (max-width: 640px) {
				padding: 0;
				margin: 32px;
			}
		}

		h1 {
			font-size: 3rem;
		}

		h2 {
			font-size: 2rem;
		}
		h3 {
			font-size: 1.5rem;
		}
		a {
			color: var(--red-color-e65247);
			text-underline-offset: 5px;
		}
	}
</style>
