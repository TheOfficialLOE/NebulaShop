-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `Stage` ENUM('CART', 'PURCHASED') NOT NULL DEFAULT 'CART';
