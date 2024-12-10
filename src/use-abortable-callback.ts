import { useCallback, DependencyList } from 'react'
import { AbortController, raceAbortSignals, AbortSignal } from 'extra-abort'
import { last } from 'extra-utils'
import { useMemoWithCleanup } from './use-memo-with-cleanup.js'

export function useAbortableCallback<Args extends unknown[], Result>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Result
, deps: DependencyList
, isAbortSignal: (value: unknown) => boolean = signal => signal instanceof AbortSignal
): (...args: [...args: Args, signal?: AbortSignal]) => Result {
  const controller = useMemoWithCleanup(
    () => new AbortController()
  , controller => controller.abort()
  , deps
  )

  return useCallback((...args: [...args: Args, signal?: AbortSignal]) => {
    controller.signal.throwIfAborted()

    const lastArg = last(args)
    if (isAbortSignal(lastArg)) {
      const signal = lastArg as AbortSignal
      const realArgs = args.slice(0, -1) as Args

      return callback(
        ...realArgs
      , raceAbortSignals([signal, controller.signal])
      )
    } else {
      return callback(
        ...args as unknown as Args
      , controller.signal
      )
    }
  }, deps)
}
