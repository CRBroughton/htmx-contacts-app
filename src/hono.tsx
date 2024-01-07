import { Hono  } from 'hono'
import { serveStatic } from 'hono/bun'
import { jsxRenderer } from 'hono/jsx-renderer'

const hono = new Hono()

hono.use('/styles.css', serveStatic({ path: './styles.css' }))
hono.use('custom.css', serveStatic({
  path: './custom.css'
}))
hono.use('/public/*', serveStatic({ root: './' }))
hono.use(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <head>
          <script src="public/htmx-1.9.10.min.js"/>
          <link rel="stylesheet" href="/styles.css"/>
          <link rel="stylesheet" href="/custom.css"/>
          <title>Hono + htmx</title>
        </head>
        <body hx-boost="true">
          <div>{children}</div>
        </body>
      </html>
    )
  },
  { docType: true }
  )
)

export default hono