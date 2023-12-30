/* eslint-disable no-console */
import { db } from '@/db'

export default async function contactsSeeder() {
  await db.deleteFrom('contacts').where('first', '=', 'John').execute()
  await db.insertInto('contacts').values({
    first: 'John',
    last: 'Smith',
    phone: '123-456-7890',
    email: 'john@example.com'
  }).executeTakeFirstOrThrow()
  await db.insertInto('contacts').values({
    first: 'Maggy',
    last: 'Smith',
    phone: '890-675-1243',
    email: 'Maggy@example.com'
  }).executeTakeFirstOrThrow()
  await db.insertInto('contacts').values({
    first: 'Elton',
    last: 'John',
    phone: '544-537-2358',
    email: 'john@example.com'
  }).executeTakeFirstOrThrow()
  const result = await db.selectFrom('contacts').selectAll().execute()
  console.log(result)
}