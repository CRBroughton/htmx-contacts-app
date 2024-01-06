/* eslint-disable no-console */
import { faker } from '@faker-js/faker'
import { db } from '@/db'

export default async function contactsSeeder() {
  await db.deleteFrom('contacts').where('first', '=', 'John').execute()
  await db.insertInto('contacts').values({
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  }).executeTakeFirstOrThrow()
  await db.insertInto('contacts').values({
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  }).executeTakeFirstOrThrow()
  await db.insertInto('contacts').values({
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  }).executeTakeFirstOrThrow()
  const result = await db.selectFrom('contacts').selectAll().execute()
  console.log(result)
}