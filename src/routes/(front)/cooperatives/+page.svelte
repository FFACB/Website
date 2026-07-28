<script lang="ts">
	//@ts-nocheck
	import { browser } from '$app/environment';
	import { isNumber } from 'chart.js/helpers';
	import { onMount } from 'svelte';

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
                            <h2 class="h2-blue font-bold text-2xl">${coop.name}</h2><br>

							${
								coop.adresse != '' || coop.cp != '0' || coop.ville != ''
									? `
							  <div>
							 	<h3 class="h2-blue font-bold text-sm">Localité :</h3>
								<p class="font-light ml-4 text-lg">${coop.adresse}</p>
								<p class="font-light ml-4 text-lg">${coop.cp} ${coop.ville}</p>
							 </div>

                         		<br>
								`
									: ''
							}
							${
								coop.siteInternet != ''
									? `
								<div>
							 		<h3 class="h2-blue font-bold text-sm">Site web :</h3>
									<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="${coop.siteInternet.startsWith('www') ? `https://${coop.siteInternet}` : coop.siteInternet}">${coop.siteInternet}</a>
								</div>
							 	<br>
								`
									: ''
							}
							${
								coop.adresseMail != '' || coop.contact1Email != ''
									? `
							   <div>
							 		<h3 class="h2-blue font-bold text-sm">Email principal :</h3>
                             		<a class="text-dark underline font-bold text-xs ml-4" href="mailto:${coop.adresseMail == '' ? coop.contact1Email : coop.adresseMail}">${coop.adresseMail == '' ? coop.contact1Email : coop.adresseMail}</a><br>
							 	</div>
							 	<br>
								`
									: ''
							}
						 	${
								coop.contact1Nom != '' && coop.contact2Nom != ''
									? `
							 	<h3 class="h2-blue font-bold text-sm">Contact :</h3>
										`
									: ''
							}
									 	${
											coop.contact1Nom != ''
												? `
							 	<div>
									<div class="ml-4 font-light">${coop.contact1Nom} 
										<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="tel:${coop.contact1telephone}">${coop.contact1telephone}</a>
										<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="mailto:${coop.contact1Email}">${coop.contact1Email}</a>
									</div>
								`
												: ''
										}
								 	${
										coop.contact2Nom != ''
											? `
									<div class="ml-4 font-light">${coop.contact2Nom} 
										<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="tel:${coop.contact2telephone}">${coop.contact2telephone}</a>
										<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="mailto:${coop.contact2Email}">${coop.contact2Email}</a>
								</div>
								`
											: ''
									}

										${
											coop.lienVideo != ''
												? `
								<div>
							 		<h3 class="h2-blue font-bold text-sm">Lien video :</h3>
									<a class="text-dark underline font-semibold text-xs ml-4" target="_blank" href="${coop.lienVideo}">${coop.lienVideo}</a>
								</div>
							 	<br>
								`
												: ''
										}

		${
			coop.photo1 != ''
				? `
								<div>
							 		<h3 class="h2-blue font-bold text-sm">Images :</h3>
									<div class="flex flex-row flex-wrap justify-center items-center">
										<img src="${coop.photo1}" class="w-full h-full object-cover bg-cover rounded-3xl" alt="photo1" />
										${coop.photo2 != '' ? `<img src="${coop.photo2}" class="w-full h-full object-cover bg-cover rounded-3xl" alt="photo2" />` : ''}
										${coop.photo3 != '' ? `<img src="${coop.photo3}" class="w-full h-full object-cover bg-cover rounded-3xl" alt="photo2" />` : ''}
										
									</div>
								</div>
							 	<br>
								`
				: ''
		}

								 </div>
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
				lat: 0,
				lng: 0
			};

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

				Object.values(markers).forEach((markerRegions) => {
					markerRegions.forEach((marker) => {
						marker.infowindow.close();
					});
				});

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

			const middle = {
				lats: [],
				lngs: [],
				count: 0
			};

			coop_list.querySelectorAll('.region-' + region).forEach((item) => {
				item.classList.add('cooperative-active');
				item.classList.remove('cooperative-inactive');
				markers[region].forEach((marker) => {
					marker.marker.setMap(map);
					middle.lats.push(parseFloat(marker.data.latitude));
					middle.lngs.push(parseFloat(marker.data.longitude));
					middle.count++;
				});
			});

			const middleLat = middle.lats.reduce((a, b) => a + b, 0) / middle.count;
			const middleLng = middle.lngs.reduce((a, b) => a + b, 0) / middle.count;

			map.setCenter({ lat: middleLat, lng: middleLng });

			const coop_title = document.getElementById('cooperative-title');
			coop_title.innerHTML = markers[region][0].data.cooperativeRegion.name;
			const cooperatives_display = document.getElementById('cooperatives-display');
			let stringbuilder = ``;

			for (const coop of markers[region]) {
				stringbuilder += `
                <div class="flex basis-1/3 justify-left mb-8">
                    <span class="w-2 h-2 inline-block mt-2 bg-blue rounded-full mr-2"></span>
                    <div class="flex flex-col">
                        <div class="w-full text-left">
                            <h2 class="h2-blue font-bold text-sm">${coop.data.siteInternet != '' ? `<a href="${coop.data.siteInternet.startsWith('www') ? `https://${coop.data.siteInternet}` : coop.data.siteInternet}" target="_blank">${coop.data.name}</a>` : coop.data.name}</h2>
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

<div class="cooperatives-container flex md:flex-row flex-col bg-white shadow-inner">
	<div class="p-16 min-w-[25%]">
		<h1 class="h2-blue font-bold mb-8">Trouver votre coopérative</h1>
		<div id="cooperatives-list" class="flex flex-col"></div>
	</div>
	<div id="map" class="map-container h-[calc(100vh-112px)] w-full"></div>
</div>
<div class="bg-white p-32">
	<div id="cooperative-title" class="h2-blue font-bold mb-8"></div>
	<div id="cooperatives-display" class="flex flex-row flex-wrap justify-start"></div>
</div>
