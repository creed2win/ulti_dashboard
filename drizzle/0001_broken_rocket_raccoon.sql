ALTER TABLE "ulti_dashboard_post" RENAME TO "ulti_dashboard_preschool_menus";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "name" TO "dayOfWeek";--> statement-breakpoint
DROP INDEX "name_idx";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD COLUMN "menuDate" date;--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD COLUMN "morningSnack" varchar(256);--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD COLUMN "soup" varchar(256);--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD COLUMN "lunch" varchar(256);--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD COLUMN "afternoonSnack" varchar(256);