/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { db } from '@/db/db'

export default async function contactsSeeder() {
  await db.deleteFrom('contacts').where('first', '=', 'John').execute()
  for (let index = 0; index < 55; index++) {
    await db.insertInto('contacts').values({
      first: faker.person.firstName(),
      last: faker.person.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    }).executeTakeFirstOrThrow()
  }
  const result = await db.selectFrom('contacts').selectAll().execute()
  console.log(result)
}