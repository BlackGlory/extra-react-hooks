import { useMemo, useEffect } from 'react'

export function useMemoWithCleanup<T>(
  factory: () => T
, cleanup: (value: T) => void
, deps?: React.DependencyList
): T {
  const value = useMemo(factory, deps)

  useEffect(() => {
    return () => cleanup(value)
  }, deps)

  return value
}
