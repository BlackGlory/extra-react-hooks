import { renderHook } from '@testing-library/react'
import { useEffectAsync } from '@src/use-effect-async.js'

describe('useEffectAsync', () => {
  it('call', () => {
    const fn = jasmine.createSpy()

    renderHook(() => useEffectAsync(fn))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  describe('deps', () => {
    it('no deps', () => {
      const fn = jasmine.createSpy()

      const { rerender } = renderHook(() => useEffectAsync(fn))
      rerender()

      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('empty deps', () => {
      const fn = jasmine.createSpy()

      const { rerender } = renderHook(() => useEffectAsync(fn, []))
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i]))
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i++]))
      rerender()

      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('signal', () => {
    it('mounted', () => {
      const fn = jasmine.createSpy()

      renderHook(() => useEffectAsync(fn))

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('unmounted', () => {
      const fn = jasmine.createSpy()

      const { unmount } = renderHook(() => useEffectAsync(fn))
      unmount()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })

    it('rerender with same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i]))
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('rerender with diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { rerender } = renderHook(() => useEffectAsync(fn, [i++]))
      rerender()

      expect(fn).toHaveBeenCalledTimes(2)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })
  })
})
