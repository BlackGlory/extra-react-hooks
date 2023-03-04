import { renderHook, act } from '@testing-library/react'
import { useSingleSelection } from '@src/use-single-selection.js'
import { NonEmptyArray } from 'justypes'

describe(`
  useSingleSelection<T>(
    options: NonEmptyArray<T>
  , defaultSelectedIndex: number
  ): {
    selectedIndex: number
    optionStates: IOptionState[]
    select: (index: number) => void
  }
`, () => {
  it('initialState', () => {
    const options: NonEmptyArray<string> = ['a', 'b']
    const index = 0
    const { result } = renderHook(() => useSingleSelection(options, index))

    const { selectedIndex, optionStates } = result.current
    expect(selectedIndex).toBe(index)
    expect(optionStates).toEqual([
      { selected: true }
    , { selected: false }
    ])
  })

  it('select', () => {
    const options: NonEmptyArray<string> = ['a', 'b']
    const { result } = renderHook(() => useSingleSelection(options, 0))

    act(() => {
      const { select } = result.current
      select(1)
    })

    const { selectedIndex, optionStates } = result.current
    expect(selectedIndex).toBe(1)
    expect(optionStates).toEqual([
      { selected: false }
    , { selected: true }
    ])
  })
})
