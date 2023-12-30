import { Contact } from '@/routes/demo'
import ContactEntry from './ContactEntry'

export default function ContactTable({ contacts }: { contacts: Contact[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) =>
          <ContactEntry contact={contact}/>
        )}
      </tbody>
    </table>
  )
}