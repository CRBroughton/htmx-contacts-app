import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { csrf } from 'hono/csrf'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Session, User } from 'lucia'
import { authMiddleware } from './db/middleware'
import { logger } from 'hono/logger'
import Mainframe from './components/Mainframe'
export const hono = new Hono<{
	Variables: {
		user: User | null
		session: Session | null
	};
}>()

hono.use(csrf())
hono.use('*', authMiddleware)
hono.use('*', logger())
hono.use('/styles.css', serveStatic({ path: './styles.css' }))
hono.use('custom.css', serveStatic({
  path: './custom.css'
}))
hono.use('ws.js', serveStatic({
  path: './ws.js'
}))
hono.use('/public/*', serveStatic({ root: './' }))
hono.use(
  '*',
  jsxRenderer(({ children }) => <Mainframe>{children}</Mainframe>,
    { docType: true }
  )
)

export default hono