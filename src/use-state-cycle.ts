import { useState, useCallback } from 'react'
import { NonEmptyArray } from '@blackglory/prelude'

export function useStateCycle<T>(
  orderedStates: NonEmptyArray<T>
, initialStateIndex: number = 0
): [state: T, next: () => void] {
  const [index, setIndex] = useState(initialStateIndex)

  return [orderedStates[index], useCallback(next, [orderedStates])]

  function next(): void {
    setIndex(index => {
      if (index + 1 < orderedStates.length) {
        return index + 1
      } else {
        return 0
      }
    })
  }
}
