import LoginForm from '@/components/LoginForm'
import { lucia } from '@/db/lucia'
import hono from '@/hono'

hono.get('/', async(c) => {
  const user = c.get('user')
  const session = c.get('session')

  if (user && session) {
    return c.redirect('/contacts', 301)
  }

  return c.render(<LoginForm/>)
})

hono.post('/logout', async(c) => {
  const session = c.get('session')
  const user = c.get('user')
  if (session && !user) {
    await lucia.validateSession(session.id)
  }
  if (session && user) {
    await lucia.invalidateUserSessions(user.id)
  }

  const cookie = lucia.createBlankSessionCookie()
  c.header('Set-Cookie', cookie.serialize(), { append: true })

  return c.redirect('/')
})

export {
  hono as auth,
}