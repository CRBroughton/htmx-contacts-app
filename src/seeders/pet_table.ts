/* eslint-disable no-console */
import { db } from '@/db'

export default async function petSeeder() {
  await db.deleteFrom('pet').where('name', '=', 'Fluffy').execute()
  await db.insertInto('pet').values({
    name: 'Fluffy',
  }).executeTakeFirstOrThrow()
  const result = await db.selectFrom('pet').selectAll().executeTakeFirstOrThrow()
  console.log(result)
}