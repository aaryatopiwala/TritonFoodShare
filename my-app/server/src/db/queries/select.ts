import { asc, count, eq, getTableColumns, gt, sql, and } from 'drizzle-orm';
import { db } from '..';
import { SelectFoodEvent, SelectUser, foodEventsTable, usersTable } from '../schema';
import { FoodEvent, User } from '../../types';

// Function to get submission by orgName
export async function getSubmissionByOrgName(
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
export async function getSubmissionsWithDietCount(
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
export async function getSubmissionsForLast24Hours(
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

export async function getUser(username: SelectUser['username'], password: SelectUser['password']):
  Promise<Array<User>> {
  return db
    .select()
    .from(usersTable)
    .where(and(
      eq(usersTable.username, username), 
      eq(usersTable.password, password)
    ));
}