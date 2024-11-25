PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`orgName` text NOT NULL,
	`foodName` text NOT NULL,
	`quantity` integer NOT NULL,
	`locationDescriotion` text NOT NULL,
	`BigLocation` text NOT NULL,
	`diet` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "orgName", "foodName", "quantity", "locationDescriotion", "BigLocation", "diet") SELECT "id", "orgName", "foodName", "quantity", "locationDescriotion", "BigLocation", "diet" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;