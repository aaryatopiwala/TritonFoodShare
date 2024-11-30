CREATE TABLE `foodEvents` (
	`id` integer PRIMARY KEY NOT NULL,
	`orgName` text NOT NULL,
	`foodName` text NOT NULL,
	`quantity` text NOT NULL,
	`locationDescriotion` text NOT NULL,
	`BigLocation` text NOT NULL,
	`dietary` text NOT NULL,
	`description` text NOT NULL,
	`headcount` integer NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reservedEvents` (
	`eventId` integer NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`eventId`) REFERENCES `foodEvents`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`username` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("username", "password") SELECT "username", "password" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;