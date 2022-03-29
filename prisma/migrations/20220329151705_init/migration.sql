/*
  Warnings:

  - A unique constraint covering the columns `[UserEmail]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Votes_UserEmail_key` ON `Votes`(`UserEmail`);
