import { useMemo } from 'react'
import { useIIFE } from './use-iife.js'

export function useMemoWithCleanup<T>(
  factory: () => T
, cleanup: (value: T) => void
, deps?: React.DependencyList
): T {
  const value = useMemo(
    factory
    // @ts-ignore
  , deps
  )

  useIIFE(() => {
    return () => cleanup(value)
  }, deps)

  return value
}
