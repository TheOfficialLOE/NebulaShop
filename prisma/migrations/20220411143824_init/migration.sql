/*
  Warnings:

  - You are about to alter the column `Stage` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `Enum("comments_Stage")` to `Enum("Comments_Stage")`.

*/
-- AlterTable
ALTER TABLE `comments` MODIFY `Stage` ENUM('PROCESSING', 'REJECTED', 'ACCEPTED') NOT NULL DEFAULT 'PROCESSING';
