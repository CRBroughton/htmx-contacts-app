import hono from './hono'
import Test from './components/test'
import demo from './routes/demo'

const numbers = [ 1, 2, 3 ]

hono.get('/', (c) => {
  return c.render(
    <div>
      <Test numbers={numbers} />
    </div>
  )
})

hono.route('/', demo)

export default hono
