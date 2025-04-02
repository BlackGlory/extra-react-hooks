import { useEffect } from 'react'
import { go, pass } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'
import { CustomError } from '@blackglory/errors'

class InternalAbortError extends CustomError {}

export function useEffectAsync(
  effect: (signal: AbortSignal) => PromiseLike<void>
, deps?: React.DependencyList
): void {
  useEffect(() => {
    const controller = new AbortController()

    go(async () => {
      try {
        controller.signal.throwIfAborted()

        await effect(controller.signal)
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
