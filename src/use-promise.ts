import { useState } from 'react'
import { withAbortSignal } from 'extra-abort'
import { isntUndefined, getErrorResultPromise } from '@blackglory/prelude'
import { useEffectAsync } from './use-effect-async.js'

export function usePromise<T>(promise: PromiseLike<T>): T | undefined {
  const [result, setResult] = useState<T>()

  // React强制要求状态更新不能发生在组件加载时, 因此不能使用`useIIFEAsync()`.
  useEffectAsync(async signal => {
    setResult(undefined)

    const [error, result] = await withAbortSignal(
      signal
    , () => getErrorResultPromise(promise)
    )

    setResult(() => {
      if (isntUndefined(error)) {
        // 将异步错误转变为同步错误.
        throw error
      } else {
        return result
      }
    })
  }, [promise])

  return result
}
