import type { PageServerLoad } from './$types';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
export const load: PageServerLoad = async () => {



	await runReport();

	return {
		backlink: null,
		active: 'home'
	};
};


/**
   * TODO(developer): Uncomment this variable and replace with your
   *   Google Analytics 4 property ID before running the sample.
   */



  // Using a default constructor instructs the client to use the credentials
  // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
 
  // Runs a simple report.
  async function runReport() {
	const propertyId = '325314412';
	const analyticsDataClient = new BetaAnalyticsDataClient();
	
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2024-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    console.log('Report result:');
    response?.rows?.forEach((row) => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

