import { renderHook, act } from '@testing-library/react'
import { useGetSet } from '@src/use-get-set.js'

describe(`
  useGetSet<T>(
    initialValue: T
  ): [get: () => T, set: (value: T) => void]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useGetSet(1))

    const [get] = result.current
    expect(get()).toBe(1)
  })

  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useGetSet(1))

    const [get1, set1] = result.current
    rerender()
    const [get2, set2] = result.current

    expect(get2).toBe(get1)
    expect(set2).toBe(set1)
  })

  it('set', () => {
    const { result } = renderHook(() => useGetSet(1))

    act(() => {
      const [get, set] = result.current
      set(get() + 1)
      set(get() + 1)
    })

    const [get] = result.current
    expect(get()).toBe(3)
  })
})
