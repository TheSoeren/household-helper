/*
  Warnings:

  - You are about to drop the `ChoreREvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventREvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `REvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `choreREventId` on the `Chore` table. All the data in the column will be lost.
  - You are about to drop the column `eventREventId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `vEvent` to the `Chore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vEvent` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "REvent_eventREventId_key";

-- DropIndex
DROP INDEX "REvent_choreREventId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ChoreREvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EventREvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "REvent";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "responsible" TEXT NOT NULL,
    "vEvent" TEXT NOT NULL
);
INSERT INTO "new_Chore" ("id", "responsible", "title") SELECT "id", "responsible", "title" FROM "Chore";
DROP TABLE "Chore";
ALTER TABLE "new_Chore" RENAME TO "Chore";
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "responsible" TEXT NOT NULL,
    "vEvent" TEXT NOT NULL
);
INSERT INTO "new_Event" ("description", "id", "title") SELECT "description", "id", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
