import { Hono } from 'hono'
import CustomButton from '@/components/button'
import Test from '@/components/test'
import { db } from '@/db'

const demo = new Hono()

const numbers = [ 1, 2, 3 ]

demo.get('/', (c) => {
  return c.render(<div><Test numbers={numbers} /></div>
  )
})

demo.get('/id/:id', async (c) => {
  const test = await db.selectFrom('pet')
    .where('id', '=', 1)
    .selectAll()
    .executeTakeFirst()

  if (test !== undefined) {
    return c.html(<CustomButton num={test.id}/>)
  }
  return c.html(<CustomButton num={5}/>)
})

export default demo