// images.js
// ---------------------------------------------------------------
// Controls WHERE the site loads its pictures from.
//
// If CLOUDINARY_CLOUD is set, images load from your Cloudinary Media
// Library (so a helper can add/replace pictures there in real time,
// with NO access to this code). Each slot has a fixed Cloudinary
// "public id" — the folder + name your helper uploads to.
//
// If a Cloudinary image isn't there yet, the site automatically falls
// back to the matching file in the local public/ folder, then to a
// colored placeholder — so nothing ever looks broken while you migrate.
//
// TO TURN CLOUDINARY OFF: set CLOUDINARY_CLOUD = '' (loads local only).
// ---------------------------------------------------------------

export const CLOUDINARY_CLOUD = 'xvnxxkyt'

export const usingCloud = !!CLOUDINARY_CLOUD

// How often (in seconds) the site checks Cloudinary for updated
// pictures. 60 = a replaced picture shows up within ~1 minute, while
// visitors still get fast, cached images in between. Set higher for
// even faster page loads, or lower for even fresher pictures.
const REFRESH_SECONDS = 60

// Build the Cloudinary URL for a slot id. The "id" is exactly the file
// NAME your helper uploads (e.g. "hof-1" or "shop-couples-2"). Because
// this account uses dynamic folders, the picture's name IS the filename
// — so the helper just names the file and uploads it.
//   f_auto,q_auto = Cloudinary auto-picks the best format & quality.
//   ?v=<bucket>   = a value that changes every REFRESH_SECONDS, so the
//                   browser fetches a fresh copy shortly after an update
//                   instead of showing an old cached one.
export function cloudUrl(id) {
  const bucket = Math.floor(Date.now() / (REFRESH_SECONDS * 1000))
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto/${id}?v=${bucket}`
}

// The primary src for an image slot:
//   id        Cloudinary public id, e.g. 'hof/1'  (no extension)
//   localBase local path without extension, e.g. 'hof/1'
// Returns the Cloudinary URL when configured, else the local .jpg.
export function imgUrl(id, localBase) {
  return usingCloud ? cloudUrl(id) : `${localBase}.jpg`
}
