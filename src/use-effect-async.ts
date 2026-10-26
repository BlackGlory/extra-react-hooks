import { useEffect } from 'react'
import { go, pass } from '@blackglory/prelude'
import { AbortController } from 'extra-abort'
import { InternalAbortError } from './utils.js'

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
          // 预期effect会捕获自身产生的错误, 如果未能捕获, 则让程序崩溃.
          throw err
        }
      }
    })

    return () => controller.abort(new InternalAbortError())
  }, deps)
}
