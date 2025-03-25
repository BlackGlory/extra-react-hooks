import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIIFE } from '@src/use-iife.js'

describe('useIIFE(iife: () => void, deps: React.DependencyList): void', () => {
  it('mount', () => {
    const fn = vi.fn()
    renderHook(() => useIIFE(fn, []))

    expect(fn).toBeCalledTimes(1)
  })

  it('rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useIIFE(fn, []))

    rerender()
    expect(fn).toBeCalledTimes(1)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useIIFE(fn, []))

    unmount()
    expect(fn).toBeCalledTimes(1)
  })

  describe('deps', () => {
    it('does not run IIFE if deps are same', () => {
      const fn = vi.fn()
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toBeCalledTimes(1)
      rerender()
      expect(fn).toBeCalledTimes(1)
    })

    it('runs IIFE if deps are different', () => {
      const fn = vi.fn()
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toBeCalledTimes(1)
      deps[0] = {}
      rerender()
      expect(fn).toBeCalledTimes(2)
    })
  })
})
