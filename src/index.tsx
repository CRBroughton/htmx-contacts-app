import hono from './hono'
import Test from './components/test'

export interface Vector {
    x: number
    y: number
}

const db: Vector[] = [{ x: 1, y: 10 }]

hono.get('/', (c) => {
  return c.render(
    <div>
      <Test vectors={db} />
    </div>
  )
})

export default hono
