import { db } from '..';
import { eq, and } from 'drizzle-orm';
import { InsertFoodEvent, InsertReserveEvent, InsertUser, foodEventsTable, reservedEventsTable, usersTable } from '../schema';

export async function createFoodEvent(data: InsertFoodEvent) {
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

// Function to insert a reservation for a user
export async function createReservation(data: InsertReserveEvent) {
  await db.insert(reservedEventsTable).values(data);
}