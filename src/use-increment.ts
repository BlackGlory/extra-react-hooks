import { useState, useCallback } from 'react'

export function useIncrement(
  initialValue: number
): [value: number, increment: (step?: number) => void, reset: () => void] {
  const [value, setValue] = useState(initialValue)
  return [value, useCallback(increment, []), useCallback(reset, [])]

  function increment(step: number = 1): void {
    setValue(value => value + step)
  }

  function reset(): void {
    setValue(initialValue)
  }
}
