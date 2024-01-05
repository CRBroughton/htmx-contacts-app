import { Generated, Selectable } from 'kysely'

interface ContactsTable {
    id: Generated<number>
    first: string
    last: string
    phone: string
    email: string
}

export interface KyselyDatabase {
    contacts: ContactsTable
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