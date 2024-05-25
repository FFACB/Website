<script lang="ts">
	import type { google } from '@google-analytics/data/build/protos/protos';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	let analytics_report: null | google.analytics.data.v1beta.IRunReportResponse = null;



	let reportElement: HTMLCanvasElement;
	onMount(async () => {
		fetch('/api/googleapis/analytics/report')
			.then(async (result) => {
				if (result.status === 200) {
					const json_data = await result.json();
					if (json_data.type === 'success') {
						analytics_report = json_data.data as google.analytics.data.v1beta.IRunReportResponse;
						doReportChart();
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});

	function dateStringToDate(dateString: string) {
		try {
			var year = dateString.substring(0, 4);
			var month = dateString.substring(4, 6);
			var day = dateString.substring(6, 8);
			var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
			const offset = date.getTimezoneOffset();
			date = new Date(date.getTime() - offset * 60 * 1000);
			return date;
		} catch (error) {
			return null;
		}
	}

	function doReportChart() {

        const dark = document.documentElement.className == 'dark';

        Chart.defaults.color = dark ? "#fff" : "#000";
        
		if (
			analytics_report == null ||
			analytics_report.rows == null ||
			analytics_report.rowCount == 0
		) {
			return;
		}

		let data = analytics_report.rows.map((row) => {
			if (
				row.dimensionValues != null &&
				row.metricValues != null &&
				row.dimensionValues.length > 0 &&
				row.metricValues.length > 0
			) {
				return {
					date: row.dimensionValues[0].value as string,
					count: row.metricValues[0].value as string
				};
			} else {
				return {
					date: '0',
					count: '0'
				};
			}
		});

        data.sort((a, b) => {
			
            return a.date < b.date ? -1 : 1;

		});

		data = data.map((row) => {
			let date = dateStringToDate(row.date as string);
			let stringDate = '';
			if (date != null) {
				stringDate = date.toLocaleDateString('fr-FR', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
			}
			return {
				date: stringDate,
				count: row.count
			};
		});

	

		const chart = new Chart(reportElement, {
        
			type: 'line',
            
			data: {
                
				labels: data.map((row) => row.date),
				datasets: [
					{
						label: 'Utilisateurs par jour',
						data: data.map((row) => row.count),
                        backgroundColor: 'rgba(151, 185, 254, 0.8)',
                        borderColor: 'rgba(151, 185, 254, 0.2)',
					}
				]
			}
		});

	}
</script>

<div class="w-full p-4 rounded-container-token">
	<div class="w-full h-full"><canvas bind:this={reportElement} id="report"></canvas></div>
</div>
