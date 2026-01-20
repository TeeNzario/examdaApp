-- CreateTable "push_tokens"
CREATE TABLE `push_tokens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `device_id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  INDEX `idx_push_token_exam_id`(`exam_id`),
  INDEX `idx_push_token_token`(`token`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `push_tokens` ADD CONSTRAINT `fk_push_token_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
