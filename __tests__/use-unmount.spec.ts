import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUnmount } from '@src/use-unmount.js'

describe('useUnmount(effect: () => void): void', () => {
  it('mount', () => {
    const fn = vi.fn()
    renderHook(() => useUnmount(fn))

    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useUnmount(fn))

    rerender()
    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useUnmount(fn))

    expect(fn).toHaveBeenCalledTimes(0)
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
