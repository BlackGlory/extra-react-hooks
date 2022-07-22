import { useRef, useCallback } from 'react'
import { useMount } from './use-mount'

export function useIsMounted(): () => boolean {
  const mounted = useRef(false)

  useMount(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  })

  return useCallback(isMounted, [])

  function isMounted(): boolean {
    return mounted.current
  }
}
