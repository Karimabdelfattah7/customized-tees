// Run with server-side credentials in your environment, never in the browser.
import { readdir, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const cloud = process.env.CLOUDINARY_CLOUD_NAME || 'xvnxxkyt'
const key = process.env.CLOUDINARY_API_KEY
const secret = process.env.CLOUDINARY_API_SECRET
if (!key || !secret) throw new Error('Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your local environment.')
for (const filename of (await readdir(new URL('../public/images/', import.meta.url))).filter(name => name.endsWith('.webp'))) {
  const publicId = `ct-concept-${filename.slice(0, -5)}`
  const timestamp = Math.floor(Date.now() / 1000)
  // overwrite=false preserves any image already managed by the store owner.
  const params = { invalidate: 'true', overwrite: 'false', public_id: publicId, timestamp: String(timestamp) }
  const signString = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => `${name}=${value}`).join('&')
  const signature = createHash('sha1').update(signString + secret).digest('hex')
  const form = new FormData()
  for (const [name, value] of Object.entries(params)) form.append(name, value)
  form.append('api_key', key)
  form.append('signature', signature)
  form.append('file', new Blob([await readFile(new URL(`../public/images/${filename}`, import.meta.url))]), filename)
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: form })
  const data = await response.json()
  if (!response.ok) throw new Error(`Upload failed for ${publicId}: ${data.error?.message || response.status}`)
  console.log(`${data.existing ? 'Already present' : 'Uploaded'}: ${publicId}`)
}
