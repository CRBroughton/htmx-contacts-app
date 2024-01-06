import { Contact } from '@/schema'
import ContactEntry from './ContactEntry'
import PaginationButton from './Pagination'

export default function ContactTable({ contacts, page }: { contacts: Contact[], page: number }) {
  return (
    <table class="text-left">
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <div class="border border-slate-800"/>
      <tbody>
        {contacts.map((contact) =>
          <ContactEntry contact={contact}/>
        )}
        <PaginationButton page={page} />
      </tbody>
    </table>
  )
}