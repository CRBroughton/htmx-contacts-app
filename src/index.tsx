import hono from './hono'
import Test from './components/test'

const numbers = [ 1, 2, 3 ]

hono.get('/', (c) => {
  return c.render(
    <div>
      <Test numbers={numbers} />
    </div>
  )
})

export default hono
