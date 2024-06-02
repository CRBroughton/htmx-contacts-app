import { Kysely } from 'kysely'
import { KyselyDatabase } from '../schema'

export async function up(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema
    .createTable('session')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('user_id', 'text')
    .addColumn('expires_at', 'integer')
    .execute()
}

export async function down(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema.dropTable('sessin').execute()
}
