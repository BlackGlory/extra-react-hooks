import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useIncrement } from '@src/use-increment'

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
