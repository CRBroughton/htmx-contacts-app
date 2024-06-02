import { Generated, Selectable } from 'kysely'

interface ContactsTable {
    id: Generated<number>
    first: string
    last: string
    phone: string
    email: string
}

export interface UserTable {
    id: Generated<string>
    username: string
    password_hash: string
}

interface SessionTable {
	id: string
	user_id: string
	expires_at: Date
}

export interface KyselyDatabase {
    contacts: ContactsTable
    user: UserTable
    session: SessionTable
}
export type Contact = Selectable<ContactsTable>

// Custom types

interface ContactErrors {
    first?: string
    last?: string
    phone?: string
    email?: string
}

export interface ContactWithErrors {
    id?: number
    first?: string
    last?: string
    phone?: string
    email?: string
    errors?: ContactErrors
}