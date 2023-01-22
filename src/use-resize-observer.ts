import { useEffect, RefObject, MutableRefObject } from 'react'
import { isntNull } from 'extra-utils'

export function useResizeObserver(
  callback: ResizeObserverCallback
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
): void {
  const deps = refs.map(x => x.current)

  useEffect(() => {
    const observer = new ResizeObserver(callback)

    refs
      .map(x => x.current)
      .filter(isntNull)
      .forEach(x => observer.observe(x))

    return () => observer.disconnect()
  }, deps)
}
