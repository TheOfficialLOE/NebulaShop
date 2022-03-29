/*
  Warnings:

  - You are about to drop the column `CommentId` on the `votes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `votes` DROP FOREIGN KEY `Votes_CommentId_fkey`;

-- AlterTable
ALTER TABLE `votes` DROP COLUMN `CommentId`;

-- CreateTable
CREATE TABLE `_CommentsToVotes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CommentsToVotes_AB_unique`(`A`, `B`),
    INDEX `_CommentsToVotes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CommentsToVotes` ADD FOREIGN KEY (`A`) REFERENCES `Comments`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommentsToVotes` ADD FOREIGN KEY (`B`) REFERENCES `Votes`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
