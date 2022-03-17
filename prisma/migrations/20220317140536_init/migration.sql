/*
  Warnings:

  - Added the required column `CreatedBy` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `CreatedBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `Users`(`Email`) ON DELETE RESTRICT ON UPDATE CASCADE;
