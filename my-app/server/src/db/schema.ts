import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  username: text('username').primaryKey().notNull(),
  password: text('password').notNull(),
});

export const foodEventsTable = sqliteTable('foodEvents', {
  id: integer('id').primaryKey().notNull(),
  orgName: text('orgName').notNull(),
  foodName: text('foodName').notNull(),
  quantity: text('quantity').notNull(),
  locationDescription: text('locationDescriotion').notNull(),
  bigLocation: text('BigLocation').notNull(),
  dietary: text('dietary').notNull(),
  description: text('description').notNull(),
  headcount: integer('headcount').notNull(),
  userId: text('userId').notNull()
  // .references(
  //   () => usersTable.username, { onDelete: 'cascade' }
  // )
});

export const reservedEventsTable = sqliteTable('reservedEvents', {
  eventId: integer('eventId').references(
    () => foodEventsTable.id, { onDelete: 'cascade' }
  ).notNull(),
  userId: text('userId').references(
    () => usersTable.username, { onDelete: 'cascade' }
  ).notNull()
});


export type InsertFoodEvent = typeof foodEventsTable.$inferInsert;
export type SelectFoodEvent = typeof foodEventsTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertReserveEvent = typeof reservedEventsTable.$inferInsert;
export type SelectReserveEvent = typeof reservedEventsTable.$inferSelect;