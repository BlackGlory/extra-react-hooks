import { CustomError, go, pass } from '@blackglory/prelude'
import { useIIFE } from './use-iife.js'

class InternalAbortError extends CustomError {}

export function useIIFEAsync(
  iife: (signal: AbortSignal) => PromiseLike<void>
, deps?: React.DependencyList
): void {
  useIIFE(() => {
    const controller = new AbortController()

    go(async () => {
      try {
        controller.signal.throwIfAborted()

        await iife(controller.signal)
      } catch (err) {
        if (err instanceof InternalAbortError) {
          pass()
        } else {
          throw err
        }
      }
    })

    return () => controller.abort(new InternalAbortError())
  }, deps)
}
