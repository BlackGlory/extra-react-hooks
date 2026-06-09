import { useRef, useCallback } from 'react'
import { useIIFE } from './use-iife.js'
import { useForceUpdate } from './use-force-update.js'

export function useDerivedState<T>(value: T): [
  derivedState: T
, setDerivedState: (newDerivedState: T) => void
] {
  const forceUpdate = useForceUpdate()
  const stateRef = useRef<T>(value)

  useIIFE(() => {
    stateRef.current = value
  }, [value])

  return [
    stateRef.current
  , useCallback(newState => {
      if (stateRef.current !== newState) {
        stateRef.current = newState

        forceUpdate()
      }
    }, [])
  ]
}
