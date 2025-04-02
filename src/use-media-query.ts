import { useState, useMemo } from 'react'
import { useIIFE } from './use-iife.js'

export function useMediaQuery(query: string): boolean {
  const mediaQuery = useMemo(() => matchMedia(query), [query])
  const [matches, setMatches] = useState<boolean>(mediaQuery.matches)

  useIIFE(() => {
    mediaQuery.addEventListener('change', updateMatches)
    return () => mediaQuery.removeEventListener('change', updateMatches)

    function updateMatches(): void {
      setMatches(mediaQuery.matches)
    }
  }, [mediaQuery])

  return matches
}
