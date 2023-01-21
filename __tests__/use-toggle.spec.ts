import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useToggle } from '@src/use-toggle.js'

describe('useToggle(initialState: boolean): [on: boolean, toggle: () => void]', () => {
  it('initialState', () => {
    const { result } = renderHook(() => useToggle(false))

    const [on] = result.current
    expect(on).toBe(false)
  })

  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useToggle(false))

    const [on1, toggle1] = result.current
    rerender()
    const [on2, toggle2] = result.current

    expect(on2).toBe(on1)
    expect(toggle2).toBe(toggle1)
  })

  it('on -> off', () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [on] = result.current
    expect(on).toBe(false)
  })

  it('off -> on', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [on] = result.current
    expect(on).toBe(true)
  })
})
