import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const submissionFormTable = sqliteTable('foodEvents', {
  id: integer('id').primaryKey().notNull(),
  orgName: text('orgName').notNull(),
  foodName: text('foodName').notNull(),
  quantity: text('quantity').notNull(),
  locationDescription: text('locationDescriotion').notNull(),
  bigLocation: text('BigLocation').notNull(),
  dietary: text('dietary').notNull(),
  description: text('description').notNull(),
  headcount: integer('headcount').notNull(),
});


export type InsertSubmission = typeof submissionFormTable.$inferInsert;
export type SelectSubmission = typeof submissionFormTable.$inferSelect;

