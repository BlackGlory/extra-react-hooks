import { renderHook } from '@testing-library/react-hooks'
import { useMount } from '@src/use-mount'

describe('useMount(effect: EffectCallback): void', () => {
  test('only call effect once', () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => useMount(fn))

    expect(fn).toBeCalledTimes(1)
    rerender()
    expect(fn).toBeCalledTimes(1)
  })

  test('unmount', () => {
    const fn = jest.fn()
    const { unmount } = renderHook(() => useMount(() => fn))

    expect(fn).toBeCalledTimes(0)
    unmount()
    expect(fn).toBeCalledTimes(1)
  })
})
