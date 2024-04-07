/*
  Warnings:

  - You are about to drop the column `PictureRelationId` on the `Actualite` table. All the data in the column will be lost.
  - Added the required column `photoPrincipale` to the `Actualite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actualite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "photoPrincipale" TEXT NOT NULL,
    "redacteur" TEXT NOT NULL,
    "tempsLecture" TEXT NOT NULL,
    "descriptionCourte" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Actualite" ("contenu", "createdAt", "descriptionCourte", "id", "redacteur", "tempsLecture", "titre") SELECT "contenu", "createdAt", "descriptionCourte", "id", "redacteur", "tempsLecture", "titre" FROM "Actualite";
DROP TABLE "Actualite";
ALTER TABLE "new_Actualite" RENAME TO "Actualite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
