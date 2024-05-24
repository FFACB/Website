import { AnalyticsRunReport } from '$lib/server/googleapis/analytics';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {



	const res = await AnalyticsRunReport();
	console.log(res);
	return {
		backlink: null,
		active: 'home',
		res
	};
};

