import { describe, test, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIIFE } from '@src/use-iife.js'

describe('useIIFE', () => {
  test('mount', () => {
    const cleanup = vi.fn()
    const fn = vi.fn(() => cleanup)
    renderHook(() => useIIFE(fn, []))

    expect(fn).toBeCalledTimes(1)
    expect(cleanup).not.toBeCalled()
  })

  test('rerender', () => {
    const cleanup = vi.fn()
    const fn = vi.fn(() => cleanup)
    const { rerender } = renderHook(() => useIIFE(fn, []))

    rerender()
    expect(fn).toBeCalledTimes(1)
    expect(cleanup).not.toBeCalled()
  })

  test('unmount', () => {
    const cleanup = vi.fn()
    const fn = vi.fn(() => cleanup)
    const { unmount } = renderHook(() => useIIFE(fn, []))

    unmount()
    expect(fn).toBeCalledTimes(1)
    expect(cleanup).toBeCalledTimes(1)
  })

  describe('deps', () => {
    test('no deps', () => {
      const cleanup = vi.fn()
      const fn = vi.fn(() => cleanup)
      const { rerender } = renderHook(() => useIIFE(fn))

      expect(fn).toBeCalledTimes(1)
      expect(cleanup).not.toBeCalled()
      rerender()
      expect(fn).toBeCalledTimes(2)
      expect(cleanup).toBeCalledTimes(1)
    })

    test('empty deps', () => {
      const cleanup = vi.fn()
      const fn = vi.fn(() => cleanup)
      const { rerender } = renderHook(() => useIIFE(fn, []))

      expect(fn).toBeCalledTimes(1)
      rerender()
      expect(fn).toBeCalledTimes(1)
      expect(cleanup).not.toBeCalled()
    })

    test('same deps', () => {
      const cleanup = vi.fn()
      const fn = vi.fn(() => cleanup)
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toBeCalledTimes(1)
      rerender()
      expect(fn).toBeCalledTimes(1)
      expect(cleanup).not.toBeCalled()
    })

    test('diff deps', () => {
      const cleanup = vi.fn()
      const fn = vi.fn(() => cleanup)
      const obj = {}
      const deps = [obj]
      const { rerender } = renderHook(() => useIIFE(fn, deps))

      expect(fn).toBeCalledTimes(1)
      expect(cleanup).not.toBeCalled()
      deps[0] = {}
      rerender()
      expect(fn).toBeCalledTimes(2)
      expect(cleanup).toBeCalledTimes(1)
    })
  })
})
