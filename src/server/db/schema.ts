// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ulti_dashboard_${name}`);

export const preschool_menus = createTable(
  "preschool_menus",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    dayOfWeek: d.varchar('day_of_week', { length: 256 }).notNull(),
    menuDate: d.date('menu_date').unique().notNull(),
    morningSnack: d.varchar('morning_snack', { length: 256 }).notNull(),
    soup: d.varchar({ length: 256 }).notNull(),
    lunch: d.varchar({ length: 256 }).notNull(),
    afternoonSnack: d.varchar('afternoon_snack', { length: 256 }).notNull(),
    createdAt: d
      .timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp('updated_at', { withTimezone: true }).$onUpdate(() => new Date()),
  })
);