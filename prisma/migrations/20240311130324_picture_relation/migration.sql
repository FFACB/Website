/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Actualite` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PictureRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quality" INTEGER NOT NULL,
    "resolution" INTEGER NOT NULL,
    "pictureId" TEXT NOT NULL,
    CONSTRAINT "PictureRelation_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actualite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "PictureRelationId" TEXT,
    "redacteur" TEXT NOT NULL,
    "tempsLecture" TEXT NOT NULL,
    "descriptionCourte" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Actualite_PictureRelationId_fkey" FOREIGN KEY ("PictureRelationId") REFERENCES "PictureRelation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Actualite" ("contenu", "createdAt", "descriptionCourte", "id", "redacteur", "tempsLecture", "titre") SELECT "contenu", "createdAt", "descriptionCourte", "id", "redacteur", "tempsLecture", "titre" FROM "Actualite";
DROP TABLE "Actualite";
ALTER TABLE "new_Actualite" RENAME TO "Actualite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
