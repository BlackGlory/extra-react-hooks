import { useRef } from 'react'
import { useIsFirstRender } from './use-is-first-render.js'
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js'

export function useIIFE(
  iife: (() => () => void)
      | (() => void)
, deps?: React.DependencyList
): void {
  const isFirstRender = useIsFirstRender()
  const oldDeps = useRef<React.DependencyList>([])
  const cleanup = useRef<(() => void) | void>(undefined)

  useIsomorphicLayoutEffect(() => {
    return () => {
      cleanup.current?.()
      cleanup.current = undefined
    }
  }, [])

  if (
    !deps ||
    isFirstRender() ||
    deps.length !== oldDeps.current.length ||
    deps.some((x, i) => x !== oldDeps.current[i])
  ) {
    cleanup.current?.()
    cleanup.current = iife()

    oldDeps.current = deps
                    ? [...deps]
                    : []
  }
}
