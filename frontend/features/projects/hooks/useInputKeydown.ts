import { useEffect, useRef } from 'react'

export default function useInputKeydown() {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }

    // Invoke(Listener) keydown.
    window.addEventListener('keydown', handleKeydown)

    // Cleanup keydown.
    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return {
    searchRef
  }
}
