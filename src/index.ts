import hono from '@/hono'
import { contacts } from '@/routes/contacts'
import { auth } from '@/routes/auth'
import { ws, websocket } from './routes/ws'

hono.route('*', ws)
hono.route('/', auth)
hono.route('/contacts', contacts)

Bun.serve({
  fetch: hono.fetch,
  websocket,
})