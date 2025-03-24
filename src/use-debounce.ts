import { useRef, useEffect } from 'react'
import { setTimeout } from 'extra-timers'

export function useDebounce<Args extends unknown[]>(
  fn: (...args: Args) => void
, timeout: number
, deps?: React.DependencyList
): (...args: Args) => void {
  const fnRef = useRef<(...args: Args) => void>(fn)
  const cancelTimeoutRef = useRef<() => void>(undefined)

  useEffect(() => {
    fnRef.current = fn
  }, deps)

  return (...args: Args): void => {
    cancelTimeoutRef.current?.()

    cancelTimeoutRef.current = setTimeout(timeout, () => {
      fnRef.current(...args)

      cancelTimeoutRef.current = undefined
    })
  }
}
