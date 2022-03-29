/*
  Warnings:

  - Added the required column `ProductId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `votes` ADD COLUMN `ProductId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
