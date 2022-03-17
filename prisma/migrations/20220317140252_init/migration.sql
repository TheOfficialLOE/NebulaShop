-- DropForeignKey
ALTER TABLE `brands` DROP FOREIGN KEY `Brands_CreatedBy_fkey`;

-- AlterTable
ALTER TABLE `brands` MODIFY `CreatedBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Brands` ADD CONSTRAINT `Brands_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `Users`(`Email`) ON DELETE RESTRICT ON UPDATE CASCADE;
