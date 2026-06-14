// App.jsx
// ---------------------------------------------------------------
// The "main shell" of the website. Wraps every page with:
//   - the Navbar at the top
//   - the Footer at the bottom
//   - a thin scroll progress bar that fills as you scroll the page
//   - a custom cursor dot that grows when hovering over links/buttons
// ---------------------------------------------------------------

import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext.jsx'

// Whenever the page (route) changes, jump to the very top. This makes
// clicking the logo — or any nav link — land you at the top of the
// new page instead of keeping your old scroll position.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import Customize from './pages/Customize.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {

  // ------- Scroll progress bar (fills the bar at the top of the
  //         viewport as the visitor scrolls down) -------
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0
      bar.style.width = pct + '%'
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <ThemeProvider>
      {/* Skip link — keyboard users can jump straight to the main
          content, skipping the navbar. Hidden until focused. */}
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* The little bar at the very top that fills as you scroll */}
      <div id="scroll-progress" />

      <ScrollToTop />
      <Navbar />

      <main id="main">
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/shop"      element={<Shop />} />
        <Route path="/about"     element={<About />} />
        {/* Old "locations" page no longer exists — anyone landing on
            /locations is bounced to the About / Find Us page. */}
        <Route path="/locations" element={<Navigate to="/about" replace />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/contact"   element={<Contact />} />
      </Routes>
      </main>

      <Footer />
    </ThemeProvider>
  )
}
