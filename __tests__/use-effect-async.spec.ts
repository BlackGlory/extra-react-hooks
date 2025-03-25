import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useEffectAsync } from '@src/use-effect-async.js'

describe('useEffectAsync', () => {
  it('call', () => {
    const fn = vi.fn()

    renderHook(() => useEffectAsync(fn))

    expect(fn).toBeCalledTimes(1)
  })

  describe('deps', () => {
    it('no deps', () => {
      const fn = vi.fn()

      const { rerender } = renderHook(() => useEffectAsync(fn))
      rerender()

      expect(fn).toBeCalledTimes(2)
    })

    it('empty deps', () => {
      const fn = vi.fn()

      const { rerender } = renderHook(() => useEffectAsync(fn, []))
      rerender()

      expect(fn).toBeCalledTimes(1)
    })

    it('same deps', () => {
      const fn = vi.fn()
      const i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i]))
      rerender()

      expect(fn).toBeCalledTimes(1)
    })

    it('diff deps', () => {
      const fn = vi.fn()
      let i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i++]))
      rerender()

      expect(fn).toBeCalledTimes(2)
    })
  })

  describe('signal', () => {
    it('mounted', () => {
      const fn = vi.fn()

      renderHook(() => useEffectAsync(fn))

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('unmounted', () => {
      const fn = vi.fn()

      const { unmount } = renderHook(() => useEffectAsync(fn))
      unmount()

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })

    it('rerender with same deps', () => {
      const fn = vi.fn()
      const i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i]))
      rerender()

      expect(fn).toBeCalledTimes(1)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('rerender with diff deps', () => {
      const fn = vi.fn()
      let i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i++]))
      rerender()

      expect(fn).toBeCalledTimes(2)
      const args = fn.mock.calls[0]
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })
  })
})
