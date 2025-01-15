import { useEffect, RefObject } from 'react'
import { isntNull, isntUndefined } from '@blackglory/prelude'

export function useResizeObserver(
  callback: ResizeObserverCallback
, refs: Array<RefObject<HTMLElement | null | undefined>>
, deps?: React.DependencyList
): void {
  useEffect(() => {
    const observer = new ResizeObserver(callback)

    refs
      .map(x => x.current)
      .filter(isntNull)
      .filter(isntUndefined)
      .forEach(x => observer.observe(x))

    return () => observer.disconnect()
  }, deps)
}
