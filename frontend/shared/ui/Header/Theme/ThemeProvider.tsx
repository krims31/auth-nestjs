'use client'

import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { ThemeContextType } from './interface/ThemeContextType'

export const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== undefined) {
      return localStorage.getItem('app-color-theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    localStorage.setItem('app-color-theme', theme)

    document.documentElement.setAttribute('dark-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
