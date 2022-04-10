-- AlterTable
ALTER TABLE `comments` MODIFY `Stage` ENUM('Proccessing', 'Rejected', 'Accepted') NOT NULL DEFAULT 'Proccessing';
