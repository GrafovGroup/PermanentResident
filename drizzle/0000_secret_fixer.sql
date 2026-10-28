CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`enquiry_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`enquiry_id`) REFERENCES `enquiries`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_audit_enquiry` ON `audit` (`enquiry_id`);--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`payload` text NOT NULL,
	`handling` integer NOT NULL,
	`sharing` integer NOT NULL,
	`marketing` integer NOT NULL,
	`consent_version` text NOT NULL,
	`source` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`partner_id` text,
	`acceptance` text DEFAULT 'not_requested' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enquiries_request_id_unique` ON `enquiries` (`request_id`);--> statement-breakpoint
CREATE INDEX `idx_enquiries_status_created` ON `enquiries` (`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `partners` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`regulator` text NOT NULL,
	`licence` text NOT NULL,
	`verification_url` text NOT NULL,
	`verified_at` text,
	`locations` text NOT NULL,
	`languages` text NOT NULL,
	`practice_areas` text NOT NULL,
	`services` text NOT NULL,
	`active` integer DEFAULT 0 NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
