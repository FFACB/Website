<script lang="ts">
	import type { google } from '@google-analytics/data/build/protos/protos';
	import { onMount } from 'svelte';
	let analytics_report: null | google.analytics.data.v1beta.IRunReportResponse = null;

	onMount(async () => {
		fetch('/api/googleapis/analytics/report')
			.then(async (result) => {
				if (result.status === 200) {
					const json_data = await result.json();
					if (json_data.type === 'success') {
						analytics_report = json_data.data as google.analytics.data.v1beta.IRunReportResponse;
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});
</script>

<div>
    {#if analytics_report != null}
        {#each analytics_report.rows as row}
            {#each row.dimensionValues as dimension}
                <p>{dimension.value}</p>
            {/each}
            {#each row.metricValues as metric}
                <p>{metric.value}</p>
            {/each}
        {/each}
    {/if}

</div>
