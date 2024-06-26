import { Contact } from '@/db/schema'

export default function ContactsRows({ contacts }: { contacts: Contact[] }) {
  return (
    <>
      {contacts.map((contact) =>
        <tr>
          <td><input type="checkbox" name="selected_contact_ids" value={contact.id}/></td>
          <td>{contact.first}</td>
          <td>{contact.last}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td class="flex gap-1">
            <a href={`/contacts/${contact.id}/edit`}>Edit</a>
            <a href={`/contacts/${contact.id}`}>View</a>
            <a
              href="#"
              hx-delete={`/contacts/${contact.id}`}
              hx-confirm="Are you sure you want to delete this contact?"
              hx-target="closest tr"
              hx-swap="outerHTML swap:0.5s">
                Delete
            </a>
          </td>
        </tr>
      )}
    </>
  )
}