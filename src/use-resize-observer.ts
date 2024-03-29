import { useEffect, RefObject, MutableRefObject } from 'react'
import { isntNull } from '@blackglory/prelude'

export function useResizeObserver(
  callback: ResizeObserverCallback
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
, deps?: React.DependencyList
): void {
  useEffect(() => {
    const observer = new ResizeObserver(callback)

    refs
      .map(x => x.current)
      .filter(isntNull)
      .forEach(x => observer.observe(x))

    return () => observer.disconnect()
  }, deps)
}
