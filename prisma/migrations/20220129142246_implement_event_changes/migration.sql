/*
  Warnings:

  - You are about to drop the `ChoreEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `choreEventId` on the `Chore` table. All the data in the column will be lost.
  - You are about to drop the column `choreEventId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `exdates` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `exrules` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `maxDuration` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rdates` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rrules` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Event` table. All the data in the column will be lost.
  - Added the required column `choreREventId` to the `Chore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Icon` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChoreEvent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "REvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timezone" TEXT,
    "maxDuration" INTEGER,
    "rrules" TEXT NOT NULL DEFAULT '[]',
    "exrules" TEXT,
    "rdates" TEXT,
    "exdates" TEXT,
    "choreREventId" INTEGER,
    "eventREventId" INTEGER,
    CONSTRAINT "REvent_choreREventId_fkey" FOREIGN KEY ("choreREventId") REFERENCES "ChoreREvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "REvent_eventREventId_fkey" FOREIGN KEY ("eventREventId") REFERENCES "EventREvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChoreREvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "EventREvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "choreREventId" INTEGER NOT NULL,
    CONSTRAINT "Chore_choreREventId_fkey" FOREIGN KEY ("choreREventId") REFERENCES "ChoreREvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Chore" ("id", "responsible", "title") SELECT "id", "responsible", "title" FROM "Chore";
DROP TABLE "Chore";
ALTER TABLE "new_Chore" RENAME TO "Chore";
CREATE UNIQUE INDEX "Chore_choreREventId_key" ON "Chore"("choreREventId");
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "eventREventId" INTEGER,
    CONSTRAINT "Event_eventREventId_fkey" FOREIGN KEY ("eventREventId") REFERENCES "EventREvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("id") SELECT "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_eventREventId_key" ON "Event"("eventREventId");
CREATE TABLE "new_Icon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "faclass" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "choreId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "Icon_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "Chore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Icon_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Icon" ("choreId", "color", "faclass", "id") SELECT "choreId", "color", "faclass", "id" FROM "Icon";
DROP TABLE "Icon";
ALTER TABLE "new_Icon" RENAME TO "Icon";
CREATE UNIQUE INDEX "Icon_choreId_key" ON "Icon"("choreId");
CREATE UNIQUE INDEX "Icon_eventId_key" ON "Icon"("eventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "REvent_choreREventId_key" ON "REvent"("choreREventId");

-- CreateIndex
CREATE UNIQUE INDEX "REvent_eventREventId_key" ON "REvent"("eventREventId");
