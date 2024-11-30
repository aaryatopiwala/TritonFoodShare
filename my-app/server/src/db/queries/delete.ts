import { eq } from 'drizzle-orm';
import { db } from '..';
import { SelectFoodEvent, foodEventsTable } from '../schema';

export async function deleteSubmission(id: SelectFoodEvent['id']) {
  await db.delete(foodEventsTable).where(eq(foodEventsTable.id, id));
}
