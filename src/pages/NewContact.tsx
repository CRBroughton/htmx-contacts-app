import { ContactWithErrors } from '@/db/schema'

export default function NewContact({ contact, action, method }: { contact: ContactWithErrors, action: string, method: string }) {
  return (
    <form  action={action} method={method}>
      <fieldset class="flex flex-col gap-2">
        <legend>Contact Values</legend>
        <p>
          <label for="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            hx-get={`/contacts/${contact.id}/email`}
            hx-trigger="change, keyup delay:500ms changed"
            hx-target="next .error"
            value={contact.email ?? ''}
          />
          <span class="error">{contact.errors ? contact.errors['email'] : ''}</span>
        </p>
        <p>
          <label for="first">First Name</label>
          <input name="first" id="first" type="text" placeholder="First Name" value={contact.first} />
          <span class="error">{contact.errors ? contact.errors['first'] : ''}</span>
        </p>
        <p>
          <label for="last">Last Name</label>
          <input name="last" id="last" type="text" placeholder="Last Name" value={contact.last} />
          <span class="error">{contact.errors ? contact.errors['last'] : ''}</span>
        </p>
        <p>
          <label for="phone">Phone</label>
          <input name="phone" id="phone" type="text" placeholder="Phone" value={contact.phone} />
          <span class="error">{contact.errors ? contact.errors['phone'] : ''}</span>
        </p>
        <button class="bg-slate-300">Save</button>
      </fieldset>
    </form>
  )
}