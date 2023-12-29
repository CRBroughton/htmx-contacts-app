import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

const hono = new Hono()

hono.get(
  '*',
  jsxRenderer(({ children }) => {
    return (
      <html>
        <body>
          <div>{children}</div>
        </body>
      </html>
    )
  },
  { docType: true }
  )

)

export default hono