import { getCookie } from 'hono/cookie'
import { lucia } from './lucia'
import { Context, Next } from 'hono'

// see https://hono.dev/middleware/builtin/csrf for more options
export async function authMiddleware(c: Context, next: Next) {
  const sessionId = getCookie(c, lucia.sessionCookieName) ?? null
  if (!sessionId) {
    c.set('user', null)
    c.set('session', null)
    return next()
  }
  const { session, user } = await lucia.validateSession(sessionId)

  if (session && session.fresh) {
    // use `header()` instead of `setCookie()` to avoid TS errors
    c.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize(), {
      append: true
    })
  }
  if (!session) {
    c.header('Set-Cookie', lucia.createBlankSessionCookie().serialize(), {
      append: true
    })
  }
  c.set('user', user)
  c.set('session', session)
  return next()
}
