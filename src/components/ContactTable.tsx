import { Contact } from '@/schema'
import ContactsRows from './ContactsRows'
import PaginationButton from './Pagination'

export default function ContactTable({ contacts, page }: { contacts: Contact[], page: number | undefined }) {
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
        <ContactsRows contacts={contacts}/>
        {page !== undefined ? <PaginationButton page={page} />: null}
      </tbody>
    </table>
  )
}