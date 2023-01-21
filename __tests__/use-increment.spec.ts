import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useIncrement } from '@src/use-increment.js'

describe(`
  useIncrement(initialValue: number): [
    value: number
  , increment: (step?: number) => void
  , reset: () => void
  ]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useIncrement(1))

    const [value] = result.current
    expect(value).toBe(1)
  })

  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useIncrement(1))

    const [value1, increment1, reset1] = result.current
    rerender()
    const [value2, increment2, reset2] = result.current

    expect(value2).toBe(value1)
    expect(increment2).toBe(increment1)
    expect(reset2).toBe(reset1)
  })

  it('increment', () => {
    const { result } = renderHook(() => useIncrement(1))

    act(() => {
      const [, increment] = result.current
      increment(2)
    })

    const [value] = result.current
    expect(value).toBe(3)
  })

  it('reset', () => {
    const { result } = renderHook(() => useIncrement(1))

    act(() => {
      const [, increment, reset] = result.current
      increment(2)
      reset()
    })

    const [value] = result.current
    expect(value).toBe(1)
  })
})
