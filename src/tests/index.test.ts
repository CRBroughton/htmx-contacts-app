import { describe, expect, it } from 'bun:test'
import hono from '@/hono'

describe('My first test', () => {
  it('Should return 200 Response', async () => {
    const req = new Request('http://localhost/id/1')
    const res = await hono.fetch(req)
    expect(res.status).toBe(200)
    expect(await res.text()).toContain(
      '<button hx-get="/id/5" hx-trigger="click" hx-target="closest div" hx-swap="outerHTML"')
  })
})