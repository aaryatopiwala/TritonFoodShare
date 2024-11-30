import { asc, count, eq, getTableColumns, gt, sql } from 'drizzle-orm';
import { db } from '..';
import { SelectSubmission, submissionFormTable } from '../schema';

// Function to get submission by orgName
export async function getSubmissionByOrgName(
  orgName: SelectSubmission['orgName'],
): Promise<
  Array<{
    id: number;
    orgName: string;
    foodName: string;
    quantity: string;
    locationDescription: string;
    bigLocation: string;
    dietary: string;
    description: string;
    headcount: number;
  }>
> {
  return db
    .select()
    .from(submissionFormTable)
    .where(eq(submissionFormTable.orgName, orgName));
}

// Function to get submissions with a count of unique diets
export async function getSubmissionsWithDietCount(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    dietCount: number;
    id: number;
    orgName: string;
    foodName: string;
    quantity: string;
    locationDescription: string;
    bigLocation: string;
    dietary: string;
    description: string;
    headcount: number;
  }>
> {
  return db
    .select({
      ...getTableColumns(submissionFormTable),
      dietCount: count(submissionFormTable.dietary),
    })
    .from(submissionFormTable)
    .groupBy(submissionFormTable.id) // Grouping by 'id' for uniqueness
    .orderBy(asc(submissionFormTable.id))
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
      orgName: submissionFormTable.orgName,
      foodName: submissionFormTable.foodName,
    })
    .from(submissionFormTable)
    .where(gt(submissionFormTable.id, sql`(datetime('now','-24 hour'))`)) // Adjust the condition to a proper timestamp field if necessary
    .orderBy(asc(submissionFormTable.foodName), asc(submissionFormTable.orgName))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
