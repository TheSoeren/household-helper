/*
  Warnings:

  - You are about to drop the column `iconId` on the `Chore` table. All the data in the column will be lost.
  - Added the required column `choreId` to the `Icon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Icon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "faclass" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "choreId" TEXT NOT NULL,
    CONSTRAINT "Icon_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "Chore" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Icon" ("color", "faclass", "id") SELECT "color", "faclass", "id" FROM "Icon";
DROP TABLE "Icon";
ALTER TABLE "new_Icon" RENAME TO "Icon";
CREATE UNIQUE INDEX "Icon_choreId_key" ON "Icon"("choreId");
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "timezone" TEXT,
    "maxDuration" INTEGER,
    "rrules" TEXT,
    "exrules" TEXT,
    "rdates" TEXT,
    "exdates" TEXT,
    "choreEventId" INTEGER,
    CONSTRAINT "Event_choreEventId_fkey" FOREIGN KEY ("choreEventId") REFERENCES "ChoreEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("choreEventId", "data", "exdates", "exrules", "id", "maxDuration", "rdates", "rrules", "timezone") SELECT "choreEventId", "data", "exdates", "exrules", "id", "maxDuration", "rdates", "rrules", "timezone" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_choreEventId_key" ON "Event"("choreEventId");
CREATE TABLE "new_Chore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "choreEventId" INTEGER NOT NULL,
    CONSTRAINT "Chore_choreEventId_fkey" FOREIGN KEY ("choreEventId") REFERENCES "ChoreEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chore" ("choreEventId", "id", "responsible", "title") SELECT "choreEventId", "id", "responsible", "title" FROM "Chore";
DROP TABLE "Chore";
ALTER TABLE "new_Chore" RENAME TO "Chore";
CREATE UNIQUE INDEX "Chore_choreEventId_key" ON "Chore"("choreEventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
