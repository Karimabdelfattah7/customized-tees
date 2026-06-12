// main.jsx — the very first file React runs.
// It just plugs the <App /> component into the empty <div id="root"> in index.html.

import React from 'react'
import ReactDOM from 'react-dom/client'
// HashRouter (not HashRouter) is used so the site works both
// when hosted on a server AND when double-clicked locally as a
// file. URLs look like /#/shop instead of /shop.
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter lets us have multiple pages (Home, About, Customize, Contact) */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
