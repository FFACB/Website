<script lang="ts">
	const donneesPerso = {
		$website$: 'https://www.ffacb.fr',
		$nomEntreprise$: 'FEDERATION FRANCAISE DES ARTISANS COOPERATEURS DU BATIMENT',
		$adresseEntreprise$: '3 B RUE DE SAINTE FOIX, 24500 EYMET',
		$representantCnil$: 'Vibert-vallet Guillian'
	};
</script>


<div class="donnees bg-white">
	<div>
		<div class="privacy-policy">
			<div>
				<h1 class="h2-blue text-3xl font-bold mb-8">POLITIQUE DE CONFIDENTIALITÉ</h1>
				<p>
					<br /><br /><strong>{donneesPerso['$website$']}</strong><br />{donneesPerso[
						'$nomEntreprise$'
					]}<br /><br />
					Type de site : vitrine
				</p>
			</div>

			<div>
				<h2>1 Principe</h2>
				<p>
					Nous utilisons des cookies et autres traceurs pour le fonctionnement du site, la mesure
					d'audience et l'affichage de vidéos YouTube. Aucun traceur non nécessaire n'est déposé
					sans votre consentement préalable. Vous pouvez refuser aussi facilement qu'accepter et
					retirer votre consentement à tout moment via « Gérer mes cookies ».
				</p>
			</div>

			<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->

			<div>
				<h2>2 Bandeau de consentement</h2>
				<p>
					« Nous utilisons des cookies pour le bon fonctionnement du site, mesurer l'audience et
					afficher des vidéos YouTube. Vous pouvez Accepter tout, Refuser tout ou Personnaliser vos
					choix. Vous pouvez revenir sur vos choix à tout moment via Gérer mes cookies. »
				</p>
			</div>

			<div>
				<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->
			</div>

			<div>
				<h2>3 Catégories et finalités</h2>
				<p>
					○ Nécessaires : fonctionnement et sécurité du site.<br />
					○ Mesure d'audience : analytics non exemptés, sous consentement.<br />
					○ Vidéo: YouTube, susceptible de déposer des traceurs tiers, sous consentement.
				</p>
			</div>

			<div>
				<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->
			</div>

			<div>
				<h2>4 Tableau des traceurs</h2>
				<p>
					○ Analytics: Google Analytics - Éditeur: Google - Finalité: mesure d'audience - Durée: 5
					ans - Transferts: non.
				</p>
			</div>

			<div>
				<h2>Contact</h2>
				<p>
					Si vous avez des questions à nous poser, n'hésitez pas à communiquer avec nous en
					utilisant ce qui suit :<br />
					{donneesPerso['$representantCnil$']}<br />
					{donneesPerso['$adresseEntreprise$']}
				</p>
			</div>

			<p>
				<br /><em>Date d'entrée en vigueur : </em>le 2 novembre 2025
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.donnees {
		margin: 0 auto;
		padding: 150px 8rem;

		h1,
		h2 {
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
	}
</style>
