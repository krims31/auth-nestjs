import { useContext } from 'react'
import { ThemeContext } from '../Theme/ThemeProvider'

export default function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme should to use inside ThemeProvider')
  }
  return context
}
