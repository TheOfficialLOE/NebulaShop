/*
  Warnings:

  - You are about to drop the column `Brand` on the `products` table. All the data in the column will be lost.
  - Added the required column `BrandName` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `Brand`,
    ADD COLUMN `BrandName` VARCHAR(191) NOT NULL,
    ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` MODIFY `Role` ENUM('SUPER_ADMIN', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Brands` (
    `Name` VARCHAR(50) NOT NULL,
    `BrandDetails` VARCHAR(255) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedBy` INTEGER NOT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_BrandName_fkey` FOREIGN KEY (`BrandName`) REFERENCES `Brands`(`Name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brands` ADD CONSTRAINT `Brands_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `Users`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
