/*
  Warnings:

  - Added the required column `label` to the `Parametre` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parametre" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
INSERT INTO "new_Parametre" ("key", "value") SELECT "key", "value" FROM "Parametre";
DROP TABLE "Parametre";
ALTER TABLE "new_Parametre" RENAME TO "Parametre";
CREATE UNIQUE INDEX "Parametre_key_key" ON "Parametre"("key");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
