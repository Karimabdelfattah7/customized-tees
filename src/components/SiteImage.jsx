import { useState } from 'react'
import { localImageFor } from '../lib/images.js'

export default function SiteImage({ src, alt, className, loading = 'lazy' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const local = localImageFor(src)
  const currentSrc = failedSrc === src && local ? local : src
  const [missing, setMissing] = useState(null)
  if (missing === currentSrc) return null
  const cloudWatermark = currentSrc.includes('l_text:Arial_32_bold:CustomizedTees')
  return <span className={`site-image ${className || ''}`}>
    <img src={currentSrc} alt={alt} className="site-image__photo" loading={loading}
      decoding="async" onError={() => {
        if (currentSrc === src && local) setFailedSrc(src)
        else setMissing(currentSrc)
      }} />
    {!cloudWatermark && <span className="site-image__watermark" aria-hidden="true" />}
  </span>
}
