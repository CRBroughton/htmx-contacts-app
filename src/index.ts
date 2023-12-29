import hono from '@/hono'
import demo from '@/routes/demo'

hono.route('/', demo)

export default hono
