<script lang="ts">
	//@ts-nocheck
	import { browser } from '$app/environment';
	import { isNumber } from 'chart.js/helpers';

	export let data;
	const { parametres } = data;
	const { cooperatives } = data;
	const { PUBLIC_GOOGLE_API_KEY } = parametres;

	let map: any;
	let markers = {};

	async function importMap(apiKey: string) {
		((g) => {
			var h,
				a,
				k,
				p = 'The Google Maps JavaScript API',
				c = 'google',
				l = 'importLibrary',
				q = '__ib__',
				m = document,
				b = window;

			b = b[c] || (b[c] = {});

			var d = b.maps || (b.maps = {}),
				r = new Set(),
				e = new URLSearchParams(),
				u = () =>
					h ||
					(h = new Promise(async (f, n) => {
						await (a = m.createElement('script'));
						e.set('libraries', [...r] + '');
						for (k in g)
							e.set(
								k.replace(/[A-Z]/g, (t) => '_' + t[0].toLowerCase()),

								g[k]
							);
						e.set('callback', c + '.maps.' + q);
						a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
						d[q] = f;
						a.onerror = () => (h = n(Error(p + ' could not load.')));

						a.nonce = m.querySelector('script[nonce]')?.nonce || '';
						m.head.append(a);
					}));
			d[l]
				? console.warn(p + ' only loads once. Ignoring:', g)
				: (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
		})({
			key: apiKey,
			v: 'weekly'
		});
	}

	async function initMap(cooperatives: CooperativeFull[]) {
		const position = { lat: 46.416132, lng: 2.527045 };

		const { Map } = await google.maps.importLibrary('maps');

		const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker');

		// The map, centered at Uluru
		map = new Map(document.getElementById('map'), {
			zoom: 6,
			center: position,
			mapId: 'MAP-COOPERATIVES'
		});

		cooperatives.forEach((coop) => {
			
			const trimedRegion = coop.cooperativeRegion.name
				.replace(/[^a-zA-Z ]/g, '')
				.replace(/ /g, '')
				.toLowerCase();

			const infowindow = new google.maps.InfoWindow({
				content: `
                <div class="flex flex-col">
                        <div class="w-full text-left">
                            <h2 class="h2-blue font-bold text-sm">${coop.name}</h2>
                            <p class="font-light">${coop.adresse}</p>
                             <p class="font-light">${coop.cp} ${coop.ville}</p>
                             <a class="h2-blue font-bold text-sm" href="mailto:${coop.adresseMail == '' ? coop.contact1Email : coop.adresseMail}">${coop.adresseMail == '' ? coop.contact1Email : coop.adresseMail}</a>
                        </div>
                </div>

                `,
				ariaLabel: coop.name
			});

			const coop_img = document.createElement('img');
			coop_img.style.width = '35px';
			coop_img.style.height = '35px';
			coop_img.style.transform = 'translateY(17px)';
			coop_img.src = new URL('/images/FFACB_picto_map.png', import.meta.url).href;

			const latlng = {
				lat : 0,
				lng : 0
			}

			if (!isNaN(coop.latitude) && isNumber(coop.latitude)) {
				latlng.lat = parseFloat(coop.latitude);
			}

			if (!isNaN(coop.longitude) && isNumber(coop.longitude)) {
				latlng.lng = parseFloat(coop.longitude);
			}

			const marker = new AdvancedMarkerElement({
				map: null,
				position: { lat: latlng.lat, lng: latlng.lng },
				title: coop.name,
				content: coop_img,
				gmpClickable: true
			});

			marker.addListener('click', ({ domEvent, latLng }) => {
				const { target } = domEvent;
				infowindow.open(marker.map, marker);
			});

			const markerData = {
				marker,
				infowindow,
				coop_img,
				data: coop
			};

			if (markers[trimedRegion]) {
				markers[trimedRegion].push(markerData);
			} else {
				markers[trimedRegion] = [markerData];
			}
		});

		const coop_list = document.getElementById('cooperatives-list');

		let stringbuilder = ``;
		
		for (const region of Object.keys(markers)) {
			stringbuilder += `
            
            <div class="cooperative-item region-${region} cooperative-inactive" onclick="toggleListItem('${region}')">
				<span class="uppercase">${markers[region][0].data.cooperativeRegion.name}</span>
				<span>+</span>
			</div>

            `;
		}
		if (coop_list != null) coop_list.innerHTML = stringbuilder;
	}

	if (browser) {
		importMap(PUBLIC_GOOGLE_API_KEY.value);
		initMap(cooperatives);

		window.toggleListItem = function (region: string) {
			const coop_list = document.getElementById('cooperatives-list');

			coop_list?.querySelectorAll('.cooperative-active').forEach((item) => {
				item.classList.remove('cooperative-active');
				item.classList.add('cooperative-inactive');

				Object.values(markers).forEach((markers) => {
					markers.forEach((marker) => {
						marker.marker.setMap(null);
					});
				});
			});

			coop_list.querySelectorAll('.region-' + region).forEach((item) => {
				item.classList.add('cooperative-active');
				item.classList.remove('cooperative-inactive');
				markers[region].forEach((marker) => {
					marker.marker.setMap(map);
				});
			});

			const coop_title = document.getElementById('cooperative-title');
			coop_title.innerHTML = markers[region][0].data.cooperativeRegion.name;
			const cooperatives_display = document.getElementById('cooperatives-display');
			let stringbuilder = ``;

			for (const coop of markers[region]) {
				stringbuilder += `
                <div class="flex basis-1/3 justify-center mb-8">
                    <span class="w-2 h-2 inline-block mt-2 bg-blue rounded-full mr-2"></span>
                    <div class="flex flex-col">
                        <div class="w-full text-left">
                            <h2 class="h2-blue font-bold text-sm">${coop.data.name}</h2>
                            <p class="font-light">${coop.data.adresse}</p>
                             <p class="font-light">${coop.data.cp} ${coop.data.ville}</p>
                             <a class="h2-blue font-bold text-sm" href="mailto:${coop.data.adresseMail == '' ? coop.data.contact1Email : coop.data.adresseMail}">${coop.data.adresseMail == '' ? coop.data.contact1Email : coop.data.adresseMail}</a>
                        </div> </div>
                </div>
                `;
			}

			if (cooperatives_display != null) cooperatives_display.innerHTML = stringbuilder;
		};
	}
</script>

<div class="cooperatives-container flex bg-white shadow-inner">
	<div class="p-16">
		<h1 class="h2-blue font-bold mb-8">Trouver votre coopérative</h1>
		<div id="cooperatives-list" class="flex flex-col"></div>
	</div>
	<div id="map" class="map-container h-[calc(100vh-112px)] w-full"></div>
</div>
<div class="bg-white p-16">
	<h2 id="cooperative-title" class="h2-blue font-bold mb-8">Auvergne-Rhône-Alpes</h2>
	<div id="cooperatives-display" class="flex flex-row flex-wrap justify-start">
		<div class="flex basis-1/3 justify-center mb-8">
			<span class="w-2 h-2 inline-block mt-2 bg-blue rounded-full mr-2"></span>
			<div class="flex flex-col">
				<div class="w-full text-left">
					<h2 class="h2-blue font-bold text-sm">3B COOP (26)</h2>
					<p class="font-light">3B COOP (26) 545 route de la correspondance</p>
					<p class="font-light">26300 Bourg-de-Péage</p>
					<a class="h2-blue font-bold text-sm" href="mailto:brice@3b-coop.fr">brice@3b-coop.fr</a>
				</div>
			</div>
		</div>
	</div>
</div>
