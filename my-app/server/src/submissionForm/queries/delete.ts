import { eq } from 'drizzle-orm';
import { db } from '../db';
import { SelectSubmission, submissionFormTable } from '../schema';

export async function deleteSubmission(id: SelectSubmission['id']) {
  await db.delete(submissionFormTable).where(eq(submissionFormTable.id, id));
}
