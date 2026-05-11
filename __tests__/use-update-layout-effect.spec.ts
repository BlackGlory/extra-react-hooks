import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUpdateLayoutEffect } from '@src/use-update-layout-effect.js'

describe(`
  useUpdateLayoutEffect(
    effect: EffectCallback
  , deps?: React.DependencyList
  ): void
`, () => {
  it('only call effect on update', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useUpdateLayoutEffect(fn))

    expect(fn).toBeCalledTimes(0)
    rerender()
    expect(fn).toBeCalledTimes(1)
    rerender()
    expect(fn).toBeCalledTimes(2)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { rerender, unmount } = renderHook(() => useUpdateLayoutEffect(() => fn))

    rerender()
    expect(fn).toBeCalledTimes(0)
    unmount()
    expect(fn).toBeCalledTimes(1)
  })
})
