// src/middleware.ts
import { getCookie } from 'hono/cookie'
import { csrf } from 'hono/csrf'
import { lucia } from './lucia'
import hono from '@/hono'

// see https://hono.dev/middleware/builtin/csrf for more options
hono.use(csrf())

hono.use('*', async (c, next) => {
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
})
