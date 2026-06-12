// ThemeContext.jsx
// ---------------------------------------------------------------
// This file controls the LIGHT / DARK mode toggle.
//
// How it works in plain English:
//   1. We remember the user's choice (light or dark) in the browser
//      so when they come back next time, it's still set the way they
//      left it.
//   2. We put a class name ("light" or "dark") on the <html> tag.
//      The CSS file uses those class names to switch all the colors.
//   3. Any component can ask "what is the current theme?" or
//      "toggle the theme" by calling useTheme().
// ---------------------------------------------------------------

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Read the saved theme from the browser, or default to "light"
  const [theme, setTheme] = useState(() => {
    // Default to DARK mode. The user's saved preference (if any) wins.
    return localStorage.getItem('ct-theme') || 'dark'
  })

  // Whenever the theme changes, update the <html> tag and save it.
  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('ct-theme', theme)
  }, [theme])

  // Flip between light and dark
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Helper so any component can do: const { theme, toggle } = useTheme()
export function useTheme() {
  return useContext(ThemeContext)
}
