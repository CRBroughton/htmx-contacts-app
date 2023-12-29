import { Hono  } from 'hono'
import { serveStatic } from 'hono/bun'
import { jsxRenderer } from 'hono/jsx-renderer'
import demo from './routes/demo'

const hono = new Hono()

hono.use('/styles.css', serveStatic({ path: './styles.css' }))
hono.get(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <head>
          <script src="https://unpkg.com/htmx.org@1.9.3"/>
          <link rel="stylesheet" href="styles.css"/>
          <title>Hono + htmx</title>
        </head>
        <body>
          <div>{children}</div>
        </body>
      </html>
    )
  },
  { docType: true }
  )
)

hono.route('/', demo)

export default hono