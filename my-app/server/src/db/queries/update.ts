import { eq } from 'drizzle-orm';
import { db } from '..';
import { SelectFoodEvent, InsertFoodEvent, foodEventsTable } from '../schema';

export async function updateSubmission(
  id: SelectFoodEvent['id'], 
  data: Partial<Omit<SelectFoodEvent, 'id'>>
) {
  await db
    .update(foodEventsTable)
    .set(data)
    .where(eq(foodEventsTable.id, id));
}