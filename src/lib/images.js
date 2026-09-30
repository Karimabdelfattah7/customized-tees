// Stable public IDs let the owner replace images in Cloudinary without code edits.
export const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD || 'xvnxxkyt'
const slots = {
  'recent-1': 'anime', 'recent-2': 'birthday', 'recent-3': 'memorial',
  'recent-4': 'nba', 'recent-5': 'couples', 'recent-6': 'football',
  'hof-1': 'graduation', 'hof-2': 'memorial', 'hof-3': 'birthday',
  'hof-4': 'sports', 'hof-5': 'reunion', 'hof-6': 'couples',
  'hof-7': 'business', 'hof-8': 'community',
  'sample-1': 'graduation', 'sample-2': 'memorial', 'sample-3': 'sports',
  'sample-4': 'birthday', 'sample-5': 'business', 'sample-6': 'reunion',
  'sample-7': 'couples', 'sample-8': 'community'
}

export function cloudUrl(publicId, { portrait = false, landscape = false, contain = false, version } = {}) {
  const height = landscape ? 675 : portrait ? 1200 : 900
  // Tiled text is embedded by Cloudinary in the delivered image, not in the original.
  const transform = `${contain ? 'c_pad,b_rgb:202022' : 'c_fill'},g_center,w_900,h_${height}/l_text:Arial_32_bold:CustomizedTees,co_white/o_35/a_-25/c_lpad,w_300,h_130,b_transparent/fl_layer_apply,fl_tiled/f_auto,q_auto`
  const id = publicId.split('/').map(encodeURIComponent).join('/')
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${transform}/${version ? `v${version}/` : ''}${id}`
}

export function assetUrl(asset, portrait = false) {
  return cloudUrl(`ct-concept-${asset}${portrait ? '-portrait' : ''}`, { portrait, landscape: asset === 'about' })
}
export function imgUrl(id, localBase) {
  if (slots[id]) return assetUrl(slots[id], id.startsWith('hof-'))
  if (id === 'about') return assetUrl('about')
  return cloudUrl(id, { landscape: true })
}

// A single known local fallback, rather than trying eight file extensions.
export function localImageFor(src) {
  if (src.startsWith('/')) return null
  const id = decodeURIComponent(src.split('/').pop() || '')
  if (id.startsWith('ct-concept-')) {
    const key = id.slice('ct-concept-'.length)
    return `/images/${key}.webp`
  }
  if (id.startsWith('ct-drop-')) return `/designs/drop/${id}.webp`
  if (id.startsWith('shop-')) return `/designs/${id}.webp`
  if (id === 'stmatthews-store' || id === 'jefferson-store') return `/${id}.jpg`
  return null
}
