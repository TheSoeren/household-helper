-- AlterTable
ALTER TABLE "Chore" ADD COLUMN     "allDay" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "allDay" BOOLEAN NOT NULL DEFAULT false;
