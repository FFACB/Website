/*
  Warnings:

  - Added the required column `cp` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rue` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "rue" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Contact" ("createdAt", "email", "id", "message", "nom", "prenom", "telephone") SELECT "createdAt", "email", "id", "message", "nom", "prenom", "telephone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
