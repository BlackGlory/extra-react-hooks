import { useLayoutEffect, useCallback, useMemo, DependencyList } from 'react'
import { go } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'

const abort = Symbol()

export function useCallbackAsync<Args extends unknown[]>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Promise<void>
, deps: DependencyList
): (...args: Args) => void {
  const controller = useMemo(() => new AbortController(), deps)
  useLayoutEffect(() => {
    return () => controller.abort(abort)
  }, [controller])

  return useCallback((...args: Args) => {
    go(async () => {
      try {
        await callback(...args, controller.signal)
      } catch (err) {
        if (err !== abort) throw err
      }
    })
  }, [controller])
}
