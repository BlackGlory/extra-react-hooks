import { renderHook } from '@testing-library/react'
import { useAbortableCallback } from '@src/use-abortable-callback.js'
import { AbortSignal, AbortController } from 'extra-abort'
import { getErrorPromise } from 'return-style'

describe('useAbortableCallback', () => {
  describe('call', () => {
    it('signal isnt aborted', async () => {
      const fn = jasmine.createSpy().and.returnValue(Promise.resolve('bar'))
      const controller = new AbortController()

      const { result } = renderHook(() => useAbortableCallback(fn, []))
      const callback = result.current
      const promiseResult = await callback('foo', controller.signal)

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBe('foo')
      expect(args[1]).toBeInstanceOf(AbortSignal)
      expect(args[1].aborted).toBe(false)
      expect(promiseResult).toBe('bar')
    })

    it('signal is aborted', async () => {
      const customReason = new Error('custom reason')
      const fn = jasmine.createSpy().and.returnValue(Promise.resolve('bar'))
      const controller = new AbortController()
      controller.abort(customReason)

      const { result } = renderHook(() => useAbortableCallback(fn, []))
      const callback = result.current
      const err = await getErrorPromise(callback('foo', controller.signal))

      expect(fn).toHaveBeenCalledTimes(0)
      expect(err).toBe(customReason)
    })
  })

  describe('deps', () => {
    it('empty deps', () => {
      const fn = jasmine.createSpy()

      const { result, rerender } = renderHook(() => useAbortableCallback(fn, []))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).toBe(callback2)
    })

    it('same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { result, rerender } = renderHook(() => useAbortableCallback(fn, [i]))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).toBe(callback2)
    })

    it('diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { result, rerender } = renderHook(() => useAbortableCallback(fn, [i++]))
      const callback1 = result.current
      rerender()
      const callback2 = result.current

      expect(callback1).not.toBe(callback2)
    })
  })

  describe('signal', () => {
    it('mounted', () => {
      const fn = jasmine.createSpy()

      const { result } = renderHook(() => useAbortableCallback(fn, []))
      const callback = result.current
      callback(new AbortController().signal)

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('unmounted', () => {
      const fn = jasmine.createSpy()

      const { result, unmount } = renderHook(() => useAbortableCallback(fn, []))
      const callback = result.current
      callback(new AbortController().signal)
      unmount()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })

    it('rerender with same deps', () => {
      const fn = jasmine.createSpy()
      const i = 0

      const { result, rerender } = renderHook(() => useAbortableCallback(fn, [i]))
      const callback = result.current
      callback(new AbortController().signal)
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(false)
    })

    it('rerender with diff deps', () => {
      const fn = jasmine.createSpy()
      let i = 0

      const { result, rerender } = renderHook(() => useAbortableCallback(fn, [i++]))
      const callback = result.current
      callback(new AbortController().signal)
      rerender()

      expect(fn).toHaveBeenCalledTimes(1)
      const args = fn.calls.first().args
      expect(args[0]).toBeInstanceOf(AbortSignal)
      expect(args[0].aborted).toBe(true)
    })
  })
})
