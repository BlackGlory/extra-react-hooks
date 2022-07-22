import { useState, useCallback } from 'react'

export function useForceUpdate(): () => void {
  const [, setState] = useState({})

  return useCallback(forceUpdate, [])

  function forceUpdate(): void {
    setState({})
  }
}
