import { Generated } from 'kysely'

interface PetTable {
    id: Generated<number>
    name: string
}

interface asdTable {
    id: Generated<number>
    job: string
}

export interface KyselyDatabase {
    pet: PetTable
    asd: asdTable
}