import { fail, redirect } from '@sveltejs/kit'
import { IsStringNotEmpty,} from "$lib/utils/type";
import { prisma } from '$lib/server/prisma'
import type { PageServerLoad } from "../../../$types"



export const load: PageServerLoad = async (event) =>{
   

  const actualites = await prisma.actualite.findMany()
  return {
    actualites
  }
}

export const actions = {
  
  delete: async ({ request, locals}) => {
    


    const data = Object.fromEntries(await request.formData());

    if (!locals.user || locals.user.role == null || locals.user.role != "ADMIN" ) {
      return fail(400, {
        data: data,
        errorMsg: "Vous n'etes pas connecté",
      });
    }

    
    const { id = null } = data

    if (!IsStringNotEmpty(id)) {
      return fail(400, {
        data: data,
        errorMsg: "❌ L'identifiant de l'actualité est requis",
      });
    }

    try {

      const actualiteToDelete = await db.actualite.findUnique({
        where: {
          id
        }
      })

      if (actualiteToDelete == null) {
        return fail(400, {
          data: data,
          errorMsg: "L'actualité n'existe pas",
        });
      }

      await db.actualite.delete({
        where: {
          id
        },
      })

      return {
        data: undefined,
        errorMsg: undefined,
      };
     

    } catch (err) {

      return fail(400, {
        data: data,
        errorMsg: "❌ Une erreur est survenue lors de la suppression de l'actualité",
      });

    }
  },
};

