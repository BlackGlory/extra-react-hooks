import { useCallback, DependencyList } from 'react'
import { go, pass } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'
import { useMemoWithCleanup } from './use-memo-with-cleanup.js'
import { CustomError } from '@blackglory/errors'

class InternalAbortError extends CustomError {}

export function useCallbackAsync<Args extends unknown[]>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Promise<void>
, deps: DependencyList
): (...args: Args) => void {
  const controller = useMemoWithCleanup(
    () => new AbortController()
  , controller => controller.abort(new InternalAbortError())
  , deps
  )

  return useCallback((...args: Args) => {
    go(async () => {
      try {
        await callback(...args, controller.signal)
      } catch (err) {
        if (err instanceof InternalAbortError) {
          pass()
        } else {
          throw err
        }
      }
    })
  }, deps)
}
