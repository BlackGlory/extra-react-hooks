import { renderHook, act } from '@testing-library/react-hooks'
import { useSingleSelection } from '@src/use-single-selection'

describe('useSingleSelection', () => {
  test('select', () => {
    const values = ['a', 'b']
    const { result } = renderHook(() => useSingleSelection(values, 0))

    act(() => {
      const { options } = result.current
      options[1].select()
    })

    const { value, options } = result.current
    expect(value).toBe(values[1])
    expect(options).toMatchObject([
      {
        value: values[0]
      , index: 0
      , selected: false
      , select: expect.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: true
      , select: expect.any(Function)
      }
    ])
  })

  test(`
    <T>(values: T[], defaultIndex: number): {
      value: T
      options: Array<IOption<T>>
    }
  `, () => {
    const values = ['a', 'b']
    const index = 0
    const { result } = renderHook(() => useSingleSelection(values, index))

    const { value, options } = result.current
    expect(value).toBe(values[index])
    expect(options).toMatchObject([
      {
        value: values[0]
      , index: 0
      , selected: true
      , select: expect.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: false
      , select: expect.any(Function)
      }
    ])
  })

  test(`
    <T>(values: T[]): {
      value: T | undefined
      options: Array<IOption<T>>
    }
  `, () => {
    const values = ['a', 'b']
    const { result } = renderHook(() => useSingleSelection(values))

    const { value, options } = result.current
    expect(value).toBeUndefined()
    expect(options).toMatchObject([
      {
        value: values[0]
      , index: 0
      , selected: false
      , select: expect.any(Function)
      }
    , {
        value: values[1]
      , index: 1
      , selected: false
      , select: expect.any(Function)
      }
    ])
  })
})
