import { eq } from 'drizzle-orm';
import { db } from '..';
import { SelectSubmission, submissionFormTable } from '../schema';

export async function updateSubmission(
  id: SelectSubmission['id'], 
  data: Partial<Omit<SelectSubmission, 'id'>>
) {
  await db
    .update(submissionFormTable)
    .set(data)
    .where(eq(submissionFormTable.id, id));
}
