-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parametre" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Actualite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT '',
    "redacteur" TEXT NOT NULL,
    "tempsLecture" TEXT NOT NULL,
    "descriptionCourte" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Resolution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    CONSTRAINT "Resolution_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Parametre_key_key" ON "Parametre"("key");
