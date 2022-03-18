/*
  Warnings:

  - Added the required column `Price` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `Price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `Count` INTEGER NOT NULL DEFAULT 1;
