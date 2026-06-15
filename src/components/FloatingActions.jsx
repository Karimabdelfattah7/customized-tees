// FloatingActions.jsx
// ---------------------------------------------------------------
// Two floating helpers that appear on every page:
//   1. A "Contact" button (bottom-right) that opens a little menu to
//      Text, Call, WhatsApp, or Email the store in one tap.
//   2. A "Back to top" button (also bottom-right) that appears once
//      the visitor scrolls down.
//
// To change the phone number or remove WhatsApp, edit the values
// just below.
// ---------------------------------------------------------------

import { useState, useEffect } from 'react'

const PHONE = '5022323703'        // digits only
const PHONE_INTL = '15022323703'  // with US country code, for WhatsApp
const EMAIL = 'customizedtees502@gmail.com'

export default function FloatingActions() {
  const [open, setOpen] = useState(false)     // contact menu open?
  const [showTop, setShowTop] = useState(false) // show back-to-top?

  // Reveal the back-to-top button after scrolling down a bit.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fab-wrap">
      {/* Back to top */}
      {showTop && (
        <button
          className="fab fab-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}

      {/* The little contact menu (shown when open) */}
      {open && (
        <div className="fab-menu" role="menu">
          <a className="fab-item text" href={`sms:${PHONE}`}>
            <span className="fab-ico">💬</span> Text Us
          </a>
          <a className="fab-item call" href={`tel:+${PHONE_INTL}`}>
            <span className="fab-ico">📞</span> Call Us
          </a>
          <a
            className="fab-item whats"
            href={`https://wa.me/${PHONE_INTL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab-ico">🟢</span> WhatsApp
          </a>
          <a className="fab-item email" href={`mailto:${EMAIL}`}>
            <span className="fab-ico">✉️</span> Email
          </a>
        </div>
      )}

      {/* Main contact button */}
      <button
        className={'fab fab-main ' + (open ? 'is-open' : '')}
        aria-label={open ? 'Close contact menu' : 'Contact us'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
