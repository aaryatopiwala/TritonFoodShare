import { db } from '..';
import { InsertFoodEvent, foodEventsTable } from '../schema';

export async function createSubmission(data: InsertFoodEvent) {
  await db.insert(foodEventsTable).values(data);
}

