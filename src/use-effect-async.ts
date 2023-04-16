import { useEffect, DependencyList } from 'react'
import { go } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'

const abort = Symbol()

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
        if (err !== abort) throw err
      }
    })

    return () => controller.abort()
  }, deps)
}
