import { useState, useCallback } from 'react'
import { NonEmptyArray } from '@blackglory/prelude'

export function useStep<T>(
  steps: NonEmptyArray<T>
, initialStepIndex: number = 0
): [currentStep: T, next: () => void, previous: () => void] {
  const [index, setIndex] = useState(initialStepIndex)

  return [steps[index], useCallback(next, [steps]), useCallback(previous, [])]

  function next(): void {
    setIndex(index => {
      if (index === steps.length - 1) {
        return index
      } else {
        return index + 1
      }
    })
  }

  function previous(): void {
    setIndex(index => {
      if (index === 0) {
        return index
      } else {
        return index - 1
      }
    })
  }
}
