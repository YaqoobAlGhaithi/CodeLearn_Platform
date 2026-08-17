CREATE TABLE `forumComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`topicId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `forumComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forumTopics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'general',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `forumTopics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `achievements` MODIFY COLUMN `icon` varchar(64);--> statement-breakpoint
ALTER TABLE `achievements` MODIFY COLUMN `points` int NOT NULL DEFAULT 10;--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `icon` varchar(64);--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `color` varchar(64);--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `order` int NOT NULL;--> statement-breakpoint
ALTER TABLE `lessons` MODIFY COLUMN `order` int NOT NULL;--> statement-breakpoint
ALTER TABLE `userProgress` MODIFY COLUMN `lessonId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `userProgress` MODIFY COLUMN `isCompleted` int NOT NULL;--> statement-breakpoint
ALTER TABLE `achievements` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `courses` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `lessons` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `userProgress` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `userProgress` DROP COLUMN `updatedAt`;