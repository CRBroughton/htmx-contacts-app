import { Contact } from '@/routes/demo'
import ContactEntry from './ContactEntry'

export default function ContactTable({ contacts }: { contacts: Contact[] }) {
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
      </tbody>
    </table>
  )
}