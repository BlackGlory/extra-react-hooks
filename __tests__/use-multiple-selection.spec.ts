import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useMultipleSelection } from '@src/use-multiple-selection'

describe('useMultipleSelection', () => {
  describe('initialState', () => {
    it(`
      <T>(values: T[], defaultSelectedIndexes: number[]): {
        value: T
        options: Array<IMultipleSelectionOption<T>>
      }
    `, () => {
      const values = ['a', 'b']
      const indexes = [0]
      const { result } = renderHook(() => useMultipleSelection(values, indexes))

      const { values: selectedValues, options } = result.current
      expect(selectedValues).toEqual(['a'])
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: true
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: false
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      ])
    })

    it(`
      <T>(values: T[]): {
        value: T[]
        options: Array<IMultipleSelectionOption<T>>
      }
    `, () => {
      const values = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(values))

      const { values: selectedValues, options } = result.current
      expect(selectedValues).toEqual([])
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: false
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: false
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      ])
    })
  })

  it('select', () => {
    const values = ['a', 'b']
    const { result } = renderHook(() => useMultipleSelection(values, [0]))

    act(() => {
      const { options } = result.current
      options[1].select()
    })

    const { values: selectedValues, options } = result.current
    expect(selectedValues).toEqual([values[0], values[1]])
    expect(options).toEqual([
      {
        value: values[0]
      , index: 0
      , selected: true
      , select: jasmine.any(Function)
      , unselect: jasmine.any(Function)
      , toggle: jasmine.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: true
      , select: jasmine.any(Function)
      , unselect: jasmine.any(Function)
      , toggle: jasmine.any(Function)
      }
    ])
  })

  it('unselect', () => {
    const values = ['a', 'b']
    const { result } = renderHook(() => useMultipleSelection(values, [0]))

    act(() => {
      const { options } = result.current
      options[0].unselect()
    })

    const { values: selectedValues, options } = result.current
    expect(selectedValues).toEqual([])
    expect(options).toEqual([
      {
        value: values[0]
      , index: 0
      , selected: false
      , select: jasmine.any(Function)
      , unselect: jasmine.any(Function)
      , toggle: jasmine.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: false
      , select: jasmine.any(Function)
      , unselect: jasmine.any(Function)
      , toggle: jasmine.any(Function)
      }
    ])
  })

  describe('toggle', () => {
    it('unselected => selected', () => {
      const values = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(values, [0]))

      act(() => {
        const { options } = result.current
        options[1].toggle()
      })

      const { values: selectedValues, options } = result.current
      expect(selectedValues).toEqual([values[0], values[1]])
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: true
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: true
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      ])
    })

    it('unselected => unselected', () => {
      const values = ['a', 'b']
      const { result } = renderHook(() => useMultipleSelection(values, [0]))

      act(() => {
        const { options } = result.current
        options[0].toggle()
      })

      const { values: selectedValues, options } = result.current
      expect(selectedValues).toEqual([])
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: false
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: false
        , select: jasmine.any(Function)
        , unselect: jasmine.any(Function)
        , toggle: jasmine.any(Function)
        }
      ])
    })
  })
})
