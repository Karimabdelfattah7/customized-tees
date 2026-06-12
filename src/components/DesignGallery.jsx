// DesignGallery.jsx
// ---------------------------------------------------------------
// The searchable design wall on the Shop page.
//
// HOW THE IMAGES WORK (important):
//   Each category is a real folder inside  public/shop/<category>/
//   You drop your design pictures in there named by NUMBER only:
//       public/shop/couples/1.jpg
//       public/shop/couples/2.jpg   ... and so on, no gaps.
//   The page loads them automatically — 1, then 2, then 3 — and
//   stops at the first missing number. JPG, PNG and WEBP all work.
//
//   Until you add your own images to a folder, that category shows
//   the older sample designs as a fallback so the shop isn't empty.
// ---------------------------------------------------------------

import { useMemo, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { designs } from '../data/designs.js'
import Reveal from './Reveal.jsx'

// The categories, in the order they appear on the page.
//   slug     = the folder name under public/shop/
//   label    = the heading shown to customers
//   fallback = which sample category to show until you add your own
const CATEGORIES = [
  { slug: 'rappers',   label: 'Rappers',   fallback: 'rap' },
  { slug: 'anime',     label: 'Anime',     fallback: 'anime' },
  { slug: 'nba',       label: 'NBA',       fallback: 'nba' },
  { slug: 'football',  label: 'Football',  fallback: 'football' },
  { slug: 'cartoon',   label: 'Cartoon',   fallback: 'cartoon' },
  { slug: 'couples',   label: 'Couples',   fallback: 'couples' },
  { slug: 'kids',      label: 'Kids',      fallback: 'kids' },
  { slug: 'gaming',    label: 'Gaming',    fallback: 'gaming' },
  { slug: 'movies',    label: 'Movies',    fallback: 'movies' },
  { slug: 'memes',     label: 'Memes',     fallback: 'memes' },
  { slug: 'memorial',  label: 'Memorial',  fallback: 'memorial' },
  { slug: 'birthdays', label: 'Birthdays', fallback: 'birthdays' }
]

// A brand color + icon per category, used for the fallback tile
// behind every image (so a slow/broken image never looks empty).
const CATEGORY_LOOK = {
  rappers:   { grad: ['#FF2D87', '#7a1e8a'], icon: '🎤' },
  anime:     { grad: ['#FF6B00', '#E91E63'], icon: '🌀' },
  nba:       { grad: ['#FF8C00', '#222'],    icon: '🏀' },
  football:  { grad: ['#8B4513', '#FF6B00'], icon: '🏈' },
  cartoon:   { grad: ['#00AAFF', '#FF2D87'], icon: '🎨' },
  couples:   { grad: ['#FF1493', '#6B2BB5'], icon: '💕' },
  kids:      { grad: ['#FFD23F', '#FF6B00'], icon: '🧸' },
  gaming:    { grad: ['#7C3AED', '#00AAFF'], icon: '🎮' },
  movies:    { grad: ['#DC2626', '#0a0a0a'], icon: '🎬' },
  memes:     { grad: ['#22C55E', '#0066cc'], icon: '😂' },
  memorial:  { grad: ['#6B7280', '#0a0a0a'], icon: '🕊' },
  birthdays: { grad: ['#FF6B00', '#00AAFF'], icon: '🎂' }
}

// File extensions we try for each numbered image.
const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'PNG', 'JPEG', 'WEBP']

// Checks whether one image (e.g. shop/couples/3.jpg) exists by trying
// to load it. Resolves to the working URL, or false if none found.
function tryImage(slug, n) {
  return new Promise((resolve) => {
    let i = 0
    const next = () => {
      if (i >= EXTS.length) return resolve(false)
      const url = `shop/${slug}/${n}.${EXTS[i]}`
      const img = new Image()
      img.onload = () => resolve(url)
      img.onerror = () => { i++; next() }
      img.src = url
    }
    next()
  })
}

// Loads 1, 2, 3 … for a category until a number is missing.
async function probeCategory(slug, max = 100) {
  const found = []
  for (let n = 1; n <= max; n++) {
    const url = await tryImage(slug, n)
    if (!url) break
    found.push(url)
  }
  return found
}

export default function DesignGallery() {
  const [rawQuery, setRawQuery] = useState('')
  const [query, setQuery] = useState('')

  // Images found in your public/shop/<slug>/ folders, per category.
  const [ownImages, setOwnImages] = useState({})

  // Debounce the search box (200ms) so typing stays smooth.
  const timer = useRef(null)
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setQuery(rawQuery.toLowerCase().trim()), 200)
    return () => clearTimeout(timer.current)
  }, [rawQuery])

  // Let the theme cards higher on the page drive the search box.
  useEffect(() => {
    const onThemeSearch = (e) => {
      setRawQuery(e.detail)
      setQuery(e.detail.toLowerCase().trim())
    }
    window.addEventListener('ct-search', onThemeSearch)
    return () => window.removeEventListener('ct-search', onThemeSearch)
  }, [])

  // On first load, scan every category folder for numbered images.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const map = {}
      for (const cat of CATEGORIES) {
        map[cat.slug] = await probeCategory(cat.slug)
      }
      if (!cancelled) setOwnImages(map)
    })()
    return () => { cancelled = true }
  }, [])

  // The old scraped designs, grouped by category (used as fallback).
  const grouped = useMemo(() => {
    const g = {}
    for (const d of designs) (g[d.category] ||= []).push(d)
    return g
  }, [])

  // Build the final list of items for one category: your own folder
  // images if you've added any, otherwise the sample fallback set.
  const itemsForCategory = (cat) => {
    const own = ownImages[cat.slug] || []
    if (own.length > 0) {
      return own.map((url, i) => ({
        id: `${cat.slug}-own-${i}`,
        title: `${cat.label} #${i + 1}`,
        image: url,
        category: cat.slug,
        tags: [cat.slug, cat.label.toLowerCase()],
        description: `Custom ${cat.label} design — pick it in-store and we'll print it on your garment.`
      }))
    }
    // fallback to the scraped sample designs for this category
    return (grouped[cat.fallback] || []).map((d) => ({ ...d, category: cat.slug }))
  }

  // Does an item match the current search text?
  const matches = (d) => {
    if (!query) return true
    const hay = (d.title + ' ' + (d.description || '') + ' ' + d.tags.join(' ') + ' ' + d.category).toLowerCase()
    return hay.includes(query)
  }

  // Build all visible sections (so we can also show a total count).
  const sections = CATEGORIES.map((cat) => ({
    cat,
    items: itemsForCategory(cat).filter(matches)
  })).filter((s) => s.items.length > 0)

  const visibleCount = sections.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <section className="block" id="designs">
      <div className="container">
        <Reveal>
          <div className="section-title">
            <div className="kicker">Browse Designs</div>
            <h2>Shop By <span className="accent-orange">Category</span></h2>
            <p>Search by name or category — then bring it in and we'll press it on the spot.</p>
          </div>
        </Reveal>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            id="design-search"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search designs… (e.g. 'couples', 'rappers', 'birthday')"
            aria-label="Search designs"
            autoComplete="off"
          />
          {rawQuery && (
            <button id="search-clear" aria-label="Clear search"
              onClick={() => { setRawQuery(''); setQuery('') }}>✕</button>
          )}
        </div>

        {query && (
          <p className="search-results-count" aria-live="polite">
            Showing {visibleCount} design{visibleCount === 1 ? '' : 's'} for “{query}”
          </p>
        )}

        {/* Category sections */}
        {sections.map(({ cat, items }) => {
          const look = CATEGORY_LOOK[cat.slug] || { grad: ['#FF6B00', '#00AAFF'], icon: '👕' }
          return (
            <div className="design-section" key={cat.slug} data-category={cat.slug}>
              <h3 className="design-section__heading">
                {cat.label}
                <span className="count">{items.length}</span>
              </h3>

              <div className="design-grid">
                {items.map((d) => (
                  <article className="design-card" key={d.id} data-category={d.category}>
                    <div
                      className="design-card__image-wrap"
                      style={{ background: `linear-gradient(150deg, ${look.grad[0]}, ${look.grad[1]})` }}
                    >
                      <span className="design-card__icon" aria-hidden="true">{look.icon}</span>
                      <span className="design-card__name-overlay">{d.title}</span>
                      {d.image && (
                        <img
                          className="design-card__img"
                          src={d.image}
                          alt={d.title}
                          loading="lazy"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      )}
                    </div>

                    <div className="design-card__info">
                      <h4 className="design-card__title">{d.title}</h4>
                      {d.description && <p className="design-card__description">{d.description}</p>}
                      <div className="design-card__footer">
                        <Link
                          className="btn design-card__cta"
                          to={`/customize?design=${encodeURIComponent(d.title)}`}
                        >
                          Order This Design
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}

        {query && visibleCount === 0 && (
          <p className="no-results">
            No designs match “{query}”. Try another word — or{' '}
            <Link to="/customize" className="accent-orange">tell us your idea</Link> and
            we'll make it from scratch.
          </p>
        )}
      </div>
    </section>
  )
}
