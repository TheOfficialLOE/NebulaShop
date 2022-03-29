/*
  Warnings:

  - A unique constraint covering the columns `[ProductId]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Votes_ProductId_key` ON `Votes`(`ProductId`);
