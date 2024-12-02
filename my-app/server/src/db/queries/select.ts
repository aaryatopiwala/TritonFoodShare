import { asc, count, eq, getTableColumns, gt, sql, and } from 'drizzle-orm';
import { db } from '..';
import { SelectFoodEvent, SelectReserveEvent, SelectUser, foodEventsTable, reservedEventsTable, usersTable } from '../schema';
import { FoodEvent, User } from '../../types';

// Function to get submission by orgName
export async function getFoodEventByOrgName(
  orgName: SelectFoodEvent['orgName'],
): Promise<
  Array<FoodEvent>
> {
  return db
    .select()
    .from(foodEventsTable)
    .where(eq(foodEventsTable.orgName, orgName));
}

// Function to get submissions with a count of unique diets
export async function getFoodEventWithDietCount(
  page = 1,
  pageSize = 5,
): Promise<
  Array<FoodEvent>
> {
  return db
    .select({
      ...getTableColumns(foodEventsTable),
      dietCount: count(foodEventsTable.dietary),
    })
    .from(foodEventsTable)
    .groupBy(foodEventsTable.id) // Grouping by 'id' for uniqueness
    .orderBy(asc(foodEventsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

// Function to get submissions from the last 24 hours
export async function getFoodEventForLast24Hours(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    orgName: string;
    foodName: string;
  }>
> {
  return db
    .select({
      orgName: foodEventsTable.orgName,
      foodName: foodEventsTable.foodName,
    })
    .from(foodEventsTable)
    .where(gt(foodEventsTable.id, sql`(datetime('now','-24 hour'))`)) // Adjust the condition to a proper timestamp field if necessary
    .orderBy(asc(foodEventsTable.foodName), asc(foodEventsTable.orgName))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getUser(data: SelectUser):
  Promise<Array<User>> {
  return db
    .select()
    .from(usersTable)
    .where(and(
      eq(usersTable.username, data['username']), 
      eq(usersTable.password, data['password'])
    ));
}

export async function getUsername(username: SelectUser['username']) {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));
}

export async function getReservations(userId: SelectReserveEvent['userId']) {
  return db
    .select({eventId: reservedEventsTable.eventId})
    .from(reservedEventsTable)
    .where(eq(reservedEventsTable.userId, userId));
}

export async function getHeadcount(eventId: SelectFoodEvent['id']) {
  return db
    .select({headcount: foodEventsTable.headcount})
    .from(foodEventsTable)
    .where(eq(foodEventsTable.id, eventId));
}

export async function getFoodEventsByUser(
  userId: SelectFoodEvent['userId']
): Promise<Array<SelectFoodEvent>> {
  return db
    .select()
    .from(foodEventsTable)
    .where(eq(foodEventsTable.userId, userId))
}