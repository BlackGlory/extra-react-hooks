import { EffectCallback } from 'react'
import { useIsFirstRender } from './use-is-first-render.js'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js'

export function useUpdateLayoutEffect(
  effect: EffectCallback
, deps?: React.DependencyList
): void {
  const isFirstRender = useIsFirstRender()

  useIsomorphicLayoutEffect(() => {
    if (!isFirstRender()) {
      return effect()
    }
  }, deps)
}
