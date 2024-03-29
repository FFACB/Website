/*
  Warnings:

  - Added the required column `path` to the `PictureRelation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PictureRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" TEXT NOT NULL,
    "quality" INTEGER NOT NULL,
    "resolution" INTEGER,
    "pictureId" TEXT NOT NULL,
    CONSTRAINT "PictureRelation_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PictureRelation" ("createdAt", "id", "pictureId", "quality", "resolution") SELECT "createdAt", "id", "pictureId", "quality", "resolution" FROM "PictureRelation";
DROP TABLE "PictureRelation";
ALTER TABLE "new_PictureRelation" RENAME TO "PictureRelation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
