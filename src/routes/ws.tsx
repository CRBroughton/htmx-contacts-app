import hono from '@/hono'
import { createBunWebSocket } from 'hono/bun'

const { upgradeWebSocket, websocket } = createBunWebSocket()
const randomUUID = crypto.randomUUID()

hono.get(
  '/ws/hotreload',
  upgradeWebSocket(() => {
    return {
      onMessage(event, ws) {
        ws.send(randomUUID)
      },
      onClose: () => {
        // eslint-disable-next-line no-console
        console.log('WS Connection closed')
      },
    }
  })
)

export {
  hono as ws,
  websocket,
}