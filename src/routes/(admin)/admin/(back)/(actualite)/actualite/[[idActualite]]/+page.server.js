import { fail, redirect } from '@sveltejs/kit'
import { IsJsonString, IsEmptyFile, IsString, IsStringNotEmpty, IsObject, IsPhoto, IsFile, GetExtension } from "$lib/utils/type";

import bcrypt from 'bcrypt'
import { db } from '$lib/database'
import { writeFileSync,existsSync, mkdirSync } from 'fs';

const FULL_UPLOAD_PATH = `uploads/actualites/`
const PARTIAL_UPLOAD_PATH = "/uploads/actualites/"


export const load = async (serverloadEvent) => {

  let { locals } = serverloadEvent;
  if (!locals.user) {
    throw redirect(302, '/admin/login')
  }

  const { params } = serverloadEvent
  const { idActualite = '' } = params
  let actualite = await db.actualite.findUnique({
    where: {
      id: idActualite
    }
  })

  actualite = actualite == null ? {} : actualite

  return {
    actualite
  }
}


export const actions = {

 

  create: async ({ request, locals}) => {
    
 
    const data = Object.fromEntries(await request.formData());
    if (!locals.user || locals.user.role == null || locals.user.role != "ADMIN" ) {
      return fail(400, {
        data: data,
        errorMsg: "Vous n'etes pas connecté",
      });
    }

    let { id, titre, redacteur, tempsLecture, descriptionCourte, contenu, photo, photoFile } = data

    if (titre.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le titre ne doit pas être vide",
      });
    }

    if (redacteur.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le redacteur ne doit pas être vide",
      });
    }

    if (tempsLecture.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ Le temps de lecture ne doit pas être vide",
      });
    }

    if (descriptionCourte.length < 1) {
      return fail(400, {
        data: data,
        errorMsg: "❌ La description courte ne doit pas être vide",
      });
    }

    try {

      
      if (IsPhoto(photoFile)) {

        if (!existsSync(FULL_UPLOAD_PATH)){
          mkdirSync(FULL_UPLOAD_PATH);
        }

        const fsPhotoPath = `${FULL_UPLOAD_PATH}${photoFile.name}`
        const dbPhotoPath = `${PARTIAL_UPLOAD_PATH}${photoFile.name}`



        writeFileSync(fsPhotoPath, Buffer.from(await photoFile.arrayBuffer()))
        photo = dbPhotoPath

      }

      const actualite = await db.actualite.upsert({
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

