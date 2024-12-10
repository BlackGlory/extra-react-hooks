import { useCallback, DependencyList } from 'react'
import { AbortController, raceAbortSignals } from 'extra-abort'
import { useMemoWithCleanup } from './use-memo-with-cleanup.js'

export function useAbortableCallback<Args extends unknown[], Result>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => PromiseLike<Result>
, deps: DependencyList
): (...args: [...args: Args, signal: AbortSignal]) => Promise<Result> {
  const controller = useMemoWithCleanup(
    () => new AbortController()
  , controller => controller.abort()
  , deps
  )

  return useCallback(async (...args: [...args: Args, signal: AbortSignal]) => {
    const signal = raceAbortSignals([
      args[args.length - 1] as AbortSignal
    , controller.signal
    ])
    signal.throwIfAborted()

    const realArgs = args.slice(0, -1) as Args

    return await callback(...realArgs, signal)
  }, [controller, ...deps])
}
