import { useState } from 'react'
import { isUndefined, isntUndefined } from '@blackglory/types'
import { assert } from '@blackglory/errors'

export interface ISingleSelectionOption<T> {
  value: T
  index: number
  selected: boolean

  select(): void
}

export function useSingleSelection<T>(
  values: T[]
, defaultSelectedIndex: number
): {
  selectedValue: T
  options: Array<ISingleSelectionOption<T>>
}
export function useSingleSelection<T>(values: T[]): {
  selectedValue: T | undefined
  options: Array<ISingleSelectionOption<T>>
}
export function useSingleSelection<T>(
  values: T[]
, defaultSelectedIndex?: number
) {
  assert(values.length > 0, 'The parameter values must be a non-empty array')
  if (isntUndefined(defaultSelectedIndex)) {
    assert(
      defaultSelectedIndex >= 0 && defaultSelectedIndex < values.length
    , 'The parameter defaultSelectedIndex must be in the range of 0 to values.length'
    )
  }

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(defaultSelectedIndex)

  return {
    selectedValue: isUndefined(selectedIndex) ? undefined : values[selectedIndex]
  , options: values.map((value, index) => ({
      value
    , index
    , selected: index === selectedIndex
    , select: () => setSelectedIndex(index)
    }))
  }
}
