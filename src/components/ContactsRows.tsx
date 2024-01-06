import { Contact } from '@/schema'

export default function ContactsRows({ contacts }: { contacts: Contact[] }) {
  return (
    <>
      {contacts.map((contact) =>
        <tr>
          <td>{contact.first}</td>
          <td>{contact.last}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td><a href={`/contacts/${contact.id}/edit`}>Edit</a>
            <a href={`/contacts/${contact.id}`}>View</a></td>
        </tr>
      )}
    </>
  )
}