import { useState, useMemo } from 'react'
import { assert } from '@blackglory/errors'
import { map, toArray } from 'iterable-operator'

interface IMultipleSelectionOption<T> {
  value: T
  index: number
  selected: boolean

  select(): void
  unselect(): void
  toggle(): void
}

export function useMultipleSelection<T>(
  values: T[]
, defaultSelectedIndexes: number[] = []
): {
  selectedValues: T[]
  options: Array<IMultipleSelectionOption<T>>
} {
  assert(values.length > 0, 'The parameter values must be a non-empty array')
  for (const index of defaultSelectedIndexes) {
    assert(
      index >= 0 && index < values.length
    , 'The index of parameter defaultSelectedIndexes must be in the range of 0 to values.length'
    )
  }

  const [selectedIndexes, setSelectedIndexes] = useState(new Set(defaultSelectedIndexes))

  return useMemo(() => ({
    selectedValues: toArray(map(selectedIndexes, i => values[i]))
  , options: values.map((value, index) => {
      const selected = selectedIndexes.has(index)
      const select = () => {
        const set = new Set(selectedIndexes)
        set.add(index)
        setSelectedIndexes(set)
      }
      const unselect = () => {
        const set = new Set(selectedIndexes)
        set.delete(index)
        setSelectedIndexes(set)
      }

      return {
        value
      , index
      , selected
      , select
      , unselect
      , toggle: selected ? unselect : select
      }
    })
  }), [selectedIndexes])
}
