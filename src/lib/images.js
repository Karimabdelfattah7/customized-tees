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

// Everything lives under this one Cloudinary folder, so the helper sees
// a tidy "customized-tees" folder with hof / recent / samples / shop
// inside it (mirrors the local layout).
const ROOT = 'customized-tees'

// Build the Cloudinary URL for a slot id like 'hof/1' or 'shop/couples/2'.
// f_auto,q_auto = Cloudinary auto-picks the best format & quality.
export function cloudUrl(id) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto/${ROOT}/${id}`
}

// The primary src for an image slot:
//   id        Cloudinary public id, e.g. 'hof/1'  (no extension)
//   localBase local path without extension, e.g. 'hof/1'
// Returns the Cloudinary URL when configured, else the local .jpg.
export function imgUrl(id, localBase) {
  return usingCloud ? cloudUrl(id) : `${localBase}.jpg`
}
