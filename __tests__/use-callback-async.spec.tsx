import { act, renderHook } from '@testing-library/react'
import { useCallbackAsync } from '@src/use-callback-async.js'
import { AbortSignal } from 'extra-abort'

describe('useCallbackAsync', () => {
  it('call', () => {
    const fn = jasmine.createSpy()

    const { result } = renderHook(() => useCallbackAsync(fn, []))
    act(() => {
      const callback = result.current
      callback('foo')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    const args = fn.calls.first().args
    expect(args[0]).toBe('foo')
    expect(args[1]).toBeInstanceOf(AbortSignal)
  })

  describe('deps', () => {
    it('empty deps', () => {
      const fn = jasmine.createSpy()

      const { result, rerender } = renderHook(() => useCallbackAsync(fn, []))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).toBe(callback2)
    })

    it('same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { result, rerender } = renderHook(() => useCallbackAsync(fn, [i]))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).toBe(callback2)
    })

    it('diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { result, rerender } = renderHook(() => useCallbackAsync(fn, [i++]))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).not.toBe(callback2)
    })
  })

  describe('signal', () => {
    it('mounted', () => {
      const fn = jasmine.createSpy()

      const { result } = renderHook(() => useCallbackAsync(fn, []))
      const callback = result.current
      callback()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('unmounted', () => {
      const fn = jasmine.createSpy()

      const { result, unmount } = renderHook(() => useCallbackAsync(fn, []))
      const callback = result.current
      callback()
      unmount()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })

    it('rerender with same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { result, rerender } = renderHook(() => useCallbackAsync(fn, [i]))
      const callback = result.current
      callback()
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('rerender with diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { result, rerender } = renderHook(() => useCallbackAsync(fn, [i++]))
      const callback = result.current
      callback()
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })
  })
})
