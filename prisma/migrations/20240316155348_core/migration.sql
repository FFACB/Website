/*
  Warnings:

  - Added the required column `extension` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Picture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Picture" ("createdAt", "id", "path") SELECT "createdAt", "id", "path" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
