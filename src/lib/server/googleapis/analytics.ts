import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';
import type { google } from '@google-analytics/data/build/protos/protos';
import { logger } from '../logs';
dotenv.config();

export const ReportsDateRanges = {

    Weekly: "7daysAgo",
    Monthly: "30daysAgo",
    Yearly: "365daysAgo",

}

export async function AnalyticsRunReport(reportsDateRange : string = ReportsDateRanges.Weekly) : Promise<null | google.analytics.data.v1beta.IRunReportResponse> {
    const propertyId = process.env.PRIVATE_ANALYTICS_GA4_PROPERTY_ID;
    const isEnabled = process.env.PRIVATE_GOOGLE_APPLICATION_CREDENTIALS_ENABLED;
    if (isEnabled == 'false') {
        logger.info({}, 'Google Analytics is disabled');
        return null;
    }

    const analyticsDataClient = new BetaAnalyticsDataClient();

   
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

    return response;
}

