/*
  Warnings:

  - You are about to drop the `AssetsCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `AssetsCategoriesId` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `assetCategoryId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AssetsCategories_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssetsCategories";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AssetCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assetCategoryId" TEXT NOT NULL,
    CONSTRAINT "Asset_assetCategoryId_fkey" FOREIGN KEY ("assetCategoryId") REFERENCES "AssetCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("createdAt", "extension", "filename", "id", "originalFilename", "path") SELECT "createdAt", "extension", "filename", "id", "originalFilename", "path" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AssetCategory_name_key" ON "AssetCategory"("name");
