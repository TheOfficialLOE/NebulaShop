/*
  Warnings:

  - You are about to drop the `votes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_CommentId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_UserEmail_fkey`;

-- DropTable
DROP TABLE `votes`;
