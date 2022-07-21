import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useSingleSelection } from '@src/use-single-selection'

describe('useSingleSelection', () => {
  describe('initialState', () => {
    it(`
      <T>(values: T[], defaultSelectedIndex: number): {
        value: T
        options: Array<ISingleSelectionOption<T>>
      }
    `, () => {
      const values = ['a', 'b']
      const index = 0
      const { result } = renderHook(() => useSingleSelection(values, index))

      const { value, options } = result.current
      expect(value).toBe(values[index])
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: true
        , select: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: false
        , select: jasmine.any(Function)
        }
      ])
    })

    it(`
      <T>(values: T[]): {
        value: T | undefined
        options: Array<ISingleSelectionOption<T>>
      }
    `, () => {
      const values = ['a', 'b']
      const { result } = renderHook(() => useSingleSelection(values))

      const { value, options } = result.current
      expect(value).toBeUndefined()
      expect(options).toEqual([
        {
          value: values[0]
        , index: 0
        , selected: false
        , select: jasmine.any(Function)
        }
      , {
          value: values[1]
        , index: 1
        , selected: false
        , select: jasmine.any(Function)
        }
      ])
    })
  })

  it('select', () => {
    const values = ['a', 'b']
    const { result } = renderHook(() => useSingleSelection(values, 0))

    act(() => {
      const { options } = result.current
      options[1].select()
    })

    const { value, options } = result.current
    expect(value).toBe(values[1])
    expect(options).toEqual([
      {
        value: values[0]
      , index: 0
      , selected: false
      , select: jasmine.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: true
      , select: jasmine.any(Function)
      }
    ])
  })
})
