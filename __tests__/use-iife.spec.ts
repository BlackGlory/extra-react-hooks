import { renderHook } from '@testing-library/react'
import { useIIFE } from '@src/use-iife.js'

describe('useIIFE(iife: () => void, deps: React.DependencyList): void', () => {
  it('mount', () => {
    const fn = jasmine.createSpy()
    renderHook(() => useIIFE(fn, []))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('rerender', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useIIFE(fn, []))

    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('unmount', () => {
    const fn = jasmine.createSpy()
    const { unmount } = renderHook(() => useIIFE(fn, []))

    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  describe('deps', () => {
    it('does not run IIFE if deps are same', () => {
      const fn = jasmine.createSpy()
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toHaveBeenCalledTimes(1)
      rerender()
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('runs IIFE if deps are different', () => {
      const fn = jasmine.createSpy()
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toHaveBeenCalledTimes(1)
      deps[0] = {}
      rerender()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })
})
