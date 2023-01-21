import { useState, useMemo, useCallback } from 'react'
import { assert } from '@blackglory/errors'
import { toArray } from 'iterable-operator'
import { NonEmptyArray } from 'justypes'
import { IOptionState } from '@src/types.js'
import { useIIFE } from '@src/use-iife.js'

export function useMultipleSelection<T>(
  options: NonEmptyArray<T>
, defaultSelectedIndexes: number[] = []
): {
  selectedIndexes: number[]
  optionStates: IOptionState[]
  toggle: (index: number) => void
  select: (index: number) => void
  unselect: (index: number) => void
} {
  useIIFE(() => {
    for (const index of defaultSelectedIndexes) {
      assert(
        index >= 0 && index < options.length
      , 'The index of parameter defaultSelectedIndexes must be in the range of 0 to values.length'
      )
    }
  }, [defaultSelectedIndexes])

  const [selectedIndexes, setSelectedIndexes] = useState(new Set(defaultSelectedIndexes))

  return {
    selectedIndexes: useMemo(() => toArray(selectedIndexes), [selectedIndexes])
  , optionStates: useMemo(createOptionStates, [options, selectedIndexes])
  , toggle: useCallback(toggle, [selectedIndexes])
  , select: useCallback(select, [])
  , unselect: useCallback(unselect, [])
  }

  function createOptionStates(): IOptionState[] {
    return options.map((_, index) => {
      const selected = isSelected(index)
      return { selected }
    })
  }

  function isSelected(index: number): boolean {
    return selectedIndexes.has(index)
  }

  function toggle(index: number): void {
    if (isSelected(index)) {
      unselect(index)
    } else {
      select(index)
    }
  }

  function select(index: number): void {
    setSelectedIndexes(selectedIndexes => {
      const result = new Set(selectedIndexes)
      result.add(index)
      return result
    })
  }

  function unselect(index: number): void {
    setSelectedIndexes(selectedIndexes => {
      const result = new Set(selectedIndexes)
      result.delete(index)
      return result
    })
  }
}
