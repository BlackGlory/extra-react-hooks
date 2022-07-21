import { useState } from 'react'

export function useStep<T>(
  steps: [T, ...T[]]
, initialStepIndex: number = 0
): [currentStep: T, next: () => void, previous: () => void] {
  const [index, setIndex] = useState(initialStepIndex)

  return [steps[index], next, previous]

  function next() {
    setIndex(index => {
      if (index === steps.length - 1) {
        return index
      } else {
        return index + 1
      }
    })
  }

  function previous() {
    setIndex(index => {
      if (index === 0) {
        return index
      } else {
        return index - 1
      }
    })
  }
}
