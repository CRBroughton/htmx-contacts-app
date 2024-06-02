import hono from '@/hono'
import { hono as honoApp, websocket } from '@/routes/demo'

hono.route('/', honoApp)

Bun.serve({
  fetch: hono.fetch,
  websocket,
})