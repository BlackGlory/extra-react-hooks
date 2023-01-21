import { useEffect, EffectCallback } from 'react'
import { useIsFirstRender } from './use-is-first-render.js'

export function useUpdateEffect(
  effect: EffectCallback
, deps?: React.DependencyList
): void {
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (!isFirstRender()) {
      return effect()
    }
  }, deps)
}
