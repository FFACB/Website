import { AnalyticsRunReport } from '$lib/server/googleapis/analytics';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

	return {
		backlink: null,
		active: 'home',
	};
};

