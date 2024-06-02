import { Child } from 'hono/jsx'

export default function Mainframe({ children }: {children: Child}) {
  return (
    <html>
      <head>
        <script src="public/htmx-1.9.10.min.js"/>
        <link rel="stylesheet" href="/styles.css"/>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.slate.min.css"
        />
        <link rel="stylesheet" href="/custom.css"/>
        <script src="./ws.js"></script>
        <title>Hono + htmx</title>
      </head>
      <body hx-boost="true">
        <div>{children}</div>
      </body>
    </html>
  )
}