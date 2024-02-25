
import type { PageServerLoad } from "./$types"
import { getParametre } from '$lib/server/parametres/parametres';
import Mailer from "$lib/server/mail";
import { page } from '$app/stores';

export const load : PageServerLoad= async ({url}) => {   

    console.log(url.protocol)

    const mailer = new Mailer()
    await mailer.init(url.protocol.includes("https"))
    mailer.sendMail("guillianvibert90@gmail.com","guillianviber","guillian","guillian")
    return {
        parametres:{
            "PUBLIC_RECAPCHA_SITEKEY":await getParametre("PUBLIC_RECAPCHA_SITEKEY")
        }
    }
}


