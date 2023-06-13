import { useCallback, DependencyList } from 'react'
import { go } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'
import { useMemoWithCleanup } from './use-memo-with-cleanup.js'

const symbolAbort = Symbol()

export function useCallbackAsync<Args extends unknown[]>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Promise<void>
, deps: DependencyList
): (...args: Args) => void {
  const controller = useMemoWithCleanup(
    () => new AbortController()
  , controller => controller.abort(symbolAbort)
  , deps
  )

  return useCallback((...args: Args) => {
    go(async () => {
      try {
        await callback(...args, controller.signal)
      } catch (err) {
        if (err !== symbolAbort) throw err
      }
    })
  }, deps)
}
