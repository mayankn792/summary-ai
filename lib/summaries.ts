import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * FROM pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;

  return summaries;
}

export async function getSummaryById(summaryId: string) {
  const sql = await getDbConnection();
  const [summaries] =
    await sql`SELECT * FROM pdf_summaries where id = ${summaryId}`;

  console.log(summaries);
  return summaries;
}
