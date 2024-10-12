/*
  Warnings:

  - You are about to drop the column `pictures` on the `Product` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "pictures",
ADD COLUMN     "imageUrls" TEXT[],
ALTER COLUMN "sizes" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;
