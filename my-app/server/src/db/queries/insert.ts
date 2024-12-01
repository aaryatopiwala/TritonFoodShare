import { db } from '..';
import { eq, and } from 'drizzle-orm';
import { InsertFoodEvent, InsertUser, foodEventsTable, usersTable } from '../schema';

export async function createSubmission(data: InsertFoodEvent) {
  await db.insert(foodEventsTable).values(data);
}

// Function to create a new user
export async function createUser(data: InsertUser) {
  const { username, password } = data as {
    username: InsertUser['username'],
    password: InsertUser['password']
  }
  
  await db.insert(usersTable)
  .values(data)
  .onConflictDoNothing();
}