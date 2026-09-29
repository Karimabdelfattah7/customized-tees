export async function handler() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME || 'xvnxxkyt'
  const key = process.env.CLOUDINARY_API_KEY
  const secret = process.env.CLOUDINARY_API_SECRET
  if (!key || !secret) return { statusCode: 503, body: JSON.stringify({ error: 'Cloudinary catalog credentials are not configured.' }) }
  try {
    const designs = []
    let cursor
    do {
      const url = new URL(`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloud)}/resources/image/upload`)
      url.searchParams.set('max_results', '500')
      url.searchParams.set('prefix', 'shop-')
      url.searchParams.set('tags', 'true')
      url.searchParams.set('context', 'true')
      if (cursor) url.searchParams.set('next_cursor', cursor)
      const response = await fetch(url, {
        headers: { Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}` },
        signal: AbortSignal.timeout(8000)
      })
      if (!response.ok) throw new Error('Cloudinary catalog unavailable')
      const data = await response.json()
      for (const resource of data.resources || []) {
        const match = resource.public_id.match(/^shop-(rappers|anime|nba|football|cartoon|couples|kids|gaming|movies|memes|memorial|birthdays)-(\d+)$/)
        if (!match) continue
        designs.push({ id: resource.public_id, category: match[1],
          title: resource.context?.custom?.caption || `${match[1].charAt(0).toUpperCase() + match[1].slice(1)} #${match[2]}`,
          version: resource.version })
      }
      cursor = data.next_cursor
    } while (cursor)
    designs.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60, s-maxage=60' }, body: JSON.stringify({ designs }) }
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'Cloudinary catalog is temporarily unavailable.' }) }
  }
}
