import { Kysely } from 'kysely'
import { KyselyDatabase } from '../schema'

export async function up(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema
    .createTable('session')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('user_id', 'varchar')
    .addColumn('expires_at', 'date')
    .execute()
}

export async function down(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema.dropTable('sessin').execute()
}
