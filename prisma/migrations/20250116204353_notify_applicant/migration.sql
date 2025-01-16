-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "notifiedEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notifiedWeb" BOOLEAN NOT NULL DEFAULT false;
