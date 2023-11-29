
import {  action_delete } from '../actions'
import { prisma } from '$lib/server/prisma'
import type { Actions, PageServerLoad } from './$types';
import type { Actualite } from '@prisma/client';

export const load = async (event : PageServerLoad) =>{
   
  const actualites : Actualite[] = await prisma.actualite.findMany()
 
  return{
    backlink:'/admin/home',
		active:'actualites',
    actualites
	}
}

export const actions : Actions= {
  delete: action_delete
};

