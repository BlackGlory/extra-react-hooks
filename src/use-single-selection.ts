import { useState } from 'react'
import { isUndefined, isntUndefined } from '@blackglory/types'
import { assert } from '@blackglory/errors'

interface IOption<T> {
  value: T
  index: number
  selected: boolean
  select: () => void
}

export function useSingleSelection<T>(values: T[], defaultIndex: number): {
  value: T
  options: Array<IOption<T>>
}
export function useSingleSelection<T>(values: T[]): {
  value: T | undefined
  options: Array<IOption<T>>
}
export function useSingleSelection<T>(values: T[], defaultIndex?: number) {
  assert(values.length > 0, 'The parameter values must be a non-empty array')
  if (isntUndefined(defaultIndex)) {
    assert(
      defaultIndex >= 0 && defaultIndex < values.length
    , 'The parameter defaultIndex must be in the range of 0 to values.length'
    )
  }

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(defaultIndex)

  return {
    value: isUndefined(selectedIndex) ? undefined : values[selectedIndex]
  , options: values.map((value, index) => ({
      value
    , index
    , selected: index === selectedIndex
    , select: () => setSelectedIndex(index)
    }))
  }
}
