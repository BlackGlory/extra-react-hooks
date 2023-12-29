import { useEffect, DependencyList } from 'react'
import { go, pass } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'
import { CustomError } from '@blackglory/errors'

class InternalAbortError extends CustomError {}

export function useEffectAsync(
  effect: (signal: AbortSignal) => Promise<void>
, deps?: DependencyList
): void {
  useEffect(() => {
    const controller = new AbortController()

    go(async () => {
      try {
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
