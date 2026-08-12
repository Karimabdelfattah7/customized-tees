// imageFallback.js
// ---------------------------------------------------------------
// Makes an image accept ANY common extension. You set the src to the
// ".jpg" version; if that file doesn't exist, this automatically tries
// the same name with .jpeg, then .png, then .webp before giving up.
//
// Usage:
//   <img src="hof/1.jpg" onError={tryExts('hof/1', () => hide())} />
// ---------------------------------------------------------------

// Local extensions tried as fallbacks (the initial src may be a
// Cloudinary URL, so we start from .jpg here to cover the local file).
const REST = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'WEBP']

// Returns an onError handler for an <img>. `base` is the file path
// WITHOUT extension (e.g. "hof/1"). `onGiveUp` runs once every
// extension has failed.
export function tryExts(base, onGiveUp) {
  return (e) => {
    const img = e.currentTarget
    const i = img.dataset.exti ? parseInt(img.dataset.exti, 10) : 0
    if (i < REST.length) {
      img.dataset.exti = String(i + 1)
      img.src = base + '.' + REST[i]
    } else if (onGiveUp) {
      onGiveUp(e)
    }
  }
}
