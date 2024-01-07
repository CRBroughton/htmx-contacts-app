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
          <td>
            <a href={`/contacts/${contact.id}/edit`}>Edit</a>
            <a href={`/contacts/${contact.id}`}>View</a>
            <a
              href="#"
              hx-delete={`/contacts/${contact.id}`}
              hx-confirm="Are you sure you want to delete this contact?"
              hx-target="body">
                Delete
            </a>
          </td>
        </tr>
      )}
    </>
  )
}