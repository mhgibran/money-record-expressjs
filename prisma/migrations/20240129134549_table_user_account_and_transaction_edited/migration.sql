/*
  Warnings:

  - You are about to drop the `icons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_image_id_fkey`;

-- DropTable
DROP TABLE `icons`;

-- CreateTable
CREATE TABLE `account_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(120) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `account_images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
