import { useMemo, useEffect } from 'react'

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

  useEffect(() => {
    return () => cleanup(value)
  }, deps)

  return value
}
