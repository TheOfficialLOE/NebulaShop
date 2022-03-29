/*
  Warnings:

  - A unique constraint covering the columns `[CommentId]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Votes_CommentId_key` ON `Votes`(`CommentId`);
