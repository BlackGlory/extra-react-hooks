import { renderHook } from '@testing-library/react-hooks/dom'
import { useMount } from '@src/use-mount.js'

describe('useMount(effect: EffectCallback): void', () => {
  it('mount', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useMount(fn))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('rerender', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useMount(fn))

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
