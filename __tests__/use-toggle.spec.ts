import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle } from '@src/use-toggle'

describe('useToggle(initialState: boolean): [on: boolean, toggle: () => void]', () => {
  test('initialState', () => {
    const { result } = renderHook(() => useToggle(false))

    const [on] = result.current
    expect(on).toBe(false)
  })

  test('on -> off', () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [on] = result.current
    expect(on).toBe(false)
  })

  test('off -> on', () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      const [, toggle] = result.current
      toggle()
    })

    const [on] = result.current
    expect(on).toBe(true)
  })
})
