import test from 'node:test'
import assert from 'node:assert/strict'
import { handler } from '../netlify/functions/catalog.mjs'

test('catalog requires server credentials and returns no secrets', async () => {
  delete process.env.CLOUDINARY_API_KEY
  delete process.env.CLOUDINARY_API_SECRET
  assert.equal((await handler()).statusCode, 503)
})
test('catalog paginates, filters unrelated assets, and uses metadata titles', async () => {
  process.env.CLOUDINARY_API_KEY = 'test-key'
  process.env.CLOUDINARY_API_SECRET = 'test-secret'
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = async (url, options) => {
    assert(options.headers.Authorization.startsWith('Basic '))
    calls++
    if (calls === 1) return { ok: true, json: async () => ({ resources: [
      { public_id: 'private-unrelated-photo', version: 1 },
      { public_id: 'ct-concept-anime', version: 2 },
      { public_id: 'shop-anime-10', version: 3, context: { custom: { caption: 'Store design' } } }
    ], next_cursor: 'page-two' }) }
    assert.equal(url.searchParams.get('next_cursor'), 'page-two')
    return { ok: true, json: async () => ({ resources: [{ public_id: 'shop-anime-2', version: 4 }] }) }
  }
  try {
    const result = await handler()
    assert.equal(result.statusCode, 200)
    const { designs } = JSON.parse(result.body)
    assert.equal(designs.length, 2)
    assert.equal(designs[0].id, 'shop-anime-2')
    assert.equal(designs[1].title, 'Store design')
    assert(!result.body.includes('test-secret'))
    assert.equal(calls, 2)
  } finally { globalThis.fetch = original }
})
test('remote errors yield a safe response so the client can use its fallback', async () => {
  const original = globalThis.fetch
  globalThis.fetch = async () => ({ ok: false })
  try { assert.equal((await handler()).statusCode, 502) }
  finally { globalThis.fetch = original; delete process.env.CLOUDINARY_API_KEY; delete process.env.CLOUDINARY_API_SECRET }
})
