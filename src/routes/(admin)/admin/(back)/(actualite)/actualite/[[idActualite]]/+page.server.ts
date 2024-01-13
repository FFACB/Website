

import { prisma } from '$lib/server/prisma'
import type { Actualite } from '@prisma/client';
import { action_upsert, action_delete } from '../../actions.js';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types';

export const load :PageServerLoad = async (event) =>{
  
  const { params } = event
  const { idActualite = '' } = params

  let actualite : Actualite | null = await prisma.actualite.findUnique({
    where: {
      id: idActualite
    }
  })

  return {
    backlink:'/admin/actualites',
		active:'actualites',
    actualite: actualite as Actualite | null
  }
}



export const actions : Actions = {
  upsert: action_upsert,
  delete: action_delete
};

