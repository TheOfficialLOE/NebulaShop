/*
  Warnings:

  - You are about to drop the column `Dislikes` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Likes` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comments` DROP COLUMN `Dislikes`,
    DROP COLUMN `Likes`;

-- CreateTable
CREATE TABLE `Votes` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserEmail` VARCHAR(191) NOT NULL,
    `ProductId` INTEGER NOT NULL,
    `CommentId` INTEGER NOT NULL,
    `Type` ENUM('LIKE', 'DISLIKE') NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_CommentId_fkey` FOREIGN KEY (`CommentId`) REFERENCES `Comments`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
