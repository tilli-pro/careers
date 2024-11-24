-- AlterTable
ALTER TABLE "JobPostingQuestion" ADD COLUMN     "longForm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "placeholder" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "question" SET DEFAULT '';
