
import { fail, redirect, type Actions } from '@sveltejs/kit'
import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import { IsPhoto } from '$lib/client/utils/type.js';
import { writeFileSync,existsSync, mkdirSync } from 'fs';
import type { Actualite } from '@prisma/client';

const FULL_UPLOAD_PATH = `uploads/actualites/`
const PARTIAL_UPLOAD_PATH = "/uploads/actualites/"


export const load = async (event) =>{
  
  const { params } = event
  const { idActualite = '' } = params

  let actualite : Actualite | null = await prisma.actualite.findUnique({
    where: {
      id: idActualite
    }
  })


  return {
    backlink:'/admin/actualites',
		active:'actualite',
    actualite
  }
}



export const actions : Actions = {

 

  create: async (event) => {
    
 
    const {request} = event

    const data = Object.fromEntries(await request.formData());

    const authRequest = auth.handleRequest(event);
    const session = await authRequest.validate();
  
    if (!session ) {
      return fail(400, {
        data: data,
        errorMsg: "Vous n'etes pas connecté",
      });
    }

    let { id, titre, redacteur, tempsLecture, descriptionCourte, contenu, photo, photoFile } = data

    
    if ( id != null &&  id != undefined &&  typeof id !== 'string') {
      return fail(400, {
        data: data,
        errorMsg: "❌ L'Id doit être null ou une chaine de caractère",
      });
    }

    if ( titre == null || typeof titre !== 'string' || titre.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le titre ne doit pas être vide",
      });
    }

    if (redacteur == null || typeof redacteur !== 'string' || redacteur.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le redacteur ne doit pas être vide",
      });
    }

    if (tempsLecture == null || typeof tempsLecture !== 'string' || tempsLecture.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le temps de lecture ne doit pas être vide",
      });
    }

    if (descriptionCourte == null || typeof descriptionCourte !== 'string' || descriptionCourte.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ La description courte ne doit pas être vide",
      });
    }

    if ( photo != null &&  photo != undefined &&  typeof photo !== 'string') {
      return fail(400, {
        data: data,
        errorMsg: "❌ La photo doit être null ou une chaine de caractère",
      });
    }

    
    if ( contenu != null &&  contenu != undefined &&  typeof contenu !== 'string') {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le contenu doit être null ou une chaine de caractère",
      });
    }

    try {

      
      if (IsPhoto(photoFile) && photoFile instanceof File) {



        if (!existsSync(FULL_UPLOAD_PATH)){
          mkdirSync(FULL_UPLOAD_PATH);
        }

        const fsPhotoPath = `${FULL_UPLOAD_PATH}${photoFile.name}`
        const dbPhotoPath = `${PARTIAL_UPLOAD_PATH}${photoFile.name}`



        writeFileSync(fsPhotoPath, Buffer.from(await photoFile.arrayBuffer()))
        photo = dbPhotoPath

      }


      

      const actualite = await prisma.actualite.upsert({
        where: {
          id 
        },
        create: {
          titre,
          photo,
          redacteur,
          tempsLecture,
          descriptionCourte,
          contenu,
        },
        update: {
          titre,
          photo,
          redacteur,
          tempsLecture,
          descriptionCourte,
          contenu,
        },
      })

      return {
        data: actualite,
        errorMsg: undefined,
      };


    } catch (err) {

      return fail(400, {
        data: data,
        errorMsg: "❌ Une erreur est survenue lors de l'enregistrement de l'actualité",
      });

    }



  },


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

    const { id = null } = data

    if (id == null || typeof id !== 'string' ||  id == "") {
      return fail(400, {
        data: data,
        errorMsg: "❌ L'identifiant de l'actualité est requis",
      });
    }

    try {

      const actualiteToDelete = await prisma.actualite.findUnique({
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

      await prisma.actualite.delete({
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

