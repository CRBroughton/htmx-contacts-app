import { Lucia } from 'lucia'
import { BunSQLiteAdapter } from '@lucia-auth/adapter-sqlite'
import { sqliteDB } from './db'
import { UserTable } from './schema'

const adapter = new BunSQLiteAdapter(sqliteDB, { user: 'userTable', session: 'sessionTable' })

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production'
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username
    }
  }
})

declare module 'lucia' {
  interface Register {
      Lucia: typeof lucia
      DatabaseUserAttributes: Omit<UserTable, 'id'>
  }
}
