import { useState } from 'react'

export function useStateCycle<T>(
  stateList: [T, ...T[]]
, initialStateIndex: number = 0
): [state: T, next: () => void] {
  const [index, setIndex] = useState(initialStateIndex)

  return [stateList[index], () => {
    if (index + 1 < stateList.length) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }]
}
