/*
  Warnings:

  - You are about to drop the column `descriptionCourte` on the `Actualite` table. All the data in the column will be lost.
  - You are about to drop the column `fileAssetId_Externe` on the `Actualite` table. All the data in the column will be lost.
  - You are about to drop the column `redacteur` on the `Actualite` table. All the data in the column will be lost.
  - You are about to drop the column `tempsLecture` on the `Actualite` table. All the data in the column will be lost.
  - You are about to drop the column `videoAssetId_Slide` on the `Actualite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CooperativeRegion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Actualite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actualite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "pictureAssetId_Principale" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Actualite" ("contenu", "createdAt", "id", "pictureAssetId_Principale", "titre") SELECT "contenu", "createdAt", "id", "pictureAssetId_Principale", "titre" FROM "Actualite";
DROP TABLE "Actualite";
ALTER TABLE "new_Actualite" RENAME TO "Actualite";
CREATE TABLE "new_Cooperative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cooperativeRegionId" TEXT NOT NULL,
    "siren" TEXT NOT NULL DEFAULT '',
    "adresse" TEXT NOT NULL DEFAULT '',
    "infoComplementaire" TEXT NOT NULL DEFAULT '',
    "cp" INTEGER NOT NULL DEFAULT 0,
    "ville" TEXT NOT NULL DEFAULT '',
    "siteInternet" TEXT NOT NULL DEFAULT '',
    "adresseMail" TEXT NOT NULL DEFAULT '',
    "telephone" TEXT NOT NULL DEFAULT '',
    "contact1Nom" TEXT NOT NULL DEFAULT '',
    "contact1telephone" TEXT NOT NULL DEFAULT '',
    "contact1Email" TEXT NOT NULL DEFAULT '',
    "contact2Nom" TEXT NOT NULL DEFAULT '',
    "contact2telephone" TEXT NOT NULL DEFAULT '',
    "contact2Email" TEXT NOT NULL DEFAULT '',
    "latitude" TEXT NOT NULL DEFAULT '0',
    "longitude" TEXT NOT NULL DEFAULT '0',
    "pictureAsset1Id_Principale" TEXT NOT NULL DEFAULT '',
    "pictureAsset2Id_Principale" TEXT NOT NULL DEFAULT '',
    "pictureAsset3Id_Principale" TEXT NOT NULL DEFAULT '',
    "lienVideo" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Cooperative_cooperativeRegionId_fkey" FOREIGN KEY ("cooperativeRegionId") REFERENCES "CooperativeRegion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cooperative" ("adresse", "adresseMail", "contact1Email", "contact1Nom", "contact1telephone", "contact2Email", "contact2Nom", "contact2telephone", "cooperativeRegionId", "cp", "createdAt", "id", "infoComplementaire", "latitude", "longitude", "name", "siren", "siteInternet", "telephone", "ville") SELECT "adresse", "adresseMail", "contact1Email", "contact1Nom", "contact1telephone", "contact2Email", "contact2Nom", "contact2telephone", "cooperativeRegionId", "cp", "createdAt", "id", "infoComplementaire", "latitude", "longitude", "name", "siren", "siteInternet", "telephone", "ville" FROM "Cooperative";
DROP TABLE "Cooperative";
ALTER TABLE "new_Cooperative" RENAME TO "Cooperative";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "CooperativeRegion_name_key" ON "CooperativeRegion"("name");
