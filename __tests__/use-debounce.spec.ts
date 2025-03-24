import { renderHook } from '@testing-library/react'
import { useDebounce } from '@src/use-debounce.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe('useDebounce', () => {
  describe('debounce', () => {
    it('call once', async () => {
      const fn = jasmine.createSpy()

      const { result } = renderHook(() => useDebounce(fn, 500))
      const debouncedFn = result.current
      debouncedFn()

      expect(fn).not.toHaveBeenCalled()
      await waitForTimeout(600)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('call multiple times', async () => {
      const fn = jasmine.createSpy()

      const { result } = renderHook(() => useDebounce(fn, 500))
      const debouncedFn = result.current
      debouncedFn()
      await waitForTimeout(400)
      debouncedFn()

      expect(fn).not.toHaveBeenCalled()
      await waitForTimeout(600)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('modify timeout', () => {
    it('do not call the new debounced function', async () => {
      const fn = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn, 500)
        } else {
          return useDebounce(fn, 1000)
        }
      })
      const debouncedFn = result.current
      debouncedFn()
      rerender()

      await waitForTimeout(600)
      expect(fn).toHaveBeenCalledTimes(1)
      await waitForTimeout(500)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('call the new debounced function', async () => {
      const fn = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn, 500)
        } else {
          return useDebounce(fn, 1000)
        }
      })
      const debouncedFn1 = result.current
      debouncedFn1()
      rerender()
      const debouncedFn2 = result.current
      debouncedFn2()

      await waitForTimeout(600)
      expect(fn).not.toHaveBeenCalled()
      await waitForTimeout(1000)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('deps', () => {
    it('no deps', async () => {
      const fn1 = jasmine.createSpy()
      const fn2 = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn1, 500)
        } else {
          return useDebounce(fn2, 500)
        }
      })
      const debouncedFn = result.current
      debouncedFn()
      rerender()

      await waitForTimeout(600)
      expect(fn1).not.toHaveBeenCalled()
      expect(fn2).toHaveBeenCalledTimes(1)
    })

    it('empty deps', async () => {
      const fn1 = jasmine.createSpy()
      const fn2 = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn1, 500, [])
        } else {
          return useDebounce(fn2, 500, [])
        }
      })
      const debouncedFn = result.current
      debouncedFn()
      rerender()

      await waitForTimeout(600)
      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).not.toHaveBeenCalled()
    })

    it('same deps', async () => {
      const fn1 = jasmine.createSpy()
      const fn2 = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn1, 500, [true])
        } else {
          return useDebounce(fn2, 500, [true])
        }
      })
      const debouncedFn = result.current
      debouncedFn()
      rerender()

      await waitForTimeout(600)
      expect(fn1).toHaveBeenCalledTimes(1)
      expect(fn2).not.toHaveBeenCalled()
    })

    it('diff deps', async () => {
      const fn1 = jasmine.createSpy()
      const fn2 = jasmine.createSpy()
      let times = 0

      const { result, rerender } = renderHook(() => {
        if (times++ === 0) {
          return useDebounce(fn1, 500, [true])
        } else {
          return useDebounce(fn2, 500, [false])
        }
      })
      const debouncedFn = result.current
      debouncedFn()
      rerender()

      await waitForTimeout(600)
      expect(fn1).not.toHaveBeenCalled()
      expect(fn2).toHaveBeenCalledTimes(1)
    })
  })
})
