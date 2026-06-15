// Shop.jsx
// ---------------------------------------------------------------
// The "Shop" page — what customers browse before ordering.
//
// Two main sections:
//   1. THEMES — rap, anime, NBA, football, etc. (visual cards only,
//      clicking a theme doesn't navigate anywhere yet — that's a
//      future upgrade where each theme could have its own gallery).
//   2. PLAIN APPAREL — Gildan tees, hoodies, crew necks, long sleeves
//      and Valucap hats. Each item shows the available sizes and
//      color swatches the store stocks.
//
// To add/remove an item, edit the arrays at the top of this file.
// ---------------------------------------------------------------

import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ShirtMockup from '../components/ShirtMockup.jsx'
import DesignGallery from '../components/DesignGallery.jsx'

// ============ EDIT ME — Theme categories ============
// Add/remove entries here and the page updates automatically.
const themes = [
  { label: 'Rap',       icon: '🎤', tint: '#FF2D87' },
  { label: 'Anime',     icon: '🌀', tint: '#FF6B00' },
  { label: 'NBA',       icon: '🏀', tint: '#FF8C00' },
  { label: 'Football',  icon: '🏈', tint: '#8B4513' },
  { label: 'Cartoon',   icon: '🎨', tint: '#00AAFF' },
  { label: 'Couples',   icon: '💕', tint: '#FF1493' },
  { label: 'Kids',      icon: '🧸', tint: '#FFD23F' },
  { label: 'Gaming',    icon: '🎮', tint: '#7C3AED' },
  { label: 'Movies',    icon: '🎬', tint: '#DC2626' },
  { label: 'Memes',     icon: '😂', tint: '#22C55E' },
  { label: 'Memorial',  icon: '🕊',  tint: '#6B7280' },
  { label: 'Birthdays', icon: '🎂', tint: '#FF6B00' }
]

// ============ EDIT ME — Sizes the store stocks ============
const sizes = ['S', 'M', 'L', 'XL', '2X', '3X', '4X', '5X']

// ============ EDIT ME — Colors the store stocks ============
// Each color has a name and a HEX value for the swatch.
const colors = [
  { name: 'White',      hex: '#FFFFFF' },
  { name: 'Black',      hex: '#0a0a0a' },
  { name: 'Grey',       hex: '#7A7A7A' },
  { name: 'Pink',       hex: '#FFC0CB' },
  { name: 'Red',        hex: '#D7263D' },
  { name: 'Royal Blue', hex: '#1E4FD8' },
  { name: 'Orange',     hex: '#FF6B00' },
  { name: 'Purple',     hex: '#6B2BB5' }
]

// ============ EDIT ME — Apparel items ============
// "type" matches the shape drawn by ShirtMockup.jsx (tee, hoodie,
// crew, long, hat).
// "availableColors" is the list of color NAMES (must match the
// "name" field above) that this item is stocked in. The page
// automatically draws ONE mockup per color so the customer sees
// every option.
const items = [
  {
    type:  'tee',
    name:  'Short Sleeve Tee',
    note:  'Soft cotton/poly blend — our most popular blank.',
    availableColors: ['White','Black','Grey','Pink','Red','Royal Blue','Orange','Purple']
  },
  {
    type:  'hoodie',
    name:  'Hoodie',
    note:  'Heavyweight fleece with a drawstring hood.',
    availableColors: ['Black','White','Grey','Red','Royal Blue']
  },
  {
    type:  'crew',
    name:  'Crew Neck',
    note:  'Cozy without the hood — great for embroidery.',
    availableColors: ['Black','White']
  },
  {
    type:  'long',
    name:  'Long Sleeve',
    note:  'Same fit as the tee, with full sleeves.',
    availableColors: ['Black','White','Grey']
  },
  {
    type:  'hat',
    name:  'Hat',
    note:  'Unstructured cap, perfect for embroidered logos.',
    availableColors: ['Black','White','Grey','Red','Royal Blue','Orange']
  }
]

export default function Shop() {
  return (
    <div>
      {/* Top banner */}
      <div className="page-hero">
        <div className="container">
          <div className="kicker">Shop</div>
          <h1>Browse, Pick,<br />Customize.</h1>
          <p>Tap any theme to spark an idea, or pick a blank to print your own design on.</p>
        </div>
      </div>

      {/* ============ THEME CATEGORIES ============ */}
      <section className="block">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Themes</div>
              <h2>Shop By <span className="accent-orange">Vibe</span></h2>
              <p>We do thousands of designs across every fandom you can name. Don't see yours? Just ask.</p>
            </div>
          </Reveal>

          <div className="themes">
            {themes.map(t => (
              <Reveal
                key={t.label}
                className="theme-card"
                /* The "tint" color is passed to CSS via a custom property */
                /* so each card glows in its own color on hover.            */
                /* eslint-disable-next-line react/forbid-dom-props */
              >
                {/* Clicking a theme drops it into the design search
                    below and scrolls down to the results. */}
                <button
                  type="button"
                  className="theme-inner"
                  style={{ '--tint': t.tint }}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('ct-search', { detail: t.label }))
                    document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  aria-label={`Show ${t.label} designs`}
                >
                  <div className="ico">{t.icon}</div>
                  <div className="lbl">{t.label}</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SEARCHABLE DESIGN GALLERY ============
          Real designs grouped by category, with a live search box.
          Data comes from src/data/designs.js (scraped sample set). */}
      <DesignGallery />

      {/* ============ PLAIN APPAREL ============ */}
      <section className="block alt">
        <div className="container">
          <Reveal>
            <div className="section-title">
              <div className="kicker">Blanks We Stock</div>
              <h2>Your <span className="accent-blue">Canvas</span></h2>
              <p>
                Quality Gildan and Valucap blanks ready for your design. Available in
                sizes <strong>S through 5X</strong> and the colors below.
              </p>
            </div>
          </Reveal>

          {/* List of apparel items — each row is one product */}
          <div className="products">
            {items.map(item => {
              // Look up the full {name, hex} record for each color this
              // item is stocked in.
              const itemColors = item.availableColors
                .map(name => colors.find(c => c.name === name))
                .filter(Boolean)

              return (
                <Reveal key={item.name} className="product">
                  {/* Left: one big mockup per available color */}
                  <div
                    className="product-visuals"
                    /* CSS uses this number to decide how many mockups
                       sit on a row before wrapping. */
                    style={{ '--count': itemColors.length }}
                  >
                    {itemColors.map(c => (
                      <div key={c.name} className="mock-wrap" title={c.name}>
                        <ShirtMockup type={item.type} color={c.hex} />
                        <span className="mock-name">{c.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: product info */}
                  <div className="product-info">
                    <h3>{item.name}</h3>
                    <p className="muted">{item.note}</p>

                    <div className="opt-group">
                      <div className="opt-label">Sizes available</div>
                      <div className="sizes">
                        {sizes.map(s => <span key={s} className="size-pill">{s}</span>)}
                      </div>
                    </div>

                    <div className="opt-group">
                      <div className="opt-label">
                        Colors available ({itemColors.length})
                      </div>
                      <div className="swatches">
                        {itemColors.map(c => (
                          <span
                            key={c.name}
                            className="swatch"
                            title={c.name}
                            style={{ background: c.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <Link className="btn" to="/customize" state={{ scrollTo: 'order-form' }}>Customize This</Link>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ BULK NOTE ============ */}
      <section className="bulk-banner">
        <div className="container">
          <Reveal className="bulk-inner">
            <div className="bulk-ico">📦</div>
            <div className="bulk-text">
              <h2>Bulk Orders <span className="accent-orange">Welcome</span></h2>
              <p>
                Bulk pricing kicks in starting at <strong>15 shirts</strong>.
                Bigger order? Even better. We print fast — usually same day.
              </p>
            </div>
            <Link className="btn big" to="/customize" state={{ scrollTo: 'order-form' }}>Request Bulk Quote</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
