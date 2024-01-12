
import type { PageServerLoad } from "./$types"
import { getParametre } from '$lib/server/parametres/parametres';

export const load = async (event: PageServerLoad) => {

    return {
        parametres:{
            "PUBLIC_RECAPCHA_SITEKEY":await getParametre("PUBLIC_RECAPCHA_SITEKEY")
        }
    }
}


