import { Contact } from '@/routes/demo'

export default function NewContact({ contact }: { contact: Contact }) {
  return (
    <form action="/contacts/new" method="post">
      <fieldset>
        <legend>Contact Values</legend>
        <p>
          <label for="email">Email</label>
          <input name="email" id="email" type="email" placeholder="Email" value={contact.email ?? ''}/>
          <span class="error">errors go here</span> (4)
        </p>
      </fieldset>
    </form>
  )
}