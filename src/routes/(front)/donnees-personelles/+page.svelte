<script lang="ts">
	const donneesPerso = {
		$website$: 'https://www.ffacb.fr',
		$nomEntreprise$: 'FEDERATION FRANCAISE DES ARTISANS COOPERATEURS DU BATIMENT',
		$adresseEntreprise$: '3 B RUE DE SAINTE FOIX, 24500 EYMET',
		$representantCnil$: 'Vibert-vallet Guillian'
	};
</script>

<div class="donnees">
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
				<h2>Le but de cette politique de confidentialité</h2>
				<p>
					Le but de cette politique de confidentialité est d'informer les utilisateurs de notre site
					des données personnelles que nous recueillerons ainsi que les informations suivantes, le
					cas échéant :
				</p>
				<ol start="1" class="list-style-type-lower-alpha">
					<li><span>Les données personnelles que nous recueillerons</span></li>
					<li><span>L'utilisation des données recueillies</span></li>
					<li><span>Qui a accès aux données recueillies</span></li>
					<li><span>Les droits des utilisateurs du site</span></li>
					<li><span>La politique de cookies du site</span></li>
				</ol>
				<p>
					Cette politique de confidentialité fonctionne parallèlement aux conditions générales
					d'utilisation de notre site.
				</p>
			</div>

			<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->

			<div>
				<h2>Consentement</h2>
				<p>Les utilisateurs conviennent qu'en utilisant notre site, ils consentent à :</p>
				<ol start="1" class="list-style-type-lower-alpha">
					<li>
						<span>les conditions énoncées dans la présente politique de confidentialité et</span>
					</li>
					<li>
						<span
							>la collecte, l'utilisation et la conservation des données énumérées dans la présente
							politique.</span
						>
					</li>
				</ol>
			</div>

			<div>
				<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->
			</div>

			<div>
				<h2>Politique sur les cookies</h2>
				<p>
					Un cookie est un petit fichier, stocké sur le disque dur d'un utilisateur par le site Web.
					Son but est de recueillir des données relatives aux habitudes de navigation de
					l'utilisateur.
				</p>
				<p>Nous utilisons les types de cookies suivants sur notre site :</p>
				<ol start="1" class="list-style-type-lower-alpha">
					<li>
						<strong><span>Cookies analytiques</span></strong><br />
						Cela nous permet d'améliorer la conception et la fonctionnalité de notre site en recueillant
						des données sur le contenu auquel vous accédez et sur lequel vous vous accrochez en utilisant
						notre site.
					</li>
				</ol>
				<p>
					Vous pouvez choisir d'être averti chaque fois qu'un cookie est transmis. Vous pouvez
					également choisir de désactiver les cookies entièrement dans votre navigateur Internet,
					mais cela peut diminuer la qualité de votre expérience d'utilisation.
				</p>
			</div>

			<div>
				<!-- Ajoutez d'autres sections de votre politique de confidentialité ici -->
			</div>

			<div>
				<h2>Modifications</h2>
				<p>
					Cette politique de confidentialité peut être modifiée à l'occasion afin de maintenir la
					conformité avec la loi et de tenir compte de tout changement à notre processus de collecte
					de données. Nous recommandons à nos utilisateurs de vérifier notre politique de temps à
					autre pour s'assurer qu'ils soient informés de toute mise à jour. Au besoin, nous pouvons
					informer les utilisateurs par courriel des changements apportés à cette politique.
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
	}
</style>
