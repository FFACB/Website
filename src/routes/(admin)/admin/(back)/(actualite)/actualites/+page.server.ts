import { fail, redirect, type Actions } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import type { PageServerLoad } from './$types';
import type { Actualite } from '@prisma/client';


export const load = async (event : PageServerLoad) =>{
   
  const actualites = await prisma.actualite.findMany()
 
  return{
    backlink:'/admin/home',
		active:'actualites',
    actualites
	}
}

export const actions : Actions= {
  
  delete: async (event) => {
    
    const { request, locals} = event

    const data = Object.fromEntries(await request.formData());

    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();
  
    if (!session ) {
      return fail(400, {
        data: data,
        errorMsg: "Vous n'etes pas connecté",
      });
    }

    const { id } = data

    if (id == null || id == "" ) {
      return fail(400, {
        data: data,
        errorMsg: "❌ L'identifiant de l'actualité est requis",
      });
    }

    try {

      const actualiteToDelete : Actualite | null = await prisma.actualite.findUnique({
        where: {
          id: typeof id === 'string' ? id : id.toString(),
        },
      });

      if (actualiteToDelete == null) {
        return fail(400, {
          data: data,
          errorMsg: "L'actualité n'existe pas",
        });
      }

      await prisma.actualite.delete({
        where: {
          id : typeof id === 'string' ? id : id.toString(),
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

