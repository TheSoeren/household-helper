/*
  Warnings:

  - You are about to drop the column `dueDay` on the `Chore` table. All the data in the column will be lost.
  - You are about to drop the column `iconColor` on the `Chore` table. All the data in the column will be lost.
  - You are about to drop the column `iconName` on the `Chore` table. All the data in the column will be lost.
  - Added the required column `choreEventId` to the `Chore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconId` to the `Chore` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Icon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "faclass" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "timezone" TEXT,
    "maxDuration" INTEGER,
    "choreEventId" INTEGER NOT NULL,
    CONSTRAINT "Event_choreEventId_fkey" FOREIGN KEY ("choreEventId") REFERENCES "ChoreEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rrulesId" TEXT NOT NULL,
    "exrulesId" TEXT NOT NULL,
    "rdatesId" TEXT NOT NULL,
    "exdatesId" TEXT NOT NULL,
    CONSTRAINT "Rule_rrulesId_fkey" FOREIGN KEY ("rrulesId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rule_exrulesId_fkey" FOREIGN KEY ("exrulesId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rule_rdatesId_fkey" FOREIGN KEY ("rdatesId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rule_exdatesId_fkey" FOREIGN KEY ("exdatesId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChoreEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "iconId" INTEGER NOT NULL,
    "choreEventId" INTEGER NOT NULL,
    CONSTRAINT "Chore_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chore_choreEventId_fkey" FOREIGN KEY ("choreEventId") REFERENCES "ChoreEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chore" ("id", "responsible", "title") SELECT "id", "responsible", "title" FROM "Chore";
DROP TABLE "Chore";
ALTER TABLE "new_Chore" RENAME TO "Chore";
CREATE UNIQUE INDEX "Chore_iconId_key" ON "Chore"("iconId");
CREATE UNIQUE INDEX "Chore_choreEventId_key" ON "Chore"("choreEventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Event_choreEventId_key" ON "Event"("choreEventId");
