import { useCallback, DependencyList } from 'react'
import { AbortController } from 'extra-abort'
import { useMemoWithCleanup } from './use-memo-with-cleanup.js'

export function useAbortableCallback<Args extends unknown[], Result>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Result
, deps: DependencyList
): (...args: Args) => Result {
  const controller = useMemoWithCleanup(
    () => new AbortController()
  , controller => controller.abort()
  , deps
  )

  return useCallback((...args) => {
    controller.signal.throwIfAborted()

    return callback(...args, controller.signal)
  }, deps)
}
