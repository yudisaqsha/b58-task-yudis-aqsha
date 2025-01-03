-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "imagecomment" TEXT;

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "coverPic" TEXT;
