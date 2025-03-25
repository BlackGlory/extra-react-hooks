import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMountAsync } from '@src/use-mount-async.js'

describe('useMountAsync', () => {
  it('mount', () => {
    const fn = vi.fn()

    renderHook(() => useMountAsync(fn))

    expect(fn).toBeCalledTimes(1)
    const args = fn.mock.calls[0]
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(false)
  })

  it('rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useMountAsync(fn))

    rerender()

    expect(fn).toBeCalledTimes(1)
    const args = fn.mock.calls[0]
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(false)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useMountAsync(fn))

    unmount()

    expect(fn).toBeCalledTimes(1)
    const args = fn.mock.calls[0]
    expect(args[0]).toBeInstanceOf(AbortSignal)
    expect(args[0].aborted).toBe(true)
  })
})
