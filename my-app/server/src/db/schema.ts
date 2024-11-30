import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissionFormTable = sqliteTable('users', {
  id: integer('id').primaryKey().notNull(),
  orgName: text('orgName').notNull(),
  foodName: text('foodName').notNull(),
  quantity: integer('quantity').notNull(),
  locationDescription: text('locationDescriotion').notNull(),
  bigLocation: text('BigLocation').notNull(),
  diet: text('diet').notNull(),

});


export type InsertSubmission = typeof submissionFormTable.$inferInsert;
export type SelectSubmission = typeof submissionFormTable.$inferSelect;

