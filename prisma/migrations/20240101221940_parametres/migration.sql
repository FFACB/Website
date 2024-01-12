-- CreateTable
CREATE TABLE "Parametre" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Parametre_key_key" ON "Parametre"("key");
