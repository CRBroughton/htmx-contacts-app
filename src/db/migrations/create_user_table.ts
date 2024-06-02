import { Kysely } from 'kysely'
import { KyselyDatabase } from '../schema'

export async function up(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('username', 'varchar')
    .addColumn('password_hash', 'varchar')
    .execute()
}

export async function down(db: Kysely<KyselyDatabase>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
