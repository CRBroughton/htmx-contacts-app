import AddContact from '@/components/AddContact'
import ContactTable from '@/components/ContactTable'
import ContactsForm from '@/components/ContactsForm'
import { Layout } from '@/components/Layout'
import { Hono } from 'hono'
// import { db } from '@/db'

const demo = new Hono()

demo.get('/', (c) => {
  return c.redirect('/contacts', 301)
})

export interface Contact {
  id: number
  first: string
  last: string
  phone: string
  email: string
}

const contacts: Contact[] = [
  {
    id: 1,
    first: 'John',
    last: 'Smith',
    phone: '123-456-7890',
    email: 'john@example.comz'
  },
  {
    id: 2,
    first: 'Dana',
    last: 'Crandith',
    phone: '123-456-7890',
    email: 'dcran@example.com'
  },
  {
    id: 2,
    first: 'Edith',
    last: 'Neutvaar',
    phone: '123-456-7890',
    email: 'en@example.com'
  }
]

demo.get('/contacts', (c) => {
  const searchTerm = c.req.query('q')

  if (searchTerm !== undefined && searchTerm.length > 0) {

    const filteredContact = contacts.find(
      (contact) => contact.first === searchTerm
    )

    if (filteredContact === undefined) {
      return c.render(
        <Layout>
          <ContactsForm input={''}/>
          <ContactTable contacts={contacts}/>
          <AddContact/>
        </Layout>
      )
    }

    if (filteredContact !== undefined) {
      return c.render(
        <Layout>
          <ContactsForm input={searchTerm}/>
          <ContactTable contacts={[ filteredContact! ]}/>
          <AddContact/>
        </Layout>
      )
    }

  }
  return c.render(
    <Layout>
      <ContactsForm input={''}/>
      <ContactTable contacts={contacts}/>
      <AddContact/>
    </Layout>
  )
  // return c.text('Hello from the contacts page')
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