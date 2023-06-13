import { useRef, useCallback } from 'react'
import { useForceUpdate } from './use-force-update.js'

export function useGetSet<T>(
  initialValue: T
): [get: () => T, set: (value: T) => void] {
  const forceUpdate = useForceUpdate()
  const ref = useRef<T>(initialValue)

  return [
    useCallback(() => ref.current, [])
  , useCallback((value: T) => {
      if (ref.current !== value) {
        ref.current = value
        forceUpdate()
      }
    }, [])
  ]
}
