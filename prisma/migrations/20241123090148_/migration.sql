/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `JobLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `JobLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobLocation" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_slug_key" ON "Department"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JobLocation_slug_key" ON "JobLocation"("slug");
