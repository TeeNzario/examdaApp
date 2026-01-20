/*
  Warnings:

  - You are about to drop the column `device_id` on the `push_tokens` table. All the data in the column will be lost.
  - Added the required column `deviceId` to the `push_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `push_tokens` DROP COLUMN `device_id`,
    ADD COLUMN `deviceId` VARCHAR(255) NOT NULL;
