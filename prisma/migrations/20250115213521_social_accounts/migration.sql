/*
  Warnings:

  - The primary key for the `SocialAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link` on the `SocialAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type,value]` on the table `SocialAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value,userId]` on the table `SocialAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SocialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialAccount" DROP CONSTRAINT "SocialAccount_pkey",
DROP COLUMN "link",
ADD COLUMN     "type" "SocialLink" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "SocialAccount_pkey" PRIMARY KEY ("type", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_type_value_key" ON "SocialAccount"("type", "value");

-- CreateIndex
CREATE UNIQUE INDEX "SocialAccount_value_userId_key" ON "SocialAccount"("value", "userId");

-- AddForeignKey
ALTER TABLE "SocialAccount" ADD CONSTRAINT "SocialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
