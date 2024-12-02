import { eq, and } from 'drizzle-orm';
import { db } from '..';
import { SelectFoodEvent, SelectReserveEvent, foodEventsTable, reservedEventsTable } from '../schema';

export async function deleteFoodEvent(id: SelectFoodEvent['id']) {
  await db.delete(foodEventsTable).where(eq(foodEventsTable.id, id));
}

export async function deleteReservation(data: SelectReserveEvent) {
  await db.delete(reservedEventsTable).where(and(
    eq(reservedEventsTable.eventId, data['eventId']), 
    eq(reservedEventsTable.userId, data['userId'])
  ));
}