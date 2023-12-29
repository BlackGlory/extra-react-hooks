import { useEffect, DependencyList } from 'react'
import { go } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'

const symbolAbort = Symbol()

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
        if (err !== symbolAbort) throw err
      }
    })

    return () => controller.abort(symbolAbort)
  }, deps)
}
