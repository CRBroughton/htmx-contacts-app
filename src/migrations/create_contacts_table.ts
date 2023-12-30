import { Kysely } from 'kysely'
import { KyselyDatabase } from '@/schema'

export async function up(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema
    .createTable('contacts')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('first', 'varchar')
    .addColumn('last', 'varchar')
    .addColumn('phone', 'varchar')
    .addColumn('email', 'varchar')
    .execute()
}

export async function down(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema.dropTable('contacts').execute()
}
