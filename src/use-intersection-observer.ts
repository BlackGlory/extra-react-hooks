import { useEffect, RefObject, MutableRefObject } from 'react'
import { isntNull } from '@blackglory/prelude'

export function useIntersectionObserver(
  callback: IntersectionObserverCallback
, options: IntersectionObserverInit | undefined
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
): void
export function useIntersectionObserver(
  callback: IntersectionObserverCallback
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
): void
export function useIntersectionObserver(...args:
| [
    callback: IntersectionObserverCallback
  , options: IntersectionObserverInit | undefined
  , refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
  ]
| [
    callback: IntersectionObserverCallback
  , refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
  ]
): void {
  if (args.length === 2) {
    const [callback, refs] = args
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useIntersectionObserver(callback, undefined, refs)
  }

  const [callback, options, refs] = args
  const deps = refs.map(x => x.current)

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
