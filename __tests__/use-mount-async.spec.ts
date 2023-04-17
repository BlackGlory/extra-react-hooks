import { renderHook } from '@testing-library/react'
import { useMountAsync } from '@src/use-mount-async.js'

describe('useMountAsync', () => {
  it('mount', () => {
    const fn = jasmine.createSpy()

    renderHook(() => useMountAsync(fn))

    expect(fn).toHaveBeenCalledTimes(1)
    const args = fn.calls.first().args
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(false)
  })

  it('rerender', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useMountAsync(fn))

    rerender()

    expect(fn).toHaveBeenCalledTimes(1)
    const args = fn.calls.first().args
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(false)
  })

  it('unmount', () => {
    const fn = jasmine.createSpy()
    const { unmount } = renderHook(() => useMountAsync(fn))

    unmount()

    expect(fn).toHaveBeenCalledTimes(1)
    const args = fn.calls.first().args
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(true)
  })
})
