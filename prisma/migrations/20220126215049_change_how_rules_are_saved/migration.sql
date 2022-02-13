/*
  Warnings:

  - You are about to drop the `Rule` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN "exdates" TEXT;
ALTER TABLE "Event" ADD COLUMN "exrules" TEXT;
ALTER TABLE "Event" ADD COLUMN "rdates" TEXT;
ALTER TABLE "Event" ADD COLUMN "rrules" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rule";
PRAGMA foreign_keys=on;
