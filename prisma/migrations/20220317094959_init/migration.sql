-- AlterTable
ALTER TABLE `users` MODIFY `Role` ENUM('SUPER_ADMIN', 'ADMIN', 'USER') NOT NULL DEFAULT 'USER';
