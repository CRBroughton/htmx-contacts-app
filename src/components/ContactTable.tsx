import { Contact } from '@/db/schema'
import ContactsRows from './ContactsRows'
import PaginationButton from './Pagination'
import DeleteContacts from './DeleteContacts'

export default function ContactTable({ contacts, page }: { contacts: Contact[], page: number | undefined }) {
  return (
    <div id="form-table">
      <form>
        <table class="text-left">
          <thead>
            <tr>
              <th></th>
              <th>First</th>
              <th>Last</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <div class="border border-slate-800"/>
          <tbody>
            <ContactsRows contacts={contacts}/>
            {page !== undefined ? <PaginationButton page={page} />: null}
          </tbody>
        </table>
        <DeleteContacts />
      </form>
    </div>
  )
}