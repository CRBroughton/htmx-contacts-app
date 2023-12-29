import { Hono } from 'hono'
import CustomButton from '../components/button'

const demo = new Hono()

demo.get('/id/:id', (c) => {
  return c.render(<CustomButton num={5}/>)
})

export default demo