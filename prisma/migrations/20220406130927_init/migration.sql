-- DropForeignKey
ALTER TABLE `brands` DROP FOREIGN KEY `Brands_CreatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_UserEmail_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_UserEmail_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_BrandName_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_CreatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `Purchases_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `Purchases_UserEmail_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_CommentId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_UserEmail_fkey`;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_BrandName_fkey` FOREIGN KEY (`BrandName`) REFERENCES `Brands`(`Name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Brands` ADD CONSTRAINT `Brands_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_UserEmail_fkey` FOREIGN KEY (`UserEmail`) REFERENCES `Users`(`Email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_CommentId_fkey` FOREIGN KEY (`CommentId`) REFERENCES `Comments`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
