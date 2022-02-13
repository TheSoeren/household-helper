/*
  Warnings:

  - You are about to drop the `Chores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chores";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Chore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "dueDay" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "responsible" TEXT NOT NULL
);
