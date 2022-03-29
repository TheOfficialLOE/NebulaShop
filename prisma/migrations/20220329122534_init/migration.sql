/*
  Warnings:

  - You are about to drop the column `ProductId` on the `votes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_ProductId_fkey`;

-- AlterTable
ALTER TABLE `votes` DROP COLUMN `ProductId`;
