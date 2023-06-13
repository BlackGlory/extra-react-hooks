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

  describe('get & set', () => {
    it('set same value', () => {
      let renderCount = 0
      const { result } = renderHook(() => {
        renderCount++
        return useGetSet(1)
      })

      act(() => {
        const [get, set] = result.current
        set(1)
      })

      const [get] = result.current
      expect(renderCount).toBe(1)
      expect(get()).toBe(1)
    })

    it('set diff value', () => {
      let renderCount = 0
      const { result } = renderHook(() => {
        renderCount++
        return useGetSet(1)
      })

      act(() => {
        const [get, set] = result.current
        set(2)
      })

      const [get] = result.current
      expect(renderCount).toBe(2)
      expect(get()).toBe(2)
    })

    it('get latest state', () => {
      const { result } = renderHook(() => useGetSet(1))

      let value: number | undefined
      act(() => {
        const [get, set] = result.current
        set(get() + 1)
        value = get()
      })

      expect(value).toBe(2)
    })
  })
})
