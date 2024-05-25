import type { RequestHandler } from '../$types';
import { IsEmptyString } from '$lib/client/utils/type';
import { prisma } from '$lib/server/prisma';
import { getParametre } from '$lib/server/parametres/parametres';
import { logger } from '$lib/server/logs';
import Mailer from '$lib/server/mail';
import { AnalyticsRunReport } from '$lib/server/googleapis/analytics';

export const GET: RequestHandler = async ({ request , locals}): Promise<Response> => {
	try {

		if (!locals.user) {
			logger.error(request.headers, "Vous n'etes pas connecté", '/api/googleapis/analytics/report');
			return new Response(JSON.stringify({ success: 0, errorMsg: "Vous n'etes pas connecté" }), {
				status: 403
			});
		}

	
		const result = await AnalyticsRunReport();
		if (!result) {
			logger.error({}, 'Analytics non active', '/api/googleapis/analytics/report');
			return new Response(
				JSON.stringify({ type: 'failure', errorMsg: 'Analytics non actif' }),
				{ status: 400 }
			);
		}
		


		return new Response(JSON.stringify({ type: 'success', data: result }), {
			status: 200
		});
	} catch (error) {
		logger.error(error, '/api/googleapis/analytics/report');
		return new Response(
			JSON.stringify({
				type: 'error',
				errorMsg: error instanceof Error ? error.message : 'Erreur survenue'
			}),
			{ status: 500 }
		);
	}
};
