import { useRef } from 'react'
import { useIsFirstRender } from '@src/use-is-first-render'

export function useIIFE(iife: () => void, deps: React.DependencyList): void {
  const oldDeps = useRef<React.DependencyList>([])
  const isFirstRender = useIsFirstRender()

  if (isFirstRender()) {
    iife()
  } else {
    if (deps.length === oldDeps.current.length) {
      if (deps.some((x, i) => x !== oldDeps.current[i])) {
        iife()
      }
    } else {
      iife()
    }
  }

  oldDeps.current = Array.from(deps)
}
