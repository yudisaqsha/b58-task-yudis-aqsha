/*
  Warnings:

  - You are about to drop the column `imagecomment` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "imagecomment",
ADD COLUMN     "image" TEXT;
