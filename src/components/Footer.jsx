// Footer.jsx
// ---------------------------------------------------------------
// The colored strip at the very bottom of every page.
// Has the store name, quick links, locations, and contact info.
// ---------------------------------------------------------------

import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand + tagline + social icons */}
          <div>
            {/* Tie-dye logo (from logo.png) with styled-text fallback */}
            <div className="brand-foot">
              <Logo height={96} />
            </div>
            <div className="tag">Custom Tees. Your Way.</div>
            {/* Social links — open in a new tab. Update the URLs if the
                store's handle ever changes. Uses real SVG icons (not
                emoji) so they look crisp at any size and read well to
                screen readers. */}
            <div className="social">
              <a
                href="https://www.instagram.com/Customized_Tees77/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Customized Tees on Instagram"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/customizedtees502"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Customized Tees on Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Page links */}
          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/customize">Customize</Link>
            <Link to="/about">Find Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Column 3: Both store locations */}
          <div>
            <h4>Locations</h4>
            <p>5000 Shelbyville Rd #1760,<br />St Matthews, KY 40207</p>
            <p>4801 Outer Loop a268,<br />Louisville, KY 40219</p>
          </div>

          {/* Column 4: Contact links (clickable on phone) */}
          <div>
            <h4>Contact</h4>
            <a href="mailto:customizedtees502@gmail.com">customizedtees502@gmail.com</a>
            <a href="tel:5022323703">502-232-3703</a>
          </div>
        </div>

        <div className="copy">
          © 2025 Customized Tees. Louisville, KY. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
