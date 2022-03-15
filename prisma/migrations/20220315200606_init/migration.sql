-- CreateTable
CREATE TABLE `Users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(100) NOT NULL,
    `Name` VARCHAR(100) NULL,
    `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Users_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchases` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Brand` VARCHAR(50) NOT NULL,
    `Name` VARCHAR(200) NOT NULL,
    `Description` VARCHAR(1000) NOT NULL,
    `Info` JSON NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchases` ADD CONSTRAINT `Purchases_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
