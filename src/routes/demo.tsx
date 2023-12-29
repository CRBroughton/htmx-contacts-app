import { Hono } from 'hono'
import CustomButton from '../components/button'
import Test from '../components/test'

const demo = new Hono()

const numbers = [ 1, 2, 3 ]

demo.get('/', (c) => {
  return c.render(<div><Test numbers={numbers} /></div>
  )
})

demo.get('/id/:id', (c) => {
  return c.html(<CustomButton num={5}/>)
})

export default demo