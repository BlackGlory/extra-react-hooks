import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useToggle } from '@src/use-toggle'

describe('useToggle(initialState: boolean): [on: boolean, toggle: () => void]', () => {
  it('initialState', () => {
    const { result } = renderHook(() => useToggle(false))

    const [on] = result.current
    expect(on).toBe(false)
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
