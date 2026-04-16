import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()
const STORAGE_KEY = 'teraby-theme'

export function ThemeProvider({ children }) {
  // Lazy initializer: read from localStorage ONCE on mount
  // Default to dark if nothing saved (brand-first dark experience)
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved !== null ? saved === 'dark' : true
    } catch {
      return true
    }
  })

  // Apply classes AND persist every time isDark changes
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (isDark) {
      root.classList.add('dark')
      root.classList.remove('light')
      body.classList.add('theme-dark')
      body.classList.remove('theme-light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      body.classList.add('theme-light')
      body.classList.remove('theme-dark')
    }
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
    } catch {
      // localStorage unavailable — ignore silently
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
