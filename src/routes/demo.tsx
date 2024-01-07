import AddContact from '@/components/AddContact'
import ContactTable from '@/components/ContactTable'
import ContactsForm from '@/components/ContactsForm'
import { Layout } from '@/components/Layout'
import NewContact from '@/pages/NewContact'
import { Hono } from 'hono'
import { db } from '@/db'
import { ContactWithErrors, Contact } from '@/schema'
import ContactDetail from '@/components/ContactDetails'
import { validateContact } from '@/utils'
import ContactsRows from '@/components/ContactsRows'

const demo = new Hono()

demo.get('/', (c) => {
  return c.redirect('/contacts', 301)
})

demo.get('/contacts', async (c) => {
  const searchTerm = c.req.query('q')
  const pageNum = c.req.query('page') ?? 0
  const triggerSearch = c.req.header('HX-Trigger') === 'search'

  if (searchTerm !== undefined && searchTerm.length > 0) {
    const filteredContact = await db
      .selectFrom('contacts')
      .where('first', '=', searchTerm)
      .selectAll()
      .executeTakeFirst()

    if (filteredContact === undefined) {
      const contacts = await db
        .selectFrom('contacts')
        .selectAll()
        .execute()
      return c.render(
        <Layout>
          <ContactsForm input={''} />
          <AddContact />
          <ContactTable contacts={contacts} page={Number(pageNum)} />
        </Layout>
      )
    }

    if (filteredContact !== undefined && triggerSearch === true) {
      return c.html(
        <ContactsRows contacts={[ filteredContact ]}/>
      )
    }
  }

  const contacts = await db
    .selectFrom('contacts')
    .selectAll()
    .offset(Number(pageNum + '0'))
    .limit(10)
    .execute()

  if (contacts.length > 0) {
    return c.render(
      <Layout>
        <ContactsForm input={''} />
        <AddContact />
        <ContactTable contacts={contacts}  page={Number(pageNum)}  />
      </Layout>
    )
  }

})

demo.get('/contacts/count', async (c) => {
  const contacts = await db
    .selectFrom('contacts')
    .selectAll()
    .execute()
  const contactCount = contacts.length
  return c.html(
    <p>{contactCount} total Contacts</p>
  )
})

demo.get('/contacts/new', (c) => {
  const newContact: ContactWithErrors = {
    email: '',
    first: '',
    last: '',
    phone: '',
  }
  return c.render(
    <Layout>
      <NewContact contact={newContact} action='/contacts/new' method='POST' />
      <p>
        <a href="/contacts">Back</a>
      </p>
    </Layout>
  )
})

demo.post('/contacts/new', async (c) => {
  const newContact = await c.req.parseBody<Omit<Contact, 'id'>>()

  const contactWithErrors = validateContact(newContact)

  if (contactWithErrors.errors) {
    return c.render(
      <Layout>
        <NewContact contact={contactWithErrors} action='/contacts/new' method='POST' />
        <p>
          <a href="/contacts">Back</a>
        </p>
      </Layout>
    )
  }

  await db.insertInto('contacts')
    .values(newContact)
    .executeTakeFirstOrThrow()
  return c.redirect('/contacts')

})

demo.get('/contacts/:id', async (c) => {
  const id = c.req.param('id')
  const contact = await db
    .selectFrom('contacts')
    .where('id', '=', Number(id))
    .selectAll()
    .executeTakeFirst()

  if (contact !== undefined) {
    return c.render(
      <ContactDetail contact={contact} />
    )
  }

  return c.redirect('/contacts')
})

demo.get('/contacts/:id/edit', async (c) => {
  const id = c.req.param('id')

  const contact = await db
    .selectFrom('contacts')
    .where('id', '=', Number(id))
    .selectAll()
    .executeTakeFirst()
  if (contact !== undefined) {

    return c.render(
      <Layout>
        <NewContact contact={contact} action={`/contacts/${contact.id}/edit`} method='POST' />
        <button
          id="delete-btn"
          hx-delete={`/contacts/${contact.id}`}
          hx-target="body"
          hx-confirm="Are you sure you want to delete this contact?"
          hx-push-url="true"
        >Delete Contact</button>
        <p>
          <a href="/contacts">Back</a>
        </p>
      </Layout>
    )
  }
  return c.redirect('/contacts')
})

demo.post('/contacts/:id/edit', async (c) => {
  const id = c.req.param('id')
  const currentContact = await c.req.parseBody() as unknown as Contact

  const storedContact = await db
    .selectFrom('contacts')
    .where('id', '=', Number(id))
    .selectAll()
    .executeTakeFirstOrThrow()

  const contactWithErrors = validateContact(currentContact)

  if (contactWithErrors.errors) {
    return c.render(
      <Layout>
        <NewContact contact={contactWithErrors} action={`/contacts/${storedContact.id}/edit`} method='POST' />
        <button
          id="delete-btn"
          hx-delete={`/contacts/${storedContact.id}`}
          hx-target="body"
          hx-confirm="Are you sure you want to delete this contact?"
          hx-push-url="true"
        >Delete Contact</button>
        <p>
          <a href="/contacts">Back</a>
        </p>
      </Layout>
    )
  }

  await db
    .updateTable('contacts')
    .set(currentContact)
    .where('id', '=', Number(c.req.param('id')))
    .execute()
  return c.redirect('/contacts')

})

demo.delete('/contacts/:id', async (c) => {
  const id = c.req.param('id')
  const deleteFromMainPage = c.req.header('HX-Trigger') !== 'delete-btn'

  db
    .deleteFrom('contacts')
    .where('id', '=', Number(id))
    .execute()

  if (deleteFromMainPage === true) {
    return c.html('')
  }

  return c.redirect('/contacts', 303)

})

demo.get('/contacts/:id/email', async (c) => {
  const email = c.req.query('email')

  const existingContact = await db
    .selectFrom('contacts')
    .where('email', '=', email!)
    .selectAll()
    .executeTakeFirst()

  if (existingContact) {
    return c.text(
      'Email already taken'
    )
  }

  return c.text('')

})
// demo.get('/', (c) => {
//   return c.render(<div><Test numbers={numbers} /></div>
//   )
// })

// demo.get('/id/:id', async (c) => {
//   const test = await db.selectFrom('pet')
//     .where('id', '=', 1)
//     .selectAll()
//     .executeTakeFirst()

//   if (test !== undefined) {
//     return c.html(<CustomButton num={test.id}/>)
//   }
//   return c.html(<CustomButton num={5}/>)
// })

export default demo