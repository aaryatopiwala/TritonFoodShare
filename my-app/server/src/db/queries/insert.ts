import { db } from '..';
import { InsertSubmission, submissionFormTable } from '../schema';

export async function createSubmission(data: InsertSubmission) {
  await db.insert(submissionFormTable).values(data);
}

