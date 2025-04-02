import { describe, test, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIIFEAsync } from '@src/use-iife-async.js'

describe('useIIFEAsync', () => {
  test('call', () => {
    const fn = vi.fn()

    renderHook(() => useIIFEAsync(fn))

    expect(fn).toBeCalledTimes(1)
  })

  describe('deps', () => {
    test('no deps', () => {
      const fn = vi.fn()

      const { rerender } = renderHook(() => useIIFEAsync(fn))
      rerender()

      expect(fn).toBeCalledTimes(2)
    })

    test('empty deps', () => {
      const fn = vi.fn()

      const { rerender } = renderHook(() => useIIFEAsync(fn, []))
      rerender()

      expect(fn).toBeCalledTimes(1)
    })

    test('same deps', () => {
      const fn = vi.fn()
      const i = 0

      const { rerender } = renderHook(() => useIIFEAsync(fn, [i]))
      rerender()

      expect(fn).toBeCalledTimes(1)
    })

    test('diff deps', () => {
      const fn = vi.fn()
      let i = 0

      const { rerender } = renderHook(() => useIIFEAsync(fn, [i++]))
      rerender()

      expect(fn).toBeCalledTimes(2)
    })
  })

  describe('signal', () => {
    test('mounted', () => {
      const fn = vi.fn()

      renderHook(() => useIIFEAsync(fn))

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    test('unmounted', () => {
      const fn = vi.fn()

      const { unmount } = renderHook(() => useIIFEAsync(fn))
      unmount()

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })

    test('rerender with same deps', () => {
      const fn = vi.fn()
      const i = 0

      const { rerender } = renderHook(() => useIIFEAsync(fn, [i]))
      rerender()

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    test('rerender with diff deps', () => {
      const fn = vi.fn()
      let i = 0

      const { rerender } = renderHook(() => useIIFEAsync(fn, [i++]))
      rerender()

      expect(fn).toBeCalledTimes(2)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })
  })
})
