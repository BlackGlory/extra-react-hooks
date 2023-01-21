import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useMultipleSelection } from '@src/use-multiple-selection.js'
import { NonEmptyArray } from 'justypes'

describe('useMultipleSelection', () => {
  describe('initialState', () => {
    it(`
      <T>(
        options: NonEmptyArray<T>
      , defaultSelectedIndexes: number[]
      ): {
        selectedIndexes: number[]
        optionStates: IOptionState[]
        toggle: (index: number) => void
        select: (index: number) => void
        unselect: (index: number) => void
      }
    `, () => {
      const options: NonEmptyArray<string> = ['a', 'b']
      const indexes = [0]
      const { result } = renderHook(() => useMultipleSelection(options, indexes))

      const { selectedIndexes, optionStates } = result.current
      expect(selectedIndexes).toEqual([0])
      expect(optionStates).toEqual([
        { selected: true }
      , { selected: false }
      ])
    })

    it(`
      <T>(
        options: NonEmptyArray<T>
      ): {
        selectedIndex: number[]
        optionStates: IOptionState[]
        toggle: (index: number) => void
        select: (index: number) => void
        unselect: (index: number) => void
      }
    `, () => {
      const options: NonEmptyArray<string> = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(options))

      const { selectedIndexes, optionStates } = result.current
      expect(selectedIndexes).toEqual([])
      expect(optionStates).toEqual([
        { selected: false }
      , { selected: false }
      ])
    })
  })

  it('select', () => {
    const options: NonEmptyArray<string> = ['a', 'b']
    const { result } = renderHook(() => useMultipleSelection(options, [0]))

    act(() => {
      const { select } = result.current
      select(1)
    })

    const { selectedIndexes, optionStates } = result.current
    expect(selectedIndexes).toEqual([0, 1])
    expect(optionStates).toEqual([
      { selected: true }
    , { selected: true }
    ])
  })

  it('unselect', () => {
    const options: NonEmptyArray<string> = ['a', 'b']
    const { result } = renderHook(() => useMultipleSelection(options, [0]))

    act(() => {
      const { unselect } = result.current
      unselect(0)
    })

    const { selectedIndexes, optionStates } = result.current
    expect(selectedIndexes).toEqual([])
    expect(optionStates).toEqual([
      { selected: false }
    , { selected: false }
    ])
  })

  describe('toggle', () => {
    it('unselected => selected', () => {
      const options: NonEmptyArray<string> = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(options, [0]))

      act(() => {
        const { toggle } = result.current
        toggle(1)
      })

      const { selectedIndexes, optionStates } = result.current
      expect(selectedIndexes).toEqual([0, 1])
      expect(optionStates).toEqual([
        { selected: true }
      , { selected: true }
      ])
    })

    it('unselected => unselected', () => {
      const options: NonEmptyArray<string> = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(options, [0]))

      act(() => {
        const { toggle } = result.current
        toggle(0)
      })

      const { selectedIndexes, optionStates } = result.current
      expect(selectedIndexes).toEqual([])
      expect(optionStates).toEqual([
        { selected: false }
      , { selected: false }
      ])
    })

    it('unselected => selected => unselected', () => {
      const options: NonEmptyArray<string> = ['a']
      const { result, rerender } = renderHook(() => useMultipleSelection(options, []))

      act(() => {
        const { toggle } = result.current
        toggle(0)
      })
      rerender()
      act(() => {
        const { toggle } = result.current
        toggle(0)
      })

      const { selectedIndexes, optionStates } = result.current
      expect(selectedIndexes).toEqual([])
      expect(optionStates).toEqual([
        { selected: false }
      ])
    })
  })
})
