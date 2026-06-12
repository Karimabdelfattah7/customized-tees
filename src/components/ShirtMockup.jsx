// ShirtMockup.jsx
// ---------------------------------------------------------------
// Draws a blank t-shirt / hoodie / hat shape in any color and
// stamps "YOUR DESIGN HERE" on the chest. No people, no photos —
// just a clean illustration so customers see the canvas they get.
//
// How to use:
//   <ShirtMockup color="#FF6B00" type="tee" />
//   <ShirtMockup color="#000000" type="hoodie" />
//   <ShirtMockup color="#FFFFFF" type="hat" />
//   <ShirtMockup color="#0a66ff" type="long" />   (long sleeve)
//   <ShirtMockup color="#888"    type="crew" />   (crew neck sweatshirt)
// ---------------------------------------------------------------

export default function ShirtMockup({ color = '#222', type = 'tee', label = 'YOUR DESIGN HERE' }) {
  // Pick text color so light shirts get dark text and vice versa.
  // Quick brightness check on the hex color:
  const isLight = ((c) => {
    const h = c.replace('#', '')
    const n = h.length === 3 ? h.split('').map(x => x + x).join('') : h
    const r = parseInt(n.slice(0, 2), 16)
    const g = parseInt(n.slice(2, 4), 16)
    const b = parseInt(n.slice(4, 6), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 160
  })(color)
  const ink = isLight ? '#111' : '#fff'

  // ===== HAT shape =====
  if (type === 'hat') {
    return (
      <svg viewBox="0 0 200 200" className="mockup" aria-label="Hat mockup">
        {/* Brim */}
        <ellipse cx="100" cy="155" rx="92" ry="14" fill={color} stroke={ink} strokeOpacity=".25" strokeWidth="1" />
        {/* Crown */}
        <path d="M30 150 Q30 70 100 60 Q170 70 170 150 Z" fill={color} stroke={ink} strokeOpacity=".25" strokeWidth="1" />
        {/* Front panel label area */}
        <rect x="65" y="95" width="70" height="34" fill="none" stroke={ink} strokeOpacity=".35" strokeDasharray="4 4" />
        <text x="100" y="116" fontFamily="Bebas Neue, sans-serif" fontSize="11" letterSpacing="1" fill={ink} textAnchor="middle">{label}</text>
      </svg>
    )
  }

  // ===== HOODIE shape =====
  if (type === 'hoodie') {
    return (
      <svg viewBox="0 0 240 280" className="mockup" aria-label="Hoodie mockup">
        {/* Body */}
        <path d="M40 70 L40 260 L200 260 L200 70 L165 50 Q150 90 120 90 Q90 90 75 50 Z"
              fill={color} stroke={ink} strokeOpacity=".25" strokeWidth="1.5" />
        {/* Sleeves */}
        <path d="M40 70 L8 200 L40 215 Z"   fill={color} stroke={ink} strokeOpacity=".25" />
        <path d="M200 70 L232 200 L200 215 Z" fill={color} stroke={ink} strokeOpacity=".25" />
        {/* Hood */}
        <path d="M75 50 Q120 5 165 50 Q150 70 120 70 Q90 70 75 50 Z"
              fill={color} stroke={ink} strokeOpacity=".3" />
        {/* Pocket */}
        <path d="M75 165 L165 165 L150 215 L90 215 Z" fill="none" stroke={ink} strokeOpacity=".25" />
        {/* Drawstrings */}
        <line x1="105" y1="55" x2="105" y2="100" stroke={ink} strokeOpacity=".5" strokeWidth="2" />
        <line x1="135" y1="55" x2="135" y2="100" stroke={ink} strokeOpacity=".5" strokeWidth="2" />
        {/* Design area */}
        <rect x="75" y="105" width="90" height="50" fill="none" stroke={ink} strokeOpacity=".4" strokeDasharray="4 4" />
        <text x="120" y="135" fontFamily="Bebas Neue, sans-serif" fontSize="13" letterSpacing="1.5" fill={ink} textAnchor="middle">{label}</text>
      </svg>
    )
  }

  // ===== LONG SLEEVE shape =====
  if (type === 'long') {
    return (
      <svg viewBox="0 0 280 280" className="mockup" aria-label="Long sleeve mockup">
        <path d="M60 60 L60 260 L220 260 L220 60 L185 40 Q170 70 140 70 Q110 70 95 40 Z"
              fill={color} stroke={ink} strokeOpacity=".25" strokeWidth="1.5" />
        {/* Long sleeves */}
        <path d="M60 60 L8 240 L48 250 L80 80 Z"     fill={color} stroke={ink} strokeOpacity=".25" />
        <path d="M220 60 L272 240 L232 250 L200 80 Z" fill={color} stroke={ink} strokeOpacity=".25" />
        <rect x="95" y="100" width="90" height="60" fill="none" stroke={ink} strokeOpacity=".4" strokeDasharray="4 4" />
        <text x="140" y="135" fontFamily="Bebas Neue, sans-serif" fontSize="13" letterSpacing="1.5" fill={ink} textAnchor="middle">{label}</text>
      </svg>
    )
  }

  // ===== CREW NECK shape (same body as tee but no print of collar ribbing) =====
  // ===== TEE shape (default) =====
  // Two design layers in the same SVG:
  //   1. base layer = dashed box + "YOUR DESIGN HERE" (always shown)
  //   2. hover layer = a colorful sample print (only shown on hover)
  // CSS swaps which one is visible via the parent .mock-wrap:hover.
  return (
    <svg viewBox="0 0 240 240" className="mockup" aria-label="Tee mockup">
      <defs>
        <linearGradient id="splat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FF6B00" />
          <stop offset="50%"  stopColor="#FF2D87" />
          <stop offset="100%" stopColor="#00AAFF" />
        </linearGradient>
      </defs>

      {/* Sleeves */}
      <path d="M40 60 L10 130 L45 145 L70 80 Z"     fill={color} stroke={ink} strokeOpacity=".25" />
      <path d="M200 60 L230 130 L195 145 L170 80 Z" fill={color} stroke={ink} strokeOpacity=".25" />
      {/* Body */}
      <path d="M70 60 L40 60 L40 220 L200 220 L200 60 L170 60 Q160 95 120 95 Q80 95 70 60 Z"
            fill={color} stroke={ink} strokeOpacity=".25" strokeWidth="1.5" />
      {/* Crew collar (only for crew type) */}
      {type === 'crew' && (
        <path d="M85 60 Q120 80 155 60" fill="none" stroke={ink} strokeOpacity=".4" strokeWidth="2" />
      )}

      {/* BASE LAYER — "Your design here" placeholder */}
      <g className="m-base">
        <rect x="75" y="105" width="90" height="60" fill="none" stroke={ink} strokeOpacity=".4" strokeDasharray="4 4" />
        <text x="120" y="140" fontFamily="Bebas Neue, sans-serif" fontSize="13" letterSpacing="1.5" fill={ink} textAnchor="middle">{label}</text>
      </g>

      {/* HOVER LAYER — sample colorful design (revealed on hover) */}
      <g className="m-hover">
        <ellipse cx="120" cy="135" rx="48" ry="32" fill="url(#splat)" opacity=".95" />
        <circle  cx="92"  cy="118" r="5"  fill="#FFD23F" />
        <circle  cx="150" cy="152" r="4"  fill="#FFFFFF" />
        <circle  cx="155" cy="120" r="3"  fill="#FFFFFF" opacity=".8" />
        <text x="120" y="140" fontFamily="Bebas Neue, sans-serif" fontSize="14" letterSpacing="2" fill="#fff" textAnchor="middle" style={{ textShadow: '0 1px 4px #000' }}>CUSTOM</text>
      </g>
    </svg>
  )
}
