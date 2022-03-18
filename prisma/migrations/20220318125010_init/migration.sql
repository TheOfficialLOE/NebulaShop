/*
  Warnings:

  - You are about to drop the column `UserId` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `UserEmail` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `Purchases_UserId_fkey`;

-- AlterTable
ALTER TABLE `purchases` DROP COLUMN `UserId`,
    ADD COLUMN `UserEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE RESTRICT ON UPDATE CASCADE;
