/*
  Warnings:

  - The values [SUPER_ADMIN] on the enum `Users_Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `Remaining` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `Remaining` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `Role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
