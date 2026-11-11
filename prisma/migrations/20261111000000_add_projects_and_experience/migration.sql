-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `category` VARCHAR(60) NOT NULL,
    `description` TEXT NOT NULL,
    `live_url` VARCHAR(500) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_sort_order_idx`(`sort_order`),
    INDEX `projects_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `r2_key` VARCHAR(500) NOT NULL,
    `alt` VARCHAR(300) NOT NULL,
    `caption` VARCHAR(300) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `project_images_project_id_sort_order_idx`(`project_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `label` VARCHAR(60) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `project_links_project_id_sort_order_idx`(`project_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_tags` (
    `project_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `project_tags_tag_id_idx`(`tag_id`),
    PRIMARY KEY (`project_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `role` VARCHAR(200) NOT NULL,
    `company` VARCHAR(200) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `is_current` BOOLEAN NOT NULL DEFAULT false,
    `group` ENUM('full-time', 'non-full-time') NOT NULL,
    `employment_type` ENUM('Full time', 'Internship', 'Contract', 'Part time', 'Community') NOT NULL,
    `location` VARCHAR(200) NULL,
    `description` VARCHAR(500) NOT NULL,
    `url` VARCHAR(500) NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `experience_slug_key`(`slug`),
    INDEX `experience_group_start_date_idx`(`group`, `start_date`),
    INDEX `experience_sort_order_idx`(`sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experience_id` INTEGER NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NULL,
    `is_current` BOOLEAN NOT NULL DEFAULT false,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `experience_roles_experience_id_sort_order_idx`(`experience_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_highlights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experience_id` INTEGER NOT NULL,
    `role_id` INTEGER NULL,
    `text` TEXT NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `experience_highlights_experience_id_sort_order_idx`(`experience_id`, `sort_order`),
    INDEX `experience_highlights_role_id_sort_order_idx`(`role_id`, `sort_order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience_tags` (
    `experience_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `experience_tags_tag_id_idx`(`tag_id`),
    PRIMARY KEY (`experience_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project_images` ADD CONSTRAINT `project_images_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_links` ADD CONSTRAINT `project_links_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tags` ADD CONSTRAINT `project_tags_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_tags` ADD CONSTRAINT `project_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_roles` ADD CONSTRAINT `experience_roles_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_highlights` ADD CONSTRAINT `experience_highlights_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_highlights` ADD CONSTRAINT `experience_highlights_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `experience_roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_tags` ADD CONSTRAINT `experience_tags_experience_id_fkey` FOREIGN KEY (`experience_id`) REFERENCES `experience`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience_tags` ADD CONSTRAINT `experience_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

