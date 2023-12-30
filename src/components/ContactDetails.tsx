import { Contact } from '@/schema'

export default function ContactDetail({ contact }: { contact: Contact }) {
  return (
    <div>
      <h1>{contact.first} {contact.last}</h1>
      <div>
        <div>Phone: {contact.phone}</div>
        <div>Email: {contact.email}</div>
      </div>

      <p>
        <a href={`/contacts/${contact.id}/edit`}>Edit</a>
        <a href="/contacts">Back</a>
      </p>
    </div>
  )
}