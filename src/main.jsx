import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Set --vh CSS variable for correct mobile viewport height
// Prevents reflows when iOS Safari shows/hides the address bar
function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
}
setVh()
window.addEventListener('resize', setVh, { passive: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
