
import type { PageServerLoad } from "./$types"
import { getParametre } from '$lib/server/parametres/parametres';
import mailer from "$lib/server/mail";

export const load = async (event: PageServerLoad) => {   

    mailer.sendMail("guillianvibert90@gmail.com","guillianviber","guillian","guillian")
    return {
        parametres:{
            "PUBLIC_RECAPCHA_SITEKEY":await getParametre("PUBLIC_RECAPCHA_SITEKEY")
        }
    }
}


