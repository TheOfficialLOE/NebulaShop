/*
  Warnings:

  - You are about to drop the `_commentstovotes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CommentId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_commentstovotes` DROP FOREIGN KEY `_commentstovotes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_commentstovotes` DROP FOREIGN KEY `_commentstovotes_ibfk_2`;

-- AlterTable
ALTER TABLE `votes` ADD COLUMN `CommentId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_commentstovotes`;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_CommentId_fkey` FOREIGN KEY (`CommentId`) REFERENCES `Comments`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
