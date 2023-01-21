import { useState, useMemo, useCallback } from 'react'
import { assert } from '@blackglory/errors'
import { NonEmptyArray } from 'justypes'
import { IOptionState } from '@src/types.js'
import { useIIFE } from '@src/use-iife.js'

export function useSingleSelection<T>(
  options: NonEmptyArray<T>
, defaultSelectedIndex: number
): {
  selectedIndex: number
  optionStates: IOptionState[]
  select: (index: number) => void
} {
  useIIFE(() => {
    assert(
      defaultSelectedIndex >= 0 && defaultSelectedIndex < options.length
    , 'The parameter defaultSelectedIndex must be in the range of 0 to values.length'
    )
  }, [defaultSelectedIndex])

  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)

  return {
    selectedIndex
  , optionStates: useMemo(createOptionStates, [options, selectedIndex])
  , select: useCallback(select, [])
  }

  function createOptionStates(): IOptionState[] {
    return options.map((_, index) => ({
      selected: index === selectedIndex
    }))
  }

  function select(index: number): void {
    setSelectedIndex(index)
  }
}
