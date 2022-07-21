import { useState } from 'react'

export function useIncrement(
  initialValue: number
): [value: number, increment: (step?: number) => void, reset: () => void] {
  const [value, setValue]= useState(initialValue)
  return [value, increment, reset]

  function increment(step: number = 1) {
    setValue(value => value + step)
  }

  function reset() {
    setValue(initialValue)
  }
}
