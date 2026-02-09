-- CreateTable
CREATE TABLE "CooperativeRegion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cooperative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cooperativeRegionId" TEXT NOT NULL,
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
    CONSTRAINT "Cooperative_cooperativeRegionId_fkey" FOREIGN KEY ("cooperativeRegionId") REFERENCES "CooperativeRegion" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
