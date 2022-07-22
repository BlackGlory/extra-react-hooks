import { useEffect } from 'react'

export function useUnmount(effect: () => void): void {
  useEffect(() => effect, [])
}
