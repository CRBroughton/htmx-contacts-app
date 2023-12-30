import AddContact from '@/components/AddContact'
import ContactTable from '@/components/ContactTable'
import ContactsForm from '@/components/ContactsForm'
import { Layout } from '@/components/Layout'
import NewContact from '@/pages/NewContact'
import { Hono } from 'hono'
import { db } from '@/db'
import { ContactWithErrors, Contact } from '@/schema'
import ContactDetail from '@/components/ContactDetails'

const demo = new Hono()

demo.get('/', (c) => {
  return c.redirect('/contacts', 301)
})

demo.get('/contacts', async(c) => {
  const searchTerm = c.req.query('q')

  if (searchTerm !== undefined && searchTerm.length > 0) {

    const filteredContact = await db
      .selectFrom('contacts')
      .where('first', '=', searchTerm)
      .selectAll()
      .executeTakeFirst()

    if (filteredContact === undefined) {
      const contacts = await db.selectFrom('contacts').selectAll().execute()
      return c.render(
        <Layout>
          <ContactsForm input={''} />
          <ContactTable contacts={contacts} />
          <AddContact />
        </Layout>
      )
    }

    if (filteredContact !== undefined) {
      return c.render(
        <Layout>
          <ContactsForm input={searchTerm} />
          <ContactTable contacts={[ filteredContact! ]} />
          <AddContact />
        </Layout>
      )
    }
  }

  const contacts = await db
    .selectFrom('contacts')
    .selectAll()
    .execute()

  return c.render(
    <Layout>
      <ContactsForm input={''} />
      <ContactTable contacts={contacts} />
      <AddContact />
    </Layout>
  )
  // return c.text('Hello from the contacts page')
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
  const contact = await c.req.parseBody<Record<string, string>>()

  let contactWithErrors: ContactWithErrors = {
    ...newContact,
  }

  if (newContact.email.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        email: 'No email provided'
      }
    }
  }

  if (newContact.first.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        first: 'No first name provided'
      }
    }
  }
  if (newContact.last.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        last: 'No last name provided'
      }
    }
  }
  if (newContact.phone.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        phone: 'No phone number provided'
      }
    }
  }

  if (contactWithErrors.errors) {
    return c.render(
      <Layout>
        <NewContact contact={contactWithErrors} action={`/contacts/${ contact.id }/edit`} method='POST' />
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
      <ContactDetail contact={contact}/>
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
        <p>
          <a href="/contacts">Back</a>
        </p>
      </Layout>
    )
  }
  return c.redirect('/contacts')
})

demo.post('/contacts/:id/edit', async (c) => {
  const newContact = await c.req.parseBody<Omit<Contact, 'id'>>()
  const contact = await c.req.parseBody<Record<string, string>>()

  let contactWithErrors: ContactWithErrors = {
    ...newContact,
  }
  if (newContact.email.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        email: 'No email provided'
      }
    }
  }

  if (newContact.first.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        first: 'No first name provided'
      }
    }
  }
  if (newContact.last.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        last: 'No last name provided'
      }
    }
  }
  if (newContact.phone.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        phone: 'No phone number provided'
      }
    }
  }

  if (contactWithErrors.errors) {
    return c.render(
      <Layout>
        <NewContact contact={contactWithErrors} action={`/contacts/${ contact.id }/edit`} method='POST' />
        <p>
          <a href="/contacts">Back</a>
        </p>
      </Layout>
    )
  }

  await db
    .updateTable('contacts')
    .set(newContact)
    .where('id', '=', Number(c.req.param('id')))
    .execute()
  return c.redirect('/contacts')

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