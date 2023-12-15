import { useEffect, RefObject, MutableRefObject } from 'react'
import { assert, isArray, isntNull } from '@blackglory/prelude'

export function useIntersectionObserver(
  callback: IntersectionObserverCallback
, options: IntersectionObserverInit | undefined
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
, deps?: React.DependencyList
): void
export function useIntersectionObserver(
  callback: IntersectionObserverCallback
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
, deps?: React.DependencyList
): void
export function useIntersectionObserver(...args:
| [
    callback: IntersectionObserverCallback
  , options: IntersectionObserverInit | undefined
  , refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
  , deps?: React.DependencyList
  ]
| [
    callback: IntersectionObserverCallback
  , refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
  , deps?: React.DependencyList
  ]
): void {
  switch (args.length) {
    case 2: {
      const [callback, refs] = args

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useIntersectionObserver(callback, undefined, refs)
    }
    case 3: {
      const [callback, optionsOrRefs, refsOrDeps] = args
      if (isArray(optionsOrRefs)) {
        const refs = optionsOrRefs
        const deps = refsOrDeps as React.DependencyList | undefined

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useIntersectionObserver(callback, undefined, refs, deps)
      } else {
        const options = optionsOrRefs
        const refs = refsOrDeps as Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useIntersectionObserver(callback, options, refs)
      }
    }
  }

  const [callback, options, refs, deps] = args

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    refs
      .map(x => x.current)
      .filter(isntNull)
      .forEach(x => observer.observe(x))

    return () => observer.disconnect()
  }, deps)
}
