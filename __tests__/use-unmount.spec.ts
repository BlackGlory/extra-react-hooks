import { renderHook } from '@testing-library/react-hooks/dom'
import { useUnmount } from '@src/use-unmount'

describe('useUnmount(effect: () => void): void', () => {
  it('mount', () => {
    const fn = jasmine.createSpy()
    renderHook(() => useUnmount(fn))

    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('rerender', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useUnmount(fn))

    rerender()
    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('unmount', () => {
    const fn = jasmine.createSpy()
    const { unmount } = renderHook(() => useUnmount(fn))

    expect(fn).toHaveBeenCalledTimes(0)
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
