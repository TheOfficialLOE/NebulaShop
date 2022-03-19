/*
  Warnings:

  - You are about to drop the column `Stage` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `purchases` DROP COLUMN `Stage`,
    ADD COLUMN `Address` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductId` INTEGER NOT NULL,
    `UserEmail` VARCHAR(191) NOT NULL,
    `Count` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
