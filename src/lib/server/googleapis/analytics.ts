import { BetaAnalyticsDataClient } from '@google-analytics/data';


export const ReportsDateRanges = {

    Weekly: "7daysAgo",
    Monthly: "30daysAgo",
    Yearly: "365daysAgo",

}

export async function AnalyticsRunReport(reportsDateRange : string = ReportsDateRanges.Weekly) {
    const propertyId = '325314412';
    const analyticsDataClient = new BetaAnalyticsDataClient();

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dimensions: [
            {
              name: 'date',
            },
        ],
        dateRanges: [
            {
                startDate: reportsDateRange,
                endDate: 'today',
            },
        ],
        metrics: [
            {
                name: 'activeUsers',
            }
        ],
    });

    console.log('Report result:', response);
}

