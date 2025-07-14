ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "dayOfWeek" TO "day_of_week";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "menuDate" TO "menu_date";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "morningSnack" TO "morning_snack";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "afternoonSnack" TO "afternoon_snack";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" DROP CONSTRAINT "ulti_dashboard_preschool_menus_menuDate_unique";--> statement-breakpoint
ALTER TABLE "ulti_dashboard_preschool_menus" ADD CONSTRAINT "ulti_dashboard_preschool_menus_menu_date_unique" UNIQUE("menu_date");