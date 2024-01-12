

import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import { IsPhoto } from '$lib/client/utils/type.js';
import { writeFileSync,existsSync, mkdirSync } from 'fs';
import type { Contact } from '@prisma/client';
import {  action_delete } from '../../actions.js';
import type { Actions } from '../$types.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) =>{
  
  const { params } = event
  const { id = '' } = params

  let contact : Contact | null = await prisma.contact.findUnique({
    where: {
      id
    }
  })

  if(contact == null){
    throw redirect(301,'/admin/contacts')
  }

  return {
    backlink:'/admin/contacts',
		active:'contacts',
    contact: contact as Contact
  }
}



export const actions : Actions = {
  delete: action_delete
};

