-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Icon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "faclass" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "choreId" TEXT,
    "eventId" TEXT,
    CONSTRAINT "Icon_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "Chore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Icon_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Icon" ("choreId", "color", "eventId", "faclass", "id") SELECT "choreId", "color", "eventId", "faclass", "id" FROM "Icon";
DROP TABLE "Icon";
ALTER TABLE "new_Icon" RENAME TO "Icon";
CREATE UNIQUE INDEX "Icon_choreId_key" ON "Icon"("choreId");
CREATE UNIQUE INDEX "Icon_eventId_key" ON "Icon"("eventId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
