// Logo.jsx
// ---------------------------------------------------------------
// Shows the "Customized Tees" wordmark with the animated TIE-DYE
// effect painted INTO the letters.
//
// How it works (the clever part):
//   You give it a picture of your logo: WHITE letters on a BLACK
//   background (public/logo.png). The CSS uses that image as a
//   "luminance mask" — bright pixels (your white letters) show the
//   tie-dye gradient underneath, dark pixels (the black background)
//   become see-through. So the black disappears on its own and only
//   your lettering gets the color treatment. No manual cutting out.
//
//   If logo.png isn't there yet, it falls back to styled text.
// ---------------------------------------------------------------

import { useState } from 'react'

// We import the logo from src/assets so the build INLINES it as base64
// data right inside the page. That's what makes the tie-dye mask work
// even when the site is opened by double-clicking the file (file://),
// where browsers otherwise block separate mask-image files.
//
// TO CHANGE THE LOGO: replace  src/assets/logo.png  (white letters on a
// black background) and run  npm run build.
const logoModules = import.meta.glob(
  '../assets/logo.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
)
const SRC = Object.values(logoModules)[0] || null

export default function Logo({ height = 46 }) {
  const [failed, setFailed] = useState(false)

  // No logo found, or it failed to load → show the brush-script text.
  if (!SRC || failed) {
    return <span className="brand-text">Customized Tees</span>
  }

  return (
    <span
      className="logo-tiedye"
      role="img"
      aria-label="Customized Tees"
      // The mask image is set inline so the path resolves correctly
      // whether the site is hosted online or opened as a local file.
      style={{
        height,
        WebkitMaskImage: `url(${SRC})`,
        maskImage: `url(${SRC})`
      }}
    >
      {/* Hidden copy of the image — its only job is to give the box
          the right width for whatever logo you drop in. */}
      <img
        className="logo-sizer"
        src={SRC}
        alt="Customized Tees"
        style={{ height }}
        onError={() => setFailed(true)}
      />
    </span>
  )
}
