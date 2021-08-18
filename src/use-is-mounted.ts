import { useRef } from 'react'
import { useMount } from './use-mount'

export function useIsMounted(): () => boolean {
  const isMounted = useRef(false)

  useMount(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  return () => isMounted.current
}
