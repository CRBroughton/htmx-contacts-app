import hono from '@/hono'
import { demo, websocket } from '@/routes/demo'

hono.route('/', demo)

Bun.serve({
  fetch: hono.fetch,
  websocket,
})