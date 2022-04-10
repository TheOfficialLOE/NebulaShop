/*
  Warnings:

  - Added the required column `Stage` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `Stage` ENUM('Proccessing', 'Rejected', 'Accepted') NOT NULL;
