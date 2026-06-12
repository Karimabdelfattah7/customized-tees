// Navbar.jsx
// ---------------------------------------------------------------
// The bar that sticks to the top of every page.
// Shows: the store name on the left, the page links in the middle,
// a search icon, a sun/moon button to switch light/dark mode, and a
// hamburger menu for phones.
// ---------------------------------------------------------------

import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../ThemeContext.jsx'
import Logo from './Logo.jsx'

export default function Navbar() {
  // Is the phone menu open? (true / false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Get the current theme and the function to flip it
  const { theme, toggle } = useTheme()

  // Lets us jump to another page when the search icon is clicked
  const navigate = useNavigate()

  // List of pages. Easy to edit later — just add/remove items.
  const links = [
    { to: '/',          label: 'Home' },
    { to: '/shop',      label: 'Shop' },
    { to: '/customize', label: 'Customize' },
    { to: '/about',     label: 'Find Us' },
    { to: '/contact',   label: 'Contact' }
  ]

  // Clicking the magnifying glass: go to the Shop page, scroll to the
  // design gallery, and put the cursor in the search box ready to type.
  const goSearch = () => {
    setMenuOpen(false)
    navigate('/shop')
    // Wait a moment for the Shop page to render, then focus the box.
    setTimeout(() => {
      const box = document.getElementById('design-search')
      if (box) {
        box.scrollIntoView({ behavior: 'smooth', block: 'center' })
        box.focus()
      }
    }, 250)
  }

  // The magnifying-glass icon (SVG, not an emoji — stays crisp)
  const SearchIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
         stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Store name on the left — tie-dye lettering from your logo
              image (or styled text if the image isn't added yet). */}
          <NavLink to="/" className="brand" aria-label="Customized Tees — home">
            <Logo height={84} />
          </NavLink>

          {/* Desktop links (hidden on phones) */}
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end>{l.label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Right side: search + theme toggle + hamburger */}
          <div className="nav-right">
            <button
              className="icon-btn"
              onClick={goSearch}
              aria-label="Search designs"
              title="Search designs"
            >
              <SearchIcon />
            </button>

            <button
              className="theme-btn"
              onClick={toggle}
              aria-label="Switch light/dark mode"
              title="Switch light/dark mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Phone slide-in menu */}
      <div className={'mobile-menu ' + (menuOpen ? 'open' : '')}>
        <button className="close" onClick={() => setMenuOpen(false)}>✕</button>

        {/* Search row inside the mobile menu too */}
        <button className="mobile-search" onClick={goSearch}>
          <SearchIcon /> Search Designs
        </button>

        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
