/* eslint-disable no-console */
import Database from 'bun:sqlite'
import {  Kysely, Migrator , FileMigrationProvider } from 'kysely'
import { BunSqliteDialect } from 'kysely-bun-sqlite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { KyselyDatabase } from '@/schema'
import { Lucia } from 'lucia'
import { BunSQLiteAdapter } from '@lucia-auth/adapter-sqlite'

const sqliteDB = new Database('db.sqlite')

export const db = new Kysely<KyselyDatabase>({
  dialect: new BunSqliteDialect({
    database: sqliteDB,
  }),
})

const adapter = new BunSQLiteAdapter(sqliteDB, { user: 'userTable', session: 'sessionTable' })
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production'
    }
  }
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, './migrations'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  if (results !== undefined) {
    results.forEach((it) => {
      if (it.status === 'Success') {
        console.log(`migration "${it.migrationName}" was executed successfully`)
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`)
      }
    })
  }

}

await migrateToLatest()