import { Contact } from '@/schema'

export default function Pagination({ page, contacts }: { page: number, contacts: Contact[] }) {
  const previous = <a href={`/contacts?page=${page-1}`}>Previous</a>
  const next = <a href={`/contacts?page=${page+1}`}>Next</a>

  const pageIsGreaterThanOne = page >= 1
  const pageHasTenContacts = contacts.length === 10
  return (
    <div>
      <span style="float: right">
        {pageIsGreaterThanOne ? previous : null}
        {pageHasTenContacts ? next : null}
      </span>
    </div>
  )
}