import { renderHook } from '@testing-library/react-hooks/dom'
import { useMount } from '@src/use-mount'

describe('useMount(effect: EffectCallback): void', () => {
  it('only call effect once', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useMount(fn))

    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('unmount', () => {
    const fn = jasmine.createSpy()
    const { unmount } = renderHook(() => useMount(() => fn))

    expect(fn).toHaveBeenCalledTimes(0)
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
