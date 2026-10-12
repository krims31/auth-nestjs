import { useEffect, useRef } from 'react'

export default function useInputKeydown() {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

	return {
		searchRef
	}
}
